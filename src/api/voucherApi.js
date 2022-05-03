import axiosClient from "./axiosClient"


const getListVoucher = (token) => {
    const url = `/voucher`
    return axiosClient.get(url, {
        headers: {
            Authorization: token
        }
    })
}

const getVoucherByCode = (token, code) => {
    const url = `/voucher/${ code }`
    return axiosClient.get(url, {
        headers: {
            Authorization: token
        }
    })
}

export { 
    getListVoucher,
    getVoucherByCode
}