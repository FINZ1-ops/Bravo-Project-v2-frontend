import api from './axios';

export const getNews = () => api.get('/news');
export const getNewsById = (id) => api.get(`/news/${id}`);

// Admin
export const adminGetNews = () => api.get('/admin/news');
export const adminCreateNews = (data) => api.post('/admin/news', data);
export const adminUpdateNews = (id, data) => api.put(`/admin/news/${id}`, data);
export const adminDeleteNews = (id) => api.delete(`/admin/news/${id}`);
