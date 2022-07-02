import axios from "axios"
import { URL_API } from "../utils"
import { store } from '../../index'
import { logout } from '../redux/actions/authAction'
import AsyncStorage from '@react-native-async-storage/async-storage'


const axiosClient = axios.create({
    baseURL: `${URL_API}/api/v1`,
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
}, async (error) => {
    try {
        console.log(error.response?.data)
        if (error.response?.status === 401) {
            console.log('Status code = 401')
            await AsyncStorage.removeItem('userToken');
            store.dispatch(logout())
        }
    }
    catch(errorAsyncStorage) {
        console.log(errorAsyncStorage)
    }
    return Promise.reject(error);
})

export default axiosClient