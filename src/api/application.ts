import {useFetch} from "@/composables/useFetch";
import {AxiosResponse} from "axios";
import {IItem} from "@/types/table";

export const getHistory = (): Promise<AxiosResponse<IItem[]>> => useFetch().get('/getHistory')
