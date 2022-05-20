import axiosClient from "./axiosClient"


const getNotify = (token) => {
    const url = '/notification'
    return axiosClient.get(url, {
        headers: {
            Authorization: token
        }
    })
}

const readNotify = (token, idNotify) => {
    const url = '/notification'
    return axiosClient.patch(url, 
        {
            _id: idNotify
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const countNotify = (token) => {
    const url = '/notification/count'
    return axiosClient.get(url,
        {
            headers: {
                Authorization: token
            }
        }
    )
}


export { 
    getNotify,
    readNotify,
    countNotify
}