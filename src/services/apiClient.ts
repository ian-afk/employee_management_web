import axios, { type AxiosRequestConfig } from "axios";
import { queryClient } from "./queryClient";

const baseUrl = import.meta.env.VITE_EMP_API_URL;

const client = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

const refresh = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

let refreshPromise: Promise<void> | null = null;

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
    const isRefresh =
      error.response?.status === 401 &&
      !request._retry &&
      !request.url?.includes("/auth/login") &&
      !request.url?.includes("/auth/refresh");

    if (!isRefresh) {
      throw error;
    }
    request._retry = true;

    if (!refreshPromise) {
      refreshPromise = refresh
        .post("/auth/refresh")
        .then(() => undefined)
        .catch((refreshError: unknown) => {
          queryClient.setQueryData(["auth", "current-user"], null);
          throw refreshError;
        })
        .finally(() => (refreshPromise = null));
    }

    await refreshPromise;
    return client(request);
  },
);
export const apiClient = {
  get: async <T>(query?: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = await client.get(`/${query}`, config);
    return res.data;
  },
  post: async <TResponse, TBody = unknown>(
    query: string,
    body?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> => {
    const res = await client.post(`/${query}`, body, config);
    return res.data;
  },
  patch: async <TResponse, TBody = unknown>(
    query: string,
    body?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> => {
    const res = await client.patch(`/${query}`, body, config);
    return res.data;
  },
};
