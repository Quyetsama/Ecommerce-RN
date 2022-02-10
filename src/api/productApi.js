import axiosClient from "./axiosClient"


const createProduct = (data) => {
    const url = '/product/create'
    return axiosClient.post(url, {
        ...data
    },
    {
        headers: {
            Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJxdXlldHNhbWEiLCJzdWIiOiI2MWQ1MDM0YzZkZTAxMGI4ZTU1YzNlNjYiLCJpYXQiOjE2NDI4MjEzNTA4MjUsImV4cCI6MTY0MzA4MDU1MDgyNX0.XEvgjMg4fkVsBDvrM2P7mtPIEcWNhoZGjpxuOeZcIcI'
        }
    })
}

const getDetailProduct = (id) => {
    const url = `/product/detail/${ id }`
    return axiosClient.get(url)
}

export { 
    createProduct,
    getDetailProduct
}