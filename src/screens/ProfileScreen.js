import React, { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useSelector } from 'react-redux'
import { secretApi } from "../api/authApi"



const ProfileScreen = ({ navigation }) => {

    const [name, setName] = useState('')

    const userToken = useSelector(state => state.authReducer.userToken)

    // useEffect(() => {
    //     if(userToken) {
    //         secretApi(userToken).then(res => {
    //             setName(res.data.profile.firstName + '-' + res.data.profile.lastName)
    //             // console.log(res.data.profile.firstName)
    //         })
    //     }
    //     else {
    //         setName('')
    //     }
    // }, [userToken])

    return (
        <View style={ styles.container }>
            <Text>Hello: { name }</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('tabOrder')}
            >
                <Text style={{ color: '#429ae3' }}>Go To Order</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ProfileScreen