import axios from "axios";

import { apiConfig } from "../../config/api";

export const instance = axios.create({
  baseURL: apiConfig.baseURL,
});
export const instanceAuth = axios.create({
  baseURL: apiConfig.baseURL,
  headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
});

instanceAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return new Promise((resolve) => {
      const originalRequest = error.config;
      const refreshToken = localStorage.getItem("refreshToken");
      if (
        error.response &&
        error.response.status === 401 &&
        error.config &&
        !error.config.__isRetryRequest &&
        refreshToken
      ) {
        originalRequest._retry = true;

        const response = fetch(`${apiConfig.baseURL}/auth/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            localStorage.setItem("accessToken", res.accessToken);

            return axios(originalRequest);
          });
        resolve(response);
      }

      return Promise.reject(error);
    });
  }
);
