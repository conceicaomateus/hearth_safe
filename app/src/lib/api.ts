import Axios, { type InternalAxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { TOKEN_STORAGE_KEY } from "../constants/storage-keys";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }

  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

export const api = Axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    toast.error(message);

    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }

    return Promise.reject(error);
  }
);
