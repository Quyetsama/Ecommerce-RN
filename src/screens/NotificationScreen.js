import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    StatusBar,
    ScrollView,
    Image,
    FlatList,
    RefreshControl
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { COLOR, SCREEN } from '../helpers/configs'
import orderImage from '../assets/img/order.png'
import discountImage from '../assets/img/discount.png'
import { useSelector } from 'react-redux'
import useNotify from '../hooks/useNotify'
import { getNotify } from '../api/notifyApi'
import { timeSince } from '../helpers/validation'


const NotifyHeader = ({ goToCart }) => {
    return (
        <View style={ styles.notifyHeader }>
            <StatusBar translucent barStyle='dark-content' />
            <TouchableOpacity
                    onPress={ goToCart }
                    style={styles.iconCart}
                >
                    <View style={styles.iconBadge}>
                        <Text style={{ color: '#fff', fontSize: 11 }}>3</Text>
                    </View>
                    <MaterialCommunityIcons name={'cart-outline'} size={25} color={COLOR.violet} />
            </TouchableOpacity>
            <Text style={ styles.label }>Notification</Text>
        </View>
    )
}

const ItemNotify = React.memo(({ title, body, time, onClick }) => {
    return (
        <TouchableOpacity
            style={ styles.itemNotify }
            onPress={ onClick }
        >
            <Image
                style={ styles.image }
                source={ orderImage }
                // resizeMode='stretch'
            />

            <View style={ styles.itemBody }>
                <View style={ styles.itemTime }>
                    <Text style={ styles.itemTitle } numberOfLines={ 1 }>{ title }</Text>
                    <Text style={{ fontSize: 12 }}>
                        <Entypo name={'back-in-time'} size={12} /> { timeSince(time) }
                    </Text>
                </View>
                <Text numberOfLines={2} style={ styles.itemMessage }>{ body }</Text>
            </View>
        </TouchableOpacity>
    )
})

const NotificationScreen = ({ navigation }) => {

    const { userToken } = useSelector(state => state.authReducer)
    const [notifies, setNotifies] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        fetchNotify()
    }, [])

    const fetchNotify = React.useCallback(async () => {
        try {
            setRefreshing(true)
            const res = await getNotify(userToken)

            if(res.data.success) {
                setNotifies(res.data.data)
                setRefreshing(false)
            }
        }
        catch(error) {
            console.log(error.response.data)
            setRefreshing(false)
        }            
    }, [refreshing])

    const goToCart = React.useCallback(() => {
        navigation.navigate('Order', { screen: 'Cart' })
    }, [])

    const goToOrder = React.useCallback((index) => {

        navigation.navigate('HistoryStack', {
            screen: 'History',
            params: {
                index: index
            }
        })

        // navigation.navigate('tabProfile', {
        //     screen: 'HistoryStack',
        //     params: {
        //         screen: 'History',
        //         params: { index: 1 }
        //     }
        // })
    }, [])

    return (
        <View style={ styles.container }>
            <NotifyHeader goToCart={ goToCart } />

            <FlatList
                contentContainerStyle={{ paddingBottom: 200 }}
                data={ notifies }
                keyExtractor={(item) => item._id}
                renderItem={({item, index}) => (
                    <ItemNotify 
                        title={ item.title } 
                        body={ item.body } 
                        time={ item.createdAt } 
                        onClick={() => goToOrder(item.type) }
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={ refreshing }
                        onRefresh={ fetchNotify }
                    />
                }
            />
            
        </View>
    )
}

const color = '#021961'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    notifyHeader: {
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 28,
        paddingBottom: 12,
        elevation: 3
    },
    iconCart: {
        position: 'absolute',
        right: 20,
        paddingTop: 15,
        zIndex: 100
    },
    label: {
        color: '#000',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    iconBadge: {
        position: 'absolute',
        top: 9,
        right: -6,
        zIndex: 10,
        backgroundColor: color,
        width: 19,
        height: 19,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'red'
    },
    itemNotify: {
        flexDirection: 'row',
        width: '100%',
        // image : margin: 12
        height: SCREEN.HEIGHT / 10 + 24,
        backgroundColor: 'white',
        borderRadius: 12,
        marginTop: 12,
        elevation: 3
    },
    image: {
        width: SCREEN.HEIGHT / 10,
        height: SCREEN.HEIGHT / 10,
        margin: 12,
        borderRadius: 12,
    },
    itemBody: {
        flex: 1,
        marginRight: 12,
        marginTop: 12
    },
    itemTime: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemTitle: {
        flex: 1,
        marginRight: 12,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    itemMessage: {
        flex: 1,
        marginTop: 8,
        marginBottom: 12
    }
})

export default NotificationScreen