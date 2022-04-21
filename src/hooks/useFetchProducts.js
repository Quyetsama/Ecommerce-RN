import React, { useState, useEffect } from 'react'
import { suggestProduct } from '../api/productApi'


const useFetchProducts = () => {

    const [product, setProduct] = useState([])


    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const res = await suggestProduct()
            setProduct([...product, ...res.data.data])
        }
        catch(error) {
            console.log(error.response.data)
        }
    }

    return { product }
}

export default useFetchProducts