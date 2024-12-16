"use server";
import axiosInstance from "./axios-config";

export const swrFetcher = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.get<T>(url);
  return response.data;
};

export const swrMutator = async <T>(url: string, data: T): Promise<void> => {
  await axiosInstance.put(url, data);
};
