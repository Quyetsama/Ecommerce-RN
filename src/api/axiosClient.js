import axios from "axios"
import { doMain } from "../helpers/configs"
import { store } from '../../index'
import { logout } from '../redux/actions/authAction'


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
    if (error.response.status === 401) {
        console.log('Nhan duoc loi 401')
        store.dispatch(logout())
    }
    return Promise.reject(error);
})

export default axiosClient