import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create(
  {
    baseURL: 'http://localhost:3002',
    headers: {
      'Content-Type': 'application/json',
    }
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
