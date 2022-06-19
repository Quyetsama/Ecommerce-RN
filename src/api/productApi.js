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

const getDetailProduct = (id, token) => {
    const url = `/product/detail/${ id }`
    return axiosClient.get(url, {
        headers: {
            Authorization: token
        }
    })
}

const searchProduct = (query) => {
    const url = `/product/search/?name=${ query }`
    return axiosClient.get(url)
}

const suggestProduct = () => {
    const url = `/product/suggest`
    return axiosClient.get(url)
}

const relatedProduct = (query, page, filters) => {
    const url = `/product/related?name=${ query }&page=${ page }&filters=${ JSON.stringify(filters) }`
    return axiosClient.get(url)
}

const sellingProduct = (query, page, filters) => {
    const url = `/product/selling?name=${ query }&page=${ page }&filters=${ JSON.stringify(filters) }`
    return axiosClient.get(url)
}

const sortPriceProduct = (query, page, sort, filters) => {
    const url = `/product/price?name=${ query }&page=${ page }&sort=${ sort }&filters=${ JSON.stringify(filters) }`
    return axiosClient.get(url)
}

const favoriteProduct = (token, query, product) => {
    const url = `/user/favorite?love=${query}`
    return axiosClient.patch(url, 
        {
            product: product
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getFavorites = (token) => {
    const url = `/user/favorite`
    return axiosClient.get(url,
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export { 
    createProduct,
    getDetailProduct,
    searchProduct,
    suggestProduct,
    relatedProduct,
    sellingProduct,
    sortPriceProduct,
    favoriteProduct,
    getFavorites
}