import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class axiosInstance {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: '/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          window.location.href = '/logout';
        }
        return Promise.reject(error.response?.data);
      },
    );
  }

  getRequest = (
    url: string,
    params: unknown = {},
    other?: AxiosRequestConfig,
  ) => {
    return this.instance
      .get(url, { ...other, params })
      .then(({ data }) => data)
      .catch((err) => {
        throw err;
      });
  };

  postRequest = (url: string, body?: unknown, other?: AxiosRequestConfig) => {
    return this.instance
      .post(url, body, other)
      .then(({ data }) => data)
      .catch((err) => {
        throw err;
      });
  };

  updateRequest = (url: string, body?: unknown, other?: AxiosRequestConfig) => {
    return this.instance
      .put(url, body, other)
      .then(({ data }) => data)
      .catch((err) => {
        throw err;
      });
  };

  deleteRequest = (url: string, body?: unknown, other?: AxiosRequestConfig) => {
    return this.instance
      .delete(url, { ...other, data: body })
      .then(({ data }) => data)
      .catch((err) => {
        throw err;
      });
  };
}

export default new axiosInstance();
