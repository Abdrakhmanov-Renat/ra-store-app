// utils/axiosInstance.ts
import axios from 'axios';
import store from '../app/store';
import { actions as authActions } from '../features/auth';

const API = axios.create({
  baseURL: 'http://localhost:5700',
  withCredentials: true,
});

// Додаємо accessToken у кожен запит
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor для обробки помилок 401 (протух accessToken)
API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Якщо помилка 401 і ми ще не пробували оновити токен
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.get('http://localhost:5700/refresh', {
          withCredentials: true,
        });

        const { token, user } = res.data;

        // Зберігаємо новий токен
        localStorage.setItem('accessToken', token);
        store.dispatch(authActions.login(user));

        // Додаємо новий токен у заголовок
        originalRequest.headers.Authorization = `Bearer ${token}`;

        // Повторюємо оригінальний запит
        return API(originalRequest);
      } catch (refreshError) {
        // Якщо оновлення не вдалось — логаут
        store.dispatch(authActions.logout());
        localStorage.removeItem('accessToken');
      }
    }

    // Інші помилки — прокидаємо далі
    return Promise.reject(error);
  }
);

export default API;
