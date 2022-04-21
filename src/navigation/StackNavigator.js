import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../screens/HomeScreen'
import DetailScreen from '../screens/DetailScreen'

import CartScreen from '../screens/CartScreen'
import CheckOutScreen from '../screens/CheckoutScreen'
import NewAddress from '../screens/NewAddress'
import SelectAddress from '../screens/SelectAddress'
import SuccessScreen from '../screens/SuccessScreen'

import HistoryScreen from '../../src/screens/history/HistoryScreen'
import ListOrderScreen from '../screens/history/ListOrderScreen'
import DetailOrder from '../screens/history/DetailOrder'

import ProfileScreen from '../screens/ProfileScreen'
import VoucherScreen from '../screens/VoucherScreen'

import StoreScreen from '../screens/mystore/StoreScreen'
import AddProductScreen from '../screens/mystore/AddProductScreen'
import AddCategoryProduct from '../screens/mystore/AddCategoryProduct'
import ClassifyProduct from '../screens/mystore/ClassifyProductScreen'
import PriceQuantity from '../screens/mystore/PriceQuantityScreen'

import SearchScreen from '../screens/search/SearchScreen'
import SearchResult from '../screens/search/SearchResult'

import SignInScreen from '../screens/auth/SignInScreen'
import SignUpScreen from '../screens/auth/SignUpScreen'

import BottomTabNavigator from './TabNavigator'



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

const Root = () => {
    return (
        <Stack.Navigator screenOptions={ screenOptionStyle }>
            <Stack.Screen name="Main" component={ BottomTabNavigator } />
            <Stack.Screen name="Order" component={ OrderStack } options={{ animation: 'fade_from_bottom' }} />
        </Stack.Navigator>
    )
}

const HomeStack = () => {
    return(
        <Stack.Navigator screenOptions={ screenOptionStyle }>
            <Stack.Screen name="Home" component={ HomeScreen } />
            <Stack.Screen name='stackSearch' component={ SearchStack } options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Detail" component={ DetailScreen } />
        </Stack.Navigator>
    )
}

const SearchStack = () => {
    return (
        <Stack.Navigator screenOptions={ screenOptionStyle }>
            <Stack.Screen name="Search" component={ SearchScreen } options={{ animation: 'fade' }} />
            <Stack.Screen name="SearchResult" component={ SearchResult } options={{ animation: 'slide_from_right' }} />
        </Stack.Navigator>
    )
}

const OrderStack = () => {
    return(
        <Stack.Navigator screenOptions={ screenOptionStyle }>
            <Stack.Screen name="Cart" component={ CartScreen } />
            <Stack.Screen name="Checkout" component={ CheckOutScreen } />
            <Stack.Screen name="NewAddress" component={ NewAddress } />
            <Stack.Screen name="SelectAddress" component={ SelectAddress } />
            <Stack.Screen name="Success" component={ SuccessScreen } />
            <Stack.Screen name="Voucher" component={ VoucherScreen } />
        </Stack.Navigator>
    )
}

const ProfileStack = () => {
    return(
        <Stack.Navigator screenOptions={ screenOptionStyle }>
            <Stack.Screen name="Profile" component={ ProfileScreen } />
            <Stack.Screen name="Voucher" component={ VoucherScreen } />
            <Stack.Screen name="myStore" component={ StoreStack } />
            {/* <Stack.Screen name="Order" component={ OrderStack } /> */}
            {/* <Stack.Screen name="Cart" component={ CartScreen } />
            <Stack.Screen name="Checkout" component={ CheckOutScreen } />
            <Stack.Screen name="Success" component={ SuccessScreen } /> */}
            <Stack.Screen name="HistoryStack" component={ HistoryStack } />
        </Stack.Navigator>
    )
}
const HistoryStack = () => {
    return(
        <Stack.Navigator screenOptions={ screenOptionStyle }>
            <Stack.Screen name="History" component={ HistoryScreen } />
            <Stack.Screen name="ListOrderScreen" component={ ListOrderScreen } />
            <Stack.Screen name="DetailOrder" component={ DetailOrder } />
        </Stack.Navigator>
    )
}

const StoreStack = () => {
    return(
        <Stack.Navigator screenOptions={ screenOptionStyle }>
            <Stack.Screen name="Store" component={ StoreScreen } />
            <Stack.Screen name="AddProductStack" component={ AddProductStack } />
        </Stack.Navigator>
    )
}

const AddProductStack = () => {
    return(
        <Stack.Navigator screenOptions={ screenOptionStyle }>
            <Stack.Screen name="AddProduct" component={ AddProductScreen } />
            <Stack.Screen name="AddCategoryProduct" component={ AddCategoryProduct } />
            <Stack.Screen name="ClassifyProduct" component={ ClassifyProduct } />
            <Stack.Screen name="PriceQuantity" component={ PriceQuantity } />
        </Stack.Navigator>
    )
}



export { AuthStack, HomeStack, OrderStack, ProfileStack, SearchStack, StoreStack, Root }
