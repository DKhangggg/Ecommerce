import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import apiClient from "./apiClient";
import PrivateApiClient from "./privateApiClient";

export interface IHttpClient {
  get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>>;
  post<T = any>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>>;
  put<T = any>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>>;
  delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>>;
}

export const createAxiosHttpClient = (
  instance: AxiosInstance
): IHttpClient => ({
  get: (url, config) => instance.get(url, config),
  post: (url, data, config) => instance.post(url, data, config),
  put: (url, data, config) => instance.put(url, data, config),
  delete: (url, config) => instance.delete(url, config),
});

export const PublicHttpClient = createAxiosHttpClient(apiClient);
export const PrivateHttpClient = createAxiosHttpClient(PrivateApiClient);

// Note: For now this helper simply adapts axios instances to a small interface.
// Next steps: add unified error handling, automatic token refresh, and typed unwrap helpers.
