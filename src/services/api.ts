import axios from 'axios'
import { CONFIG } from '../config'

const api = axios.create({
  baseURL: CONFIG.API_BASE_URL,
})

// Attach JWT from localStorage to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sw_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
