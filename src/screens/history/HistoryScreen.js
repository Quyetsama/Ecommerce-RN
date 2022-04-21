import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Text,
    useWindowDimensions,
    Dimensions,
    Image
} from 'react-native'
import CartHeader from '../../components/cartscreen/CartHeader'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { violet } from '../../helpers/configs'
import ListOrderScreen from './ListOrderScreen'
import emptyOrder from '../../assets/img/emptyOrder.png'



const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const SecondRoute = () => {
    useEffect(() => {
        console.log('2')
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
    )
}

const ThreeRoute = () => {
    useEffect(() => {
        console.log('3')
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'pink' }} />
    )
}

const renderScene = SceneMap({
    first: () => <ListOrderScreen status={ 0 } />,
    second:  () => <ListOrderScreen status={ 1 } />,
    third:  () => <ListOrderScreen status={ 2 } />,
})

const LazyPlaceholder = ({ route }) => {

    // console.log(route.title)

    return (
        <View style={ styles.emptyContainer }>
            <Image 
                style={ styles.emptyOrder }
                source={ emptyOrder }
            />
            <Text style={ styles.emptyText }>Opps... It's empty in here</Text>
        </View>
    )
}


const HistoryScreen = ({ navigation }) => {

    const layout = useWindowDimensions()

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'unconfimred' },
        { key: 'second', title: 'Delivering' },
        { key: 'third', title: 'Delivered' },
    ])


    const renderTabBar = (props) => {

        return (
            <View style={styles.tabBar}>
                <TabBar
                    {...props}
                    renderLabel={({ focused, route }) => {
                        return (
                            <Text
                                numberOfLines={1}
                                style={{
                                    color: focused ? violet : '#000'
                                }}
                            >
                                {route.title}
                            </Text>
                        )
                    }}
                    indicatorStyle={styles.indicatorStyle}
                    style={styles.tabBarStyle}
                />
                {/* <TouchableOpacity>
                    <Text>123</Text>
                </TouchableOpacity> */}
          </View>
        )
    }

    return (
        <View style={ styles.container }>
            <CartHeader 
                label={'Orders'}
                hideElevation
                goBack={() => {
                        navigation.goBack()
                    }
                }
            />
            <TabView
                lazy
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderLazyPlaceholder={({route}) => <LazyPlaceholder route={route} />}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabBar: {
        flexDirection: 'row'
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white'
    },
    scene: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabBarStyle: {
        flex: 1,
        backgroundColor: 'white',
        // borderBottomWidth: 1,
        // borderColor: '#000',
    },
    indicatorStyle: {
        backgroundColor: violet,
        padding: 1.5,
        // marginBottom: -2,
    },
    emptyContainer: {
        alignSelf: 'center',
    },
    emptyOrder: {
        width: 150,
        height: 150
    },
    emptyText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '500',
        marginTop: 18
    }
})

export default HistoryScreen