
import axios from 'axios';
//const isDev = import.meta.env.MODE === 'development';
// const baseURL = isDev
//     ? '/api'
//     : window.env?.VITE_API_BASE_URL || '';
const baseURL = '/api'
const axiosInstance = axios.create({

    // baseURL: '',
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.warn('Unauthorized or Forbidden access. Token might be invalid or expired.');
            localStorage.removeItem('token');

            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;