import axios from 'axios'

// Default to the backend server at localhost:3000 if VITE_API_URL is not provided.
// The server's default PORT in server/server.js is 3000, so this helps avoid 404s
// when the frontend is served from a different origin during development.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
})

export default api
