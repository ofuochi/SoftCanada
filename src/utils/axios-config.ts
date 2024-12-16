import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getSession } from "@auth0/nextjs-auth0";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Queue to handle token refresh
type FailedRequest = {
  resolve: (value: AxiosResponse | PromiseLike<AxiosResponse>) => void;
  reject: (reason?: unknown) => void;
};

let isRefreshing = false;
let failedRequestsQueue: FailedRequest[] = [];

// Add request interceptor for adding Authorization header

axiosInstance.interceptors.request.use(
  async (req): Promise<InternalAxiosRequestConfig> => {
    const session = await getSession();

    req.headers.Authorization = `Bearer ${session?.accessToken}`;

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for token refresh handling
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Refresh the token using Auth0 endpoint
          await fetch("/api/auth/refresh");
          const session = await getSession();
          failedRequestsQueue.forEach((req) =>
            req.resolve(
              axiosInstance({
                ...originalRequest,
                headers: {
                  ...originalRequest.headers,
                  Authorization: `Bearer ${session?.accessToken}`,
                },
              })
            )
          );
          failedRequestsQueue = [];
        } catch (refreshError) {
          failedRequestsQueue.forEach((req) => req.reject(refreshError));
          failedRequestsQueue = [];
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise<AxiosResponse>((resolve, reject) => {
        failedRequestsQueue.push({
          resolve,
          reject,
        });
      });
    }

    return Promise.reject(error); // Reject all other errors
  }
);

export default axiosInstance;
