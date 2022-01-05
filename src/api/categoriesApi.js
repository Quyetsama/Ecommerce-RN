import axiosClient from "./axiosClient"


const getAllCategory = () => {
    const url = '/category'
    return axiosClient.get(url)
}

const getAllProduct = (page) => {
    const url = `/product?page=${page}`
    return axiosClient.get(url)
}

const getProductByCategory = (id, page) => {
    let url = ''
    
    if(id === 'all') {
        url = `/product?page=${page}`
    }
    else {
        url = `/product/${id}?page=${page}`
    }

    return axiosClient.get(url)
}

export { 
    getAllCategory,
    getAllProduct,
    getProductByCategory
}