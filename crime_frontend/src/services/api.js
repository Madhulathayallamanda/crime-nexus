import axios from 'axios';

const BASE = 'http://localhost:9060/api';
const api = axios.create({ baseURL: BASE });

export const register    = (data) => api.post('/auth/register', data);
export const reportCrime = (data) => api.post('/crimes/report', data);
export const getAllCrimes = ()     => api.get('/crimes');
export const assignCase  = (data) => api.post('/cases/assign', data);
export const getCases    = ()     => api.get('/cases');
export const getStats    = ()     => api.get('/analytics/stats');

export default api;
