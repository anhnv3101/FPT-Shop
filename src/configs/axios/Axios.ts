import axios from "axios";
import type { AxiosError, AxiosRequestConfig } from "axios";

import localStorageUtils, { KeyStorage } from "../localStore/localStorageUtils";

const baseURL = import.meta.env.BASE_URL

// ✅ Interface định nghĩa kiểu dữ liệu trong localStorage
interface AuthData {
  access_token?: string;
  refresh_token?: string;
  [key: string]: any; // nếu có thêm trường khác
}

const instance = axios.create({ baseURL });

// ✅ Tránh gọi refresh token lặp lại khi nhiều request fail cùng lúc
let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: AxiosError) => void;
}[] = [];

const processQueue = (error: AxiosError | null, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else if (token) prom.resolve(token);
  });
  failedQueue = [];
};



// ✅ Gắn access token vào header của mọi request
instance.interceptors.request.use(
  (config) => {
    const authData = localStorageUtils.getObject(KeyStorage.AUTH, {}) as AuthData;
    const accessToken = authData.access_token;
    if (accessToken) {
      // Nếu config.headers có phương thức set (AxiosHeaders)
      if (config.headers && typeof (config.headers as any).set === "function") {
        (config.headers as any).set("Authorization", `Bearer ${accessToken}`);
      } else {
        // Trường hợp config.headers là object bình thường
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// ✅ Tự động xử lý refresh token khi gặp lỗi 401
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const authData = localStorageUtils.getObject(KeyStorage.AUTH, {}) as AuthData;
      const refreshToken = authData.refresh_token;

      if (!refreshToken) {
        localStorageUtils.remove(KeyStorage.AUTH);
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (!originalRequest.headers) originalRequest.headers = {};
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              resolve(instance(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const res = await axios.post(`${baseURL}/auth/refresh-token`, { refreshToken });
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data;

        // Cập nhật token mới
        localStorageUtils.setObject(KeyStorage.AUTH, {
          ...authData,
          access_token: newAccessToken,
          refresh_token: newRefreshToken,
        });

        processQueue(null, newAccessToken);

        if (!originalRequest.headers) originalRequest.headers = {};
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return instance(originalRequest);
      } catch (err) {
        processQueue(err as AxiosError, null);
        localStorageUtils.remove(KeyStorage.AUTH);
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default instance;