"use client";

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { useState } from "react";
import { ApiError, useErrorContext } from "@/contexts/ErrorContext";
import { getAccessToken } from "@auth0/nextjs-auth0";

// Base URL for all API requests
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.API_BASE_URL ||
  "https://softcanada-api-cqarcuhpc9chc5cp.canadacentral-01.azurewebsites.net"; // FIXME: Update with your API URL

type RequestType<TData> = {
  method: "get" | "post" | "put" | "delete";
  url: string;
  data?: TData;
  config?: AxiosRequestConfig;
  isAnonymous?: boolean; // Flag to indicate if the request is anonymous
};

/**
 * Centralized API client using functions.
 * Handles auth headers, error propagation via ErrorContext, and in-progress state tracking.
 */
export function useApiClient() {
  const { setApiError } = useErrorContext();
  const [inProgress, setInProgress] = useState(false); // Track request progress

  // Helper function to make requests with error handling
  const request = async <TResult, TData = unknown>({
    method,
    url,
    data,
    config,
    isAnonymous = false,
  }: RequestType<TData>): Promise<TResult> => {
    setInProgress(true); // Set in-progress state to true
    let headers = {};
    if (!isAnonymous) {
      // Add authorization header if not anonymous
      const accessToken = await getAccessToken();
      if (accessToken) {
        headers = { Authorization: `Bearer ${accessToken}` };
      }
    }

    try {
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
        errors: {},
        status: 500,
      };
      setApiError(unexpectedError);
      throw unexpectedError;
    } finally {
      setInProgress(false);
    }
  };

  // Expose API methods
  const get = <TResult>(url: string, config?: AxiosRequestConfig) =>
    request<TResult>({ method: "get", url, data: undefined, config });

  const post = <TResult, TData = unknown>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig,
    isAnonymous: boolean = false
  ) =>
    request<TResult, TData>({ method: "post", url, data, config, isAnonymous });

  const put = <TData = unknown>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig
  ) => request<void, TData>({ method: "put", url, data, config });

  const del = (url: string, config?: AxiosRequestConfig) =>
    request<void>({ method: "delete", url, data: undefined, config });

  return { get, post, put, del, inProgress };
}
