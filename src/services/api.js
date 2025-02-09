
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: `${process.env.API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach token automatically
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');  // ✅ Get stored token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // ✅ Attach token
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default api;

