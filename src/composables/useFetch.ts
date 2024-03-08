import axios from "axios";

export const useFetch = () => {
    return axios.create({
        baseURL: 'http://localhost:8080/api',
    })
}
