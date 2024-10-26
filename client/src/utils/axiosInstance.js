// axiosInstance.js
import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api', // Your base URL
});

// Set up an interceptor to attach the token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // Get token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Set Authorization header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
