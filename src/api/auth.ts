import {useFetch} from "@/composables/useFetch";
import {IAuth} from "@/types/auth";
import {AxiosResponse} from "axios";

export const auth = (data: IAuth): Promise<AxiosResponse<{ token: string }>> => {
  return useFetch().post('/auth', data)
}

export const checkAuth = (): Promise<AxiosResponse> => {
  return useFetch().get('/check')
}
