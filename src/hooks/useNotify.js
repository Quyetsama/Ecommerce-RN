import React, { useState, useEffect } from 'react'
import { getNotify } from '../api/notifyApi'


const useNotify = () => {
    const [notifies, setNotifies] = useState([])

    useEffect(() => {
        const fetchNotify = async () => {
            try {
                const res = await getNotify()

                if(res.data.success) {
                    setNotifies(res.data.data)
                }
            }
            catch(error) {
                console.log(error.response.data)
            }            
        }

        fetchNotify()
    }, [])

    return { notifies }
}

export default useNotify