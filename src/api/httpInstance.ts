import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

const DEFAULT_CONFIG = {
  timeout: 3000,
} as const;

interface IHttpInstance {
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<T | undefined>;

  post: <T>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) => Promise<T | undefined>;
}

class HttpInstance implements IHttpInstance {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create(DEFAULT_CONFIG);
  }

  get = async <T>(url: string, config?: AxiosRequestConfig) => {
    try {
      const { data } = await this.instance.get<T>(url, config);

      return data;
    } catch (e) {
      if (e instanceof AxiosError) throw new Error(e.message);
    }
  };

  post = async <T>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) => {
    try {
      const { data } = await this.instance.post<T>(url, params, config);

      return data;
    } catch (e) {
      if (e instanceof AxiosError) throw new Error(e.message);
    }
  };
}

export const httpInstance = new HttpInstance();
