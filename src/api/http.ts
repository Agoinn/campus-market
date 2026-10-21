import axios from 'axios'

// 后端就绪后，在 .env.local 里配置 VITE_API_BASE_URL 即可切过去。
export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 8000,
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[http] 请求失败', error)
    return Promise.reject(error)
  },
)
