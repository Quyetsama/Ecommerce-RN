import React, { useState, useEffect } from 'react'
import { getAllCategory } from '../api/categoriesApi'



const useFetchCategories = (value = []) => {
    const [categories, setCategories] = useState([...(value && value)])

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = React.useCallback(async () => {
        try {
            const res = await getAllCategory()
            setCategories([...categories, ...res.data.categories])
        }
        catch(error) {
            console.log(error.response.data)
        }
    }, [])

    return categories
}

export default useFetchCategories