import axiosClient from "./axiosClient"


const orderApi = (token, data) => {
    const url = '/order'
    return axiosClient.post(url, {
        ...data
    },
    {
        headers: {
            Authorization: token
        }
    })
}

export { 
    orderApi
}