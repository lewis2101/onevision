import axios from "axios";
import error from '@/composables/useError'
import router from "@/router";

export const useFetch = () => {
  const instance = axios.create({
    // baseURL: 'https://onevision-api.vercel.app/api',
    baseURL: 'http://localhost:8080/api',
    headers: {
      token: localStorage.getItem('token')
    }
  })
  instance.interceptors.response.use(
    (value) => Promise.resolve(value),
    (value) => {
      if(value.response.data.type === 'AUTH_REQUIRED') {
        router.push({ name: 'login' })
        throw value
      }
      error.show()
      throw value
    }
  )
  return instance
}
