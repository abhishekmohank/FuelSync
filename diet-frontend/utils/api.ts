import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (data: any) => apiClient.post('/auth/register', data),
  login: (data: any) => apiClient.post('/auth/login', data),
};

export const user = {
  getGoals: () => apiClient.get('/user/goals'),
  updateGoals: (data: any) => apiClient.post('/user/goals', data),
};

export const food = {
  addFood: (data: any) => apiClient.post('/food', data),
  detectFood: (data: any) => apiClient.post('/food/detect', data),
  getDailyFood: (date?: string) => apiClient.get('/food/daily', { params: { date } }),
  getWeeklyFood: (date?: string) => apiClient.get('/food/weekly', { params: { date } }),
  getMonthlyFood: (date?: string) => apiClient.get('/food/monthly', { params: { date } }),
  deleteFood: (id: string) => apiClient.delete(`/food/${id}`),
  updateFood: (id: string, data: any) => apiClient.put(`/food/${id}`, data),
};

export default apiClient;
