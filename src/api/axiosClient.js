import axios from "axios"


const axiosClient = axios.create({
    baseURL: 'http://192.168.0.106:3000/api/v1',
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