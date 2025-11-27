import axios from 'axios';

// For production, we'll use relative URLs and let Vercel handle the routing
const api = axios.create({
  baseURL: '', // Empty base URL for production
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add exactly one /api prefix to relative URLs in production
api.interceptors.request.use(config => {
  if (!config.url.startsWith('http')) {
    const normalizedPath = config.url.replace(/^\/?api\//i, '')
    config.url = `/api/${normalizedPath}`
  }
  return config
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    // You can add auth headers here if needed
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data)
    } else if (error.request) {
      console.error('No response received:', error.request)
    } else {
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default api
