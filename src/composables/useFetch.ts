import axios from "axios";
import error from '@/composables/useError'

export const useFetch = () => {
  error().modal = true
    return axios.create({
        baseURL: 'https://onevision-api.vercel.app/api',
    })
}
