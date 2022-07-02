import React, { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { StyleSheet, Text, View } from "react-native"
import RNBootSplash from 'react-native-bootsplash'
import { NavigationContainer  } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStack, SearchStack, StoreStack, Root } from "./src/navigation/StackNavigator"
import { navigationRef } from "./src/navigation/RootNavigation"
// import BottomTabNavigator from "./src/navigation/TabNavigator"
import SplashScreen from "./src/screens/auth/SplashScreen"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveToken, login, logout } from './src/redux/actions/authAction'
import DetailScreen from "./src/screens/DetailScreen"

import { getCurrentUser } from "./src/api/authApi"
import { countNotify } from "./src/api/notifyApi"
import { setCountNotify } from "./src/redux/actions/notifyAction"
import useNotification from "./src/hooks/useNotification"
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'


const Stack = createNativeStackNavigator()

const App = () => {

    const userToken = useSelector(state => state.authReducer.userToken)
    const dispatch = useDispatch()
    // console.log('token', userToken)
    useNotification()

    useEffect(() => {
        const init = async () => {
            const token = await AsyncStorage.getItem('userToken')

            if(token) {
                try{
                    const user = await getCurrentUser(token)
                    // console.log(user.data.profile)
                    dispatch(login(user.data.profile.fullName, token, user.data.profile.coin, user.data.profile.email))
                    dispatch(setCountNotify(user.data.countNotify))
                }
                catch(error) {
                    console.log(error)
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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <NavigationContainer ref={ navigationRef }>
                    <Stack.Navigator 
                        screenOptions={{
                            headerShown: false,
                        }}
                    >    
                        <Stack.Screen name='Root' component={ Root } />
                        { userToken === null && <Stack.Screen name='stackAuth' component={ AuthStack } options={{ animation: 'slide_from_right' }}/> }
                    </Stack.Navigator>
                </NavigationContainer>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
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