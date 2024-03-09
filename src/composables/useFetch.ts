import axios from "axios";
import error from '@/composables/useError'

export const useFetch = () => {
    const instance = axios.create({
        // baseURL: 'https://onevision-api.vercel.app/api',
      baseURL: 'http://localhost:8080/api'
    })
  instance.interceptors.response.use(
    (value) => Promise.resolve(value),
    (value) => {
        error.show()
        throw value
    }
  )
  return instance
}
