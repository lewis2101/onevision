import axios, {AxiosInstance} from "axios";
import error from '@/composables/useError'
import router from "@/router";

const baseURL = import.meta.env.VITE_BASE_URL
export const useFetch = (): AxiosInstance => {
  const instance = axios.create({
    baseURL,
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
      if(value.response.status === 403) throw value
      error.show()
      throw value
    }
  )
  return instance
}
