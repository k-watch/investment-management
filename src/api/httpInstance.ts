import axios, { AxiosError, AxiosInstance } from 'axios';

const DEFAULT_CONFIG = {
  timeout: 3000,
} as const;

interface IHttpInstance {
  get: <T>(
    url: string,
    params?: Record<string, unknown>
  ) => Promise<T | undefined>;

  post: <T>(
    url: string,
    params?: Record<string, unknown>
  ) => Promise<T | undefined>;
}

class HttpInstance implements IHttpInstance {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create(DEFAULT_CONFIG);
  }

  get = async <T>(url: string, params?: Record<string, unknown>) => {
    try {
      const { data } = await this.instance.get<T>(url, params);

      return data;
    } catch (e) {
      if (e instanceof AxiosError) throw new Error(e.message);
    }
  };

  post = async <T>(url: string, params?: Record<string, unknown>) => {
    try {
      const { data } = await this.instance.post<T>(url, params);

      return data;
    } catch (e) {
      if (e instanceof AxiosError) throw new Error(e.message);
    }
  };
}

export const httpInstance = new HttpInstance();
