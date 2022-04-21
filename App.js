import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import RNBootSplash from 'react-native-bootsplash'
import { NavigationContainer  } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStack, SearchStack, StoreStack, Root } from "./src/navigation/StackNavigator"
// import BottomTabNavigator from "./src/navigation/TabNavigator"
import SplashScreen from "./src/screens/auth/SplashScreen"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveToken, login, logout } from './src/redux/actions/authAction'
import DetailScreen from "./src/screens/DetailScreen"

import { getCurrentUser } from "./src/api/authApi"


const Stack = createNativeStackNavigator()

const App = () => {

    const dispatch = useDispatch()
    const userToken = useSelector(state => state.authReducer.userToken)

    useEffect(() => {
        const init = async () => {
            const token = await AsyncStorage.getItem('userToken')
            // token !== null ? dispatch(retrieveToken(token)) : dispatch(logout())
            // console.log('token: ', token)

            if(token) {
                try{
                    const user = await getCurrentUser(token)
                    // console.log(user.data.profile)
                    dispatch(login(user.data.profile.fullName, token, user.data.profile.coin, user.data.profile.email))
                }
                catch(error) {
                    if(error.response.data) {
                        dispatch(logout())
                    }
                }
            }
            else {
                dispatch(logout())
            }
        }
    
        init().finally(async () => {
            await RNBootSplash.hide({ fade: true })
        })
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{
                    headerShown: false,
                }}
            >    
                {/* <Stack.Screen name='stackAuth' component={ AuthStack }/>  */}
                <Stack.Screen name='Root' component={ Root }/>
                {/* <Stack.Screen name='stackSearch' component={ SearchStack } /> */}
                { userToken === null && <Stack.Screen name='stackAuth' component={ AuthStack } options={{ animation: 'slide_from_right' }}/> }
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