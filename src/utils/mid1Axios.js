import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.headers['lang'] = localStorage.lang || 'ar'
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const { response, request } = error
    if (response) {
        switch (response.status) {
            case 400:
                // handle 400 error
                break
            case 401:
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                window.location.href = '/login'
                break
            case 403:
                console.error('Access denied')
                break
            case 404:
                console.error('Resource not found')
                break
            case 500:
                // handle 500 error
                break
            default:
                // handle other error
                break
        }
    }
    return Promise.reject(error)
  }
)


















export default apiClient