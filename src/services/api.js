import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
export const BACKEND_URL = API_URL.replace(/\/api\/?$/, '');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  changePassword: (data) => api.put('/auth/change-password', data),
};

export const countriesAPI = {
  getAll: (params) => api.get('/countries', { params }),
  getBySlug: (slug) => api.get(`/countries/${slug}`),
  create: (data) => api.post('/countries', data),
  update: (id, data) => api.put(`/countries/${id}`, data),
  delete: (id) => api.delete(`/countries/${id}`),
};

export const universitiesAPI = {
  getAll: (params) => api.get('/universities', { params }),
  getBySlug: (slug) => api.get(`/universities/${slug}`),
  create: (data) => api.post('/universities', data),
  update: (id, data) => api.put(`/universities/${id}`, data),
  delete: (id) => api.delete(`/universities/${id}`),
};

export const blogsAPI = {
  getAll: (params) => api.get('/blogs', { params }),
  getBySlug: (slug) => api.get(`/blogs/${slug}`),
  create: (data) => api.post('/blogs', data),
  update: (id, data) => api.put(`/blogs/${id}`, data),
  delete: (id) => api.delete(`/blogs/${id}`),
};

export const enquiriesAPI = {
  getAll: (params) => api.get('/enquiries', { params }),
  getById: (id) => api.get(`/enquiries/${id}`),
  create: (data) => api.post('/enquiries', data),
  updateStatus: (id, status) => api.put(`/enquiries/${id}/status`, { status }),
  delete: (id) => api.delete(`/enquiries/${id}`),
  getStats: () => api.get('/enquiries/stats'),
};

export const settingsAPI = {
  getAll: () => api.get('/settings'),
  update: (data) => api.put('/settings', data),
  getDashboardStats: () => api.get('/settings/dashboard'),
};

export default api;
