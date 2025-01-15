import axios from 'axios'
import { getAuthStorage } from '@/repository/authRepository'
import { refreshAccessToken } from '@/utils/refreshAccessToken'

const BASE_URL = import.meta.env.VITE_SUPABASE_URL
const PROJECT_API_KEY = import.meta.env.VITE_SUPABASE_KEY

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/rest/v1`,
  headers: {
    apikey: PROJECT_API_KEY,
    'Content-Type': 'application/json; charset=UTF-8'
  }
})

axiosInstance.interceptors.request.use(
  async config => {
    const INITIAL_TOKEN = 'accessToken'
    const getToken = getAuthStorage(INITIAL_TOKEN)
    const token = getToken

    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  async error => {
    console.error('에러발생', error)
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const newAccessToken = await refreshAccessToken()

      if (newAccessToken) {
        error.config.headers.Authorization = `Bearer ${newAccessToken}`
        return axiosInstance(error.config)
      } else {
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
