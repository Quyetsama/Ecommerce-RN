import React from 'react'
import { Dimensions } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'
import { HomeStack, NotificationStack, OrderStack, ProfileStack, SearchStack, AuthStack } from './StackNavigator'
import { SIZE } from '../utils/configs'
import { COLORS } from '../utils'
import { useSelector } from 'react-redux'


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

    const lengthCart = useSelector(state => state.cartReducer.products.length)
    const countNotify = useSelector(state => state.notifyReducer.count)

    const getTabBarVisibility = (route) => {
        // console.log(route)
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed'
        // console.log(routeName)

        const routes = ['Detail', 'Cart', 'Checkout', 'myStore', 'Voucher', 'Favorite', 'HistoryStack', 'Success', 'stackSearch']

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
                } else if (route.name === 'tabNotification') {
                    iconName = 'bell';
                } else if (route.name === 'tabProfile') {
                    iconName = 'user';
                }
                
                // You can return any component that you like here!
                return <Feather name={ iconName } size={ SIZE(size - 5) } color={ color } />
            },
            tabBarStyle: {
                display: getTabBarVisibility(route),
                borderTopLeftRadius: 21,
                borderTopRightRadius: 21,
                backgroundColor: "#fff",
                position: 'absolute',
                bottom: 0,
                // padding: 10,
                width: WIDTH,
                // height: HEIGHT / 15,
                zIndex: 1000
            },
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.gray,
            headerShown: false,
            tabBarLabelStyle: {
                // fontSize: SIZE(13),
                paddingBottom: 6,
                fontWeight: '500'
            },
            tabBarLabel: () => null
        })}>
            <Tab.Screen name="tabHome" component={ HomeStack } options={{ title: 'Home' }} />
            {/* <Tab.Screen name="tabOrder" component={ OrderStack } options={{ title: 'Đơn hàng'}} /> */}
            <Tab.Screen 
                name="tabNotification" 
                component={ NotificationStack } 
                initialParams={{lengthCart: lengthCart}} 
                options={{ title: 'Notify', ...( countNotify > 0 && { tabBarBadge: countNotify }) }} 
            />
            <Tab.Screen name="tabProfile" component={ ProfileStack } options={{ title: 'Account' }} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator