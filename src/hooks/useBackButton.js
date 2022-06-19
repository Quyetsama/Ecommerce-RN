import React, { useEffect } from 'react'
import {
    BackHandler
} from 'react-native'


const useBackButton = (func) => {
    useEffect(() => {
        const backAction = func
    
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        )
    
        return () => backHandler.remove()
    }, [])
}

export default useBackButton