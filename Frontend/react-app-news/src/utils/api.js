// utils/api.js or wherever your axios setup lives
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  withCredentials: true, // if your backend uses cookies/auth
});

export default api;


export const googleAuth = (code) => api.get(`/auth/google?code=${code}`);