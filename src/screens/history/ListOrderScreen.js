import React, { useState, useEffect, useCallback } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    Image
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { violet } from '../../helpers/configs'
import { useSelector } from 'react-redux'
import { getListOrder } from '../../api/orderApi'
import { handleTime } from '../../helpers/validation'
import emptyOrder from '../../assets/img/emptyOrder.png'
import { useNavigation } from '@react-navigation/native'


const convertVND = (value) => {
    return (value).toLocaleString('vi', {style : 'currency', currency : 'VND'})
}

const Item = React.memo(({ item, onClick }) => {
    // 9087e8
    return (
    <View style={ styles.itemContainer }>
        <View style={ styles.iconContainer }>
            <Ionicons name='receipt-outline' size={50} color='tomato' />
        </View>
        <View style={ styles.itemDetail }>
            <View style={ styles.topDetail }>
                <Text style={ styles.idBill } numberOfLines={1}>Order #{ item.code }</Text>
                <Text>{ handleTime(item.createdAt) }</Text>
            </View>
            <View style={ styles.botDetail }>
                <View>
                    <Text style={{ paddingVertical: 12 }}>Quantity: { item.ordersInfo.length }</Text>
                    <Text>Total Price: { convertVND(item.total) }</Text>
                </View>
                <TouchableOpacity 
                    style={ styles.btnDetails }
                    onPress={ onClick }
                >
                    <Text style={ styles.txtBtn }>Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    )
})

const DATA = [
    {order: 'NPOK8T1', quantity: 3, total: 100000, time: '21/01/2025'},
    {order: 'NPOK8T2', quantity: 2, total: 200000, time: '21/01/2025'},
    {order: 'NPOK8T3', quantity: 1, total: 150000, time: '21/01/2025'},
    {order: 'NPOK8T4', quantity: 6, total: 220000, time: '21/01/2025'},
    {order: 'NPOK8T5', quantity: 1, total: 50000, time: '21/01/2025'},
    {order: 'NPOK8T6', quantity: 1, total: 100000, time: '21/01/2025'},
    {order: 'NPOK8T7', quantity: 2, total: 73900, time: '21/01/2025'},
]

const ListOrderScreen = ({ status }) => {

    const navigation = useNavigation()

    const { userToken } = useSelector(state => state.authReducer)
    const [listOrder, setListOrder] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        // console.log(1)
        fetchOrder()
    }, [])

    const fetchOrder = useCallback(async () => {
        try {
            setRefreshing(true)
            const res = await getListOrder(userToken, status)
            // console.log(res.data.orders)
            setListOrder(res.data.orders)
            setRefreshing(false)
        }
        catch(error) {
            console.log(error.response.data)
            setRefreshing(false)
        }
    }, [refreshing])

    const handleClick = React.useCallback((id) => {
        navigation.navigate('DetailOrder', {
            id: id,
            status: status
        })
    }, [listOrder])
    
    return (
        <View style={ styles.container }>
            <FlatList
                contentContainerStyle={{ padding: 18 }}
                showsVerticalScrollIndicator={ false }
                data={ listOrder }
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                    <Item item={ item } onClick={() => handleClick(item._id)} />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={fetchOrder}
                    />
                }
                ListFooterComponent={
                    listOrder.length === 0 &&
                    <View style={ styles.emptyContainer }>
                        <Image 
                            style={ styles.emptyOrder }
                            source={ emptyOrder }
                        />
                        <Text style={ styles.emptyText }>Opps... It's empty in here</Text>
                    </View>
                    
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 18,
        backgroundColor: 'white'
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 18,
        borderRadius: 8,
        elevation: 6,
        marginBottom: 18
    },
    iconContainer: {
        marginRight: 18
    },
    itemDetail: {
        flex: 1,
        justifyContent: 'space-between'
    },
    topDetail: {
        flexDirection: 'row'
    },
    botDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    idBill: {
        flex: 1,
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold'
    },
    btnDetails: {
        alignSelf: 'flex-end',
        backgroundColor: violet,
        borderRadius: 4,
        paddingVertical: 6,
        paddingHorizontal: 12
    },
    txtBtn: {
        color: 'white',
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

export default React.memo(ListOrderScreen)