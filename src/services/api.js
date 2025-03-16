import { ROUTES } from '@/constants/routes'
import { isAuthenticated, removeAuth } from '@/lib'
import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

API.interceptors.request.use(
  (config) => {
    const token = isAuthenticated()

    if (token) {
      config.headers.Authorization = `${token}`
    } else {
      delete config.headers.Authorization
    }

    return config
  },
  (error) => Promise.reject(error),
)

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const message = error.response.data.message || ''

      if (message.toLowerCase().includes('token expired')) {
        removeAuth()
        window.location.href = ROUTES.RESTRICTED
      }
    }
    return Promise.reject(error)
  },
)

export default API
