import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../redux/actions/authAction"



const HomeScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const userToken = useSelector(state => state.authReducer.userToken)
    const userName = useSelector(state => state.authReducer.userName)

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken')
        } catch (e) {
            console.log(e)
        }

        dispatch(logout())
    }

    return (
        <View style={ styles.container }>
            <Text>Hello { userName } - Token: { userToken }</Text>
            <Text>Home</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('stackSearch')}
            >
                <Text style={{ color: '#429ae3' }}>Go To Search</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('stackAuth')}
            >
                <Text style={{ color: '#429ae3' }}>Go To SignIn</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={ handleLogout }
            >
                <Text style={{ color: '#429ae3' }}>Logout</Text>
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

export default HomeScreen