import {useFetch} from "@/composables/useFetch";

export const getHistory = () => useFetch().get('/getHistory')
