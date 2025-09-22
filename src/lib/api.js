// src/lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
  timeout: 15000,
});

// Helpers de tokens (puedes migrarlo a Zustand más adelante)
const getAccess = () => localStorage.getItem("access") || null;
const getRefresh = () => localStorage.getItem("refresh") || null;
const setAccess = (t) => localStorage.setItem("access", t);
const clearTokens = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

// Auth header
api.interceptors.request.use((config) => {
  const token = getAccess();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Refresh on 401 (retry once)
let isRefreshing = false;
let pending = [];

const processQueue = (error, token = null) => {
  pending.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  pending = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      const refresh = getRefresh();
      if (!refresh) {
        clearTokens();
        return Promise.reject(error);
      }
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pending.push({
            resolve: (token) => {
              original.headers.Authorization = `Bearer ${token}`;
              resolve(api(original));
            },
            reject,
          });
        });
      }
      original._retry = true;
      isRefreshing = true;
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh/`,
          { refresh }
        );
        setAccess(data.access);
        api.defaults.headers.common.Authorization = `Bearer ${data.access}`;
        processQueue(null, data.access);
        return api(original);
      } catch (err) {
        processQueue(err, null);
        clearTokens();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
