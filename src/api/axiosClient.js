import axios from "axios"
import { doMain } from "../helpers/configs"


const axiosClient = axios.create({
    baseURL: `${doMain}api/v1`,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosClient.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error);
})

axiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    return Promise.reject(error);
})

export default axiosClient