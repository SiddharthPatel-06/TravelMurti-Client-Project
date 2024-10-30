import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  // BASE URL
  baseURL: process.env.REACT_APP_BASE_URL,
});

// Intercept requests to add the authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    } else {
      console.warn("No auth token found."); 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
