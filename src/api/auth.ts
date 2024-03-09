import {useFetch} from "@/composables/useFetch";
import {IAuth} from "@/types/auth";

export const auth = (data: IAuth) => {
  return useFetch().post('/auth', data)
}

export const checkAuth = () => {
  return useFetch().get('/check')
}
