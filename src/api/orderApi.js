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
        }
    )
}

const getListOrder = (token, status) => {
    const url = `/order/${ status }`
    return axiosClient.get(url,
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const detailOrder = (token, id) => {
    const url = `/order/detail/${ id }`
    return axiosClient.get(url,
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export { 
    orderApi,
    getListOrder,
    detailOrder
}