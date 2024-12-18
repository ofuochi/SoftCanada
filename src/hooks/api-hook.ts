"use client";

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { useSession } from "@/contexts/SessionContext";
import { ApiError, useErrorContext } from "@/contexts/ErrorContext";

// Base URL for all API requests
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

/**
 * Centralized API client using functions.
 * Handles auth headers and error propagation via ErrorContext.
 */
export function useApiClient() {
  const session = useSession();
  const { setApiError } = useErrorContext();

  // Helper function to make requests with error handling
  const request = async <TResult, TData = unknown>(
    method: "get" | "post" | "put",
    url: string,
    data?: TData,
    config?: AxiosRequestConfig
  ): Promise<TResult> => {
    try {
      const headers = session?.accessToken
        ? { Authorization: `Bearer ${session.accessToken}` }
        : {};

      const response: AxiosResponse<TResult> = await axios({
        method,
        url: `${BASE_URL}${url}`,
        data,
        ...config,
        headers: { ...config?.headers, ...headers },
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        // Transform and propagate ApiError
        const apiError = error.response.data as ApiError;
        setApiError(apiError);
        throw apiError; // Rethrow for optional component-specific handling
      }

      // Handle unexpected errors
      const unexpectedError: ApiError = {
        type: "error",
        title: "An unexpected error occurred.",
        errors: { General: ["Please try again later."] },
        status: 500,
      };
      setApiError(unexpectedError);
      throw unexpectedError;
    }
  };

  // Expose API methods
  const get = <TResult>(url: string, config?: AxiosRequestConfig) =>
    request<TResult>("get", url, undefined, config);

  const post = <TResult, TData = unknown>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig
  ) => request<TResult, TData>("post", url, data, config);

  const put = <TResult, TData = unknown>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig
  ) => request<TResult, TData>("put", url, data, config);

  return { get, post, put };
}
