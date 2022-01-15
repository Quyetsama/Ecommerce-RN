import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'
import { HomeStack, OrderStack, ProfileStack, SearchStack, AuthStack } from './StackNavigator'


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

    const getTabBarVisibility = (route) => {
        // console.log(route)
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed'
        // console.log(routeName)

        const routes = ['Detail', 'myStore']

        if(routes.includes(routeName)) return 'none'
        return 'flex'
    }

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'tabHome') {
                    iconName = 'home';
                } else if (route.name === 'tabOrder') {
                    iconName = 'shopping-bag';
                } else if (route.name === 'tabProfile') {
                    iconName = 'user';
                }
                
                // You can return any component that you like here!
                return <Feather name={ iconName } size={ 21 } color={ color } />
            },
            tabBarActiveTintColor: '#8141ff',
            tabBarInactiveTintColor: 'gray',
            headerShown: false
        })}>
            <Tab.Screen name="tabHome" component={ HomeStack } options={({ route }) => ({ title: 'Trang chủ', tabBarStyle: { display: getTabBarVisibility(route) } })} />
            <Tab.Screen name="tabOrder" component={ OrderStack } options={{ title: 'Đơn hàng', tabBarBadge: 3 }} />
            <Tab.Screen name="tabProfile" component={ ProfileStack } options={({ route }) => ({ title: 'Tôi', tabBarStyle: { display: getTabBarVisibility(route) } })} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator