import axios from 'axios';

const getBaseURL = () => {
    if (process.env.NODE_ENV === 'production') {
        return 'https://your-production-url.com';
    } else if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:3000';
    } else {
        return 'http://localhost:3000'; // default fallback
    }
};

// Create an instance of Axios
const axiosClient = axios.create({
    baseURL: getBaseURL(),
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor (optional)
axiosClient.interceptors.request.use(
    config => {
        // Add authorization headers, etc. if needed
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add a response interceptor (optional)
axiosClient.interceptors.response.use(
    response => response,
    error => {
        // Handle errors globally
        return Promise.reject(error);
    }
);

export default axiosClient;