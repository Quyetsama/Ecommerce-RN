import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
    Modal
} from 'react-native'
import CartHeader from '../../components/cartscreen/CartHeader'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { COLOR } from '../../helpers/configs'
import { convertVND, handleDate } from '../../helpers/validation'
import Separator from '../../components/Separator'
import { useSelector } from 'react-redux'
import { detailOrder } from '../../api/orderApi'
import LoadingModal from '../../components/modal/LoadingModal'
import { doMain } from '../../helpers/configs'


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const ItemProduct = React.memo((item) => {

    return (
        <View style={ styles.product }>
            <Image
                style={ styles.image }
                source={{ uri: doMain + 'image/' + item.item.product.image[0] }}
            />
            
            <View style={ styles.detailProduct }>
                <Text style={ styles.nameProduct } numberOfLines={1}>{ item.item.product.name }</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{ 
                        item.item.classify && item.item.classify[0] +
                        (item.item.classify[1] ? `, ${ item.item.classify[1] }` : '')
                    }</Text>
                    <Text style={{ color: '#000' }}>X{ item.item.quantity }</Text>
                </View>
                <Text style={ styles.priceProduct }>{ convertVND(item.item.price) }</Text>
            </View>
        </View>
    )
})

const Item = React.memo(({ title, value, bold }) => {
    return (
        <View style={ styles.itemContainer }>
            <Text style={[ styles.titleItem, { fontSize: bold ? 16 : 15, color: bold ? '#000' : '#969696', fontWeight: bold ? 'bold' : null } ]}>{ title }</Text>
            <Text style={{ fontSize: bold ? 16 : 15 , color: bold ? '#000' : '#969696', fontWeight: bold ? 'bold' : null }}>{ convertVND(value) }</Text>
        </View>
    )
})

const DetailOrder = ({ route, navigation }) => {

    const { userToken } = useSelector(state => state.authReducer)
    const { id, status } = route.params
    const [order, setOrder] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchDetailOrder()
    }, [])

    const fetchDetailOrder = async () => {
        try {
            const res = await detailOrder(userToken, id)
            setOrder(res.data.data)
            setIsLoading(false)
        }
        catch(error) {
            console.log(error.response.data)
            setIsLoading(false)
        }
    }

    return (
        <View style={ styles.container }>
            <CartHeader 
                label={'Detail Order'}
                goBack={() => {
                    navigation.goBack()
                }
            }
            />

            {
                order &&
                <ScrollView showsVerticalScrollIndicator={ false }>
                    <View style={ styles.deliveryAddress }>
                        <Fontisto name='map-marker-alt' size={22} color={'tomato'} />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <View style={ styles.topDelivery }>
                                <Text style={ styles.deliveryTitle }>Delivery Address</Text>
                                <Text style={ styles.change }>Change</Text>
                            </View>
                            <Text style={ styles.addressText }>- { order?.contact?.name }</Text>
                            <Text style={ styles.addressText }>- { order?.contact?.phone }</Text>
                            <Text style={ styles.addressText }>- { order?.address?.street + ', ' + order?.address?.ward + ', ' + order?.address?.district + ', ' + order?.address?.province }</Text>
                        </View>
                    </View>

                    <Separator />

                    <View>
                        {
                            order?.ordersInfo?.map(item => (
                                <ItemProduct key={ item._id } item={ item } />
                            ))
                        }
                    </View>

                    <View style={ styles.billContainer }>
                        <Item title={'Price'} value={ order?.price } />
                        <Item title={'Shipping fee'} value={ order?.transportFee } />
                        <Item title={'Discount'} value={ order?.discount } />
                        <Item title={'Total'} value={ order?.total } bold />
                    </View>

                    <View style={ styles.billContainer }>
                        <View style={ styles.order }>
                            <Text style={ styles.orderText }>Order</Text>
                            <Text style={ styles.orderText }>#{ order?.code }</Text>
                        </View>
                        <View style={ styles.order }>
                            <Text style={[ styles.orderText, { color: '#969696', fontWeight: '500' } ]}>Time order</Text>
                            <Text style={[ styles.orderText, { color: '#969696', fontWeight: '500' } ]}>{ handleDate(order?.createdAt) }</Text>
                        </View>
                        {
                            status === 2 &&
                            <View style={ styles.order }>
                                <Text style={[ styles.orderText, { color: '#969696', fontWeight: '500' } ]}>Time delivery</Text>
                                <Text style={[ styles.orderText, { color: '#969696', fontWeight: '500' } ]}>{ handleDate(order?.deliveryTime) }</Text>
                            </View>
                        }
                    </View>

                    <TouchableOpacity 
                        disabled={ status !== 0 }
                        style={ styles.btnCancel }
                    >
                        <Text style={ styles.txtCancel }>
                            {
                                status === 0 ? 'Cancel order'
                                : status === 1 ? 'Delivering'
                                : 'Delivered'
                            }
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            }
            

            <Modal
                transparent={ true }
                animationType='fade'
                visible={ isLoading }
                onRequestClose={() => navigation.goBack() }
            >
                <LoadingModal />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    deliveryAddress: {
        flexDirection: 'row',
        padding: 12
    },
    topDelivery: {
        flexDirection: 'row'
    },
    deliveryTitle: {
        flex: 1,
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    },
    change: {
        color: COLOR.violet,
        fontSize: 16,
        fontWeight: 'bold'
    },
    addressText: {
        fontSize: 16,
        fontWeight: '500',
        paddingVertical: 2,
        color: '#969696'
    },
    product: {
        // width: '100%',
        // height: 100,
        flexDirection: 'row',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    image: {
        width: 100,
        height: 100
    },
    detailProduct: {
        width: WIDTH - 136,
        height: 100,
        marginLeft: 12,
        justifyContent: 'space-between'
    },
    nameProduct: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold'
    },
    priceProduct: {
        color: 'tomato',
        textAlign: 'right',
        fontSize: 16
    },
    itemContainer: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 4
    },
    titleItem: {
        flex: 1
    },
    billContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingVertical: 6
    },
    order: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 4
    },
    orderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    btnCancel: {
        width: '75%',
        alignSelf: 'center',
        marginHorizontal: 6,
        padding: 12,
        marginVertical: 30,
        borderWidth: 0.5,
        borderColor: COLOR.violet
    },
    txtCancel: {
        textAlign: 'center',
        color: COLOR.violet,
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default DetailOrder