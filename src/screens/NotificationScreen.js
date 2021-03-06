import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    FlatList,
    RefreshControl
} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import { WINDOW_HEIGHT } from '../utils'
import orderImage from '../assets/images/order.png'
import { useSelector, useDispatch } from 'react-redux'
import { setCountNotify, decreaseNotify } from '../redux/actions/notifyAction'
import useNotify from '../hooks/useNotify'
import { getNotify, readNotify, countNotify } from '../api/notifyApi'
import { timeSince } from '../utils/validation'
import TabHeader from '../components/headers/TabHeader'




const ItemNotify = React.memo(({ item, navigation }) => {

    const { userToken } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const [read, setRead] = useState(item.read ? true: false)

    useEffect(() => {
        setRead(item.read)
    }, [item.read])

    const handleClick = async () => {
        try {
            if(userToken) {
                navigation.navigate('HistoryStack', {
                    screen: 'History',
                    params: {
                        index: item.type
                    }
                })
                if(!read) {
                    readNotify(userToken, item._id)
                    dispatch(decreaseNotify())
                    setRead(true)
                }
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    return (
        <TouchableOpacity
            style={ styles.itemNotify }
            onPress={ handleClick }
        >
            <Image
                style={ styles.image }
                source={ orderImage }
                // resizeMode='stretch'
            />

            <View style={ styles.itemBody }>
                <View style={ styles.itemTime }>
                    <Text style={ styles.itemTitle } numberOfLines={ 1 }>{ item.title }</Text>
                    <Text style={{ fontSize: 12 }}>
                        <Entypo name={'back-in-time'} size={12} /> { timeSince(item.createdAt) }
                    </Text>
                </View>
                <Text numberOfLines={2} style={ styles.itemMessage }>{ item.body }</Text>
            </View>
            {
                read === false && <View style={ styles.badge } />
            }
        </TouchableOpacity>
    )
})

const NotificationScreen = ({ navigation }) => {

    const { userToken } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const [notifies, setNotifies] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        fetchNotify()
    }, [userToken])

    useEffect(() => {
        if(!userToken) {
            setNotifies([])
            dispatch(setCountNotify(0))
        }
    }, [userToken])

    const fetchNotify = React.useCallback(async () => {
        try {
            if(userToken) {
                setRefreshing(true)
                const res = await getNotify(userToken)
                if(res?.data?.success) {
                    setNotifies(res.data.data)
                    setRefreshing(false)
                    dispatch(setCountNotify(res.data.count ? res.data.count : 0))
                }
            }
        }
        catch(error) {
            console.log(error)
            setRefreshing(false)
        }            
    }, [userToken, refreshing])

    return (
        <View style={ styles.container }>
            <TabHeader title={ 'Notifications' } />

            <FlatList
                contentContainerStyle={{ paddingBottom: 200 }}
                data={ notifies }
                keyExtractor={(item) => item._id}
                renderItem={({item, index}) => (
                    <ItemNotify
                        item={ item }
                        navigation={ navigation }
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
        height: WINDOW_HEIGHT / 10 + 24,
        backgroundColor: 'white',
        borderRadius: 12,
        marginTop: 12,
        elevation: 3
    },
    image: {
        width: WINDOW_HEIGHT / 10,
        height: WINDOW_HEIGHT / 10,
        margin: 12,
        borderRadius: 12,
    },
    itemBody: {
        flex: 1,
        marginRight: 12,
        marginTop: 12
    },
    itemTime: {
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
    },
    badge: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        width: 6,
        height: 6,
        borderRadius: 100,
        backgroundColor: 'skyblue'
    }
})

export default NotificationScreen