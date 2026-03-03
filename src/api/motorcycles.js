import api from './axios';

export const getMotorcycles = (params) => api.get('/motorcycles', { params });
export const getMotorcycleTypes = () => api.get('/motorcycles/types');
export const getMotorcycleById = (id) => api.get(`/motorcycles/${id}`);

// Admin
export const adminGetMotorcycles = () => api.get('/admin/motorcycles');
export const adminCreateMotorcycle = (data) => api.post('/admin/motorcycles', data);
export const adminUpdateMotorcycle = (id, data) => api.put(`/admin/motorcycles/${id}`, data);
export const adminDeleteMotorcycle = (id) => api.delete(`/admin/motorcycles/${id}`);
