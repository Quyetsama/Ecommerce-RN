import React, { useState, useEffect } from 'react'
import { getAllCategory } from '../api/categoriesApi'
import { useSelector } from 'react-redux'




// const useFetchCategories = (value = []) => {
const useFetchCategories = () => {

    const { refreshing } = useSelector(state => state.homeReducer)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        if(refreshing) {
            fetchCategories()
        }
    }, [refreshing])

    const fetchCategories = React.useCallback(async () => {
        try {
            const res = await getAllCategory()
            setCategories([
                {
                    _id: 'all',
                    name: 'All',
                    image: 'all.png'
                },
                ...res.data.categories
            ])
        }
        catch(error) {
            console.log(error.response.data)
        }
    }, [])

    return categories
}

export default useFetchCategories