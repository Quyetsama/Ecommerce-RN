import React, { useState, useEffect } from 'react'
import { suggestProduct } from '../api/productApi'
import { useSelector } from 'react-redux'



const useFetchCarousel = () => {

    const { refreshing } = useSelector(state => state.homeReducer)
    const [products, setProducts] = useState([])

    useEffect(() => {
        if(refreshing) {
            fetchSuggest()
        }
    }, [refreshing])

    const fetchSuggest = React.useCallback(async () => {
        try {
            const res = await suggestProduct()
            if(res?.data.success) {
                setProducts([...res.data.data])
            }
        }
        catch(error) {
            console.log(error.response.data)
        }
    }, [])

    return products
}

export default useFetchCarousel