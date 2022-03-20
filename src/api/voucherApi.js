import axiosClient from "./axiosClient"


const getListVoucher = () => {
    const url = `/voucher`
    return axiosClient.get(url)
}

export { 
    getListVoucher
}