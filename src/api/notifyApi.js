import axiosClient from "./axiosClient"


const getNotify = (token) => {
    const url = '/notification'
    return axiosClient.get(url, {
        headers: {
            Authorization: token
        }
    })
}


export { 
    getNotify
}