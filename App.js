import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { NavigationContainer  } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStack, SearchStack } from "./src/navigation/StackNavigator"
import BottomTabNavigator from "./src/navigation/TabNavigator"
import SplashScreen from "./src/screens/auth/SplashScreen"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveToken, logout } from './src/redux/actions/authAction'
import DetailScreen from "./src/screens/DetailScreen"


const Stack = createNativeStackNavigator()

const App = () => {

    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.authReducer.isLoading)
    const userToken = useSelector(state => state.authReducer.userToken)

    // const [isLoading, setIsLoading] = useState(true)
    // const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        // Get token from asyncStorage is here
        const getTokenAsyncStorage = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken')
                return token
            }
            catch(error) {
                console.log(error)
            }
        }

        let token
        getTokenAsyncStorage().then(value => token = value)

        setTimeout(() => {
            token !== null ? dispatch(retrieveToken(token)) : dispatch(logout())
        }, 2000)
    }, [])

    if(isLoading) {
        return (
            <SplashScreen />
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>    
                {/* <Stack.Screen name='stackAuth' component={ AuthStack }/>  */}
                <Stack.Screen name='stackMain' component={ BottomTabNavigator }/>
                <Stack.Screen name='stackSearch' component={ SearchStack } />
                <Stack.Screen name='stackDetail' component={ DetailScreen } />
                { userToken ? <></> : <Stack.Screen name='stackAuth' component={ AuthStack }/> }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default App