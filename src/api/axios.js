import axios from 'axios';
import { getToken, removeToken } from '../utils/cookies';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  timeout: 10000,
});

// Request interceptor — inject token dari cookies ke setiap request
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));

// Response interceptor — handle 401 otomatis logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;
