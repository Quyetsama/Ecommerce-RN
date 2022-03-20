import React from 'react'
import { Dimensions } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'
import { HomeStack, OrderStack, ProfileStack, SearchStack, AuthStack } from './StackNavigator'
import { violet } from '../helpers/configs'
import { useSelector } from 'react-redux'


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

    const quantity = useSelector(state => state.cartReducer.products.length)

    const getTabBarVisibility = (route) => {
        // console.log(route)
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed'
        // console.log(routeName)

        const routes = ['Detail', 'Cart', 'Checkout', 'myStore', 'Voucher', 'History']

        if(routes.includes(routeName)) return 'none'
        return 'flex'
    }

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarLabel: () => null,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'tabHome') {
                    iconName = 'home';
                } else if (route.name === 'tabOrder') {
                    iconName = 'shopping-bag';
                } else if (route.name === 'tabNotification') {
                    iconName = 'bell';
                } else if (route.name === 'tabProfile') {
                    iconName = 'user';
                }
                
                // You can return any component that you like here!
                return <Feather name={ iconName } size={ 21 } color={ color } />
            },
            tabBarStyle: {
                display: getTabBarVisibility(route),
                borderTopLeftRadius: 21,
                borderTopRightRadius: 21,
                backgroundColor: "#fff",
                position: 'absolute',
                bottom: 0,
                // padding:10,
                width: WIDTH,
                height: HEIGHT / 12,
                zIndex: 8
            },
            tabBarActiveTintColor: violet,
            tabBarInactiveTintColor: 'gray',
            headerShown: false
        })}>
            <Tab.Screen name="tabHome" component={ HomeStack } options={{ title: 'Trang chủ' }} />
            {/* <Tab.Screen name="tabOrder" component={ OrderStack } options={{ title: 'Đơn hàng', tabBarBadge: quantity }} /> */}
            <Tab.Screen name="tabNotification" component={ OrderStack } options={{ title: 'Thông báo', tabBarBadge: 21 }} />
            <Tab.Screen name="tabProfile" component={ ProfileStack } options={{ title: 'Tôi' }} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator