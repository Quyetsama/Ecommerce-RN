import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../screens/HomeScreen'
import OrderScreen from '../screens/OrderScreen'
import ProfileScreen from '../screens/ProfileScreen'
import StoreScreen from '../screens/mystore/StoreScreen'
import AddProductScreen from '../screens/mystore/AddProductScreen'
import SearchScreen from '../screens/SearchScreen'
import SignInScreen from '../screens/auth/SignInScreen'
import SignUpScreen from '../screens/auth/SignUpScreen'



const Stack = createNativeStackNavigator()

const screenOptionStyle = {
    headerShown: false
}


const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={ screenOptionStyle }>
            <Stack.Screen name="SignIn" component={ SignInScreen } />
            <Stack.Screen name="SignUp" component={ SignUpScreen } />
        </Stack.Navigator>
    )
}

const HomeStack = () => {
    return(
        <Stack.Navigator screenOptions={ screenOptionStyle }>
            <Stack.Screen name="Home" component={ HomeScreen } />
        </Stack.Navigator>
    )
}

const OrderStack = () => {
    return(
        <Stack.Navigator screenOptions={ screenOptionStyle }>
            <Stack.Screen name="Order" component={ OrderScreen } />
        </Stack.Navigator>
    )
}

const ProfileStack = () => {
    return(
        <Stack.Navigator screenOptions={ screenOptionStyle }>
            <Stack.Screen name="Profile" component={ ProfileScreen } />
        </Stack.Navigator>
    )
}

const StoreStack = () => {
    return(
        <Stack.Navigator screenOptions={ screenOptionStyle }>
            <Stack.Screen name="Store" component={ StoreScreen } />
            <Stack.Screen name="AddProduct" component={ AddProductScreen } />
        </Stack.Navigator>
    )
}

const SearchStack = () => {
    return (
        <Stack.Navigator screenOptions={ screenOptionStyle }>
            <Stack.Screen name="Search" component={ SearchScreen } />
        </Stack.Navigator>
    )
}



export { AuthStack, HomeStack, OrderStack, ProfileStack, SearchStack, StoreStack }
