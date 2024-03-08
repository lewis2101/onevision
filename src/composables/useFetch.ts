import axios from "axios";

export const useFetch = () => {
    return axios.create({
        baseURL: 'https://onevision-api.vercel.app/api',
    })
}
