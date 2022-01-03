import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
import { HomeStack, OrderStack, ProfileStack, SearchStack, AuthStack } from './StackNavigator'


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'tabHome') {
                    iconName = 'home';
                } else if (route.name === 'tabOrder') {
                    iconName = 'shopping-cart';
                } else if (route.name === 'tabProfile') {
                    iconName = 'user';
                }
                
                // You can return any component that you like here!
                return <Icon name={ iconName } size={ 21 } color={ color } />
            },
            tabBarActiveTintColor: '#34A853',
            tabBarInactiveTintColor: 'gray',
            headerShown: false
        })}>
            <Tab.Screen name="tabHome" component={ HomeStack } options={{ title: 'Trang chủ' }} />
            <Tab.Screen name="tabOrder" component={ OrderStack } options={{ title: 'Đơn hàng', tabBarBadge: 3 }} />
            <Tab.Screen name="tabProfile" component={ ProfileStack } options={{ title: 'Tôi' }} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator