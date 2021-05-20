import axios, { AxiosResponse } from 'axios';
import { AppConstant } from 'constants/index';

axios.defaults.baseURL = AppConstant.BASE_URL;
axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem(AppConstant.TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const responseBody = (response: AxiosResponse) => response.data;

export const requests = {
  get: (url: string, config = {}) => axios.get(url, config).then(responseBody),
  post: (url: string, body: {}, config = {}) => axios.post(url, body, config).then(responseBody),
  put: (url: string, body: {}, config = {}) => axios.put(url, body, config).then(responseBody),
  del: (url: string, config = {}) => axios.delete(url, config).then(responseBody),
};
