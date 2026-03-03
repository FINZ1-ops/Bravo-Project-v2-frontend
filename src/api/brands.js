import api from './axios';

export const adminGetBrands = () => api.get('/admin/brands');
export const adminCreateBrand = (data) => api.post('/admin/brands', data);
export const adminUpdateBrand = (id, data) => api.put(`/admin/brands/${id}`, data);
export const adminDeleteBrand = (id) => api.delete(`/admin/brands/${id}`);
