import axiosClient from "./axiosClient"


const getAllCategory = () => {
    const url = '/category'
    return axiosClient.get(url)
}

const getAllProduct = (page) => {
    const url = `/product?page=${page}`
    return axiosClient.get(url)
}

export { 
    getAllCategory,
    getAllProduct
}