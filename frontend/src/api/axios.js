
import axios from 'axios';

const axiosInstance = axios.create({

    baseURL: '',
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