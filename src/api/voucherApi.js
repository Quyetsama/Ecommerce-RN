import axiosClient from "./axiosClient"


const getListVoucher = (token) => {
    const url = `/voucher`
    return axiosClient.get(url, {
        headers: {
            Authorization: token
        }
    })
}

export { 
    getListVoucher
}