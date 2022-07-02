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
import { convertVND, handleDate } from '../../utils/validation'
import Separator from '../../components/Separator'
import { useSelector } from 'react-redux'
import { detailOrder } from '../../api/orderApi'
import LoadingModal from '../../components/modal/LoadingModal'
import { COLORS, URL_API, WINDOW_WIDTH } from '../../utils'
import ButtonCustom from '../../components/button/ButtonCustom'
import { Rating, AirbnbRating } from 'react-native-ratings'



const ItemProduct = React.memo(({ item }) => {

    return (
        <View style={ styles.product }>
            <Image
                style={ styles.image }
                source={{ uri: URL_API + '/image/' + item.product.image[0] }}
            />
            
            <View style={ styles.detailProduct }>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={ styles.nameProduct } numberOfLines={1}>{ item.product.name }</Text>
                    <Text style={{ color: '#000' }}>X{ item.quantity }</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{ 
                        item.classify && item.classify[0] +
                        (item.classify[1] ? `, ${ item.classify[1] }` : '')
                    }</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {
                        item.rating &&
                        <AirbnbRating
                            isDisabled={ true }
                            defaultRating={ item.rating }
                            showRating={ false }
                            size={ 15 }
                            starContainerStyle={{ alignSelf: 'flex-start' }}
                        />
                    }
                    <Text style={ styles.priceProduct }>{ convertVND(item.price) }</Text>
                </View>
                
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
        const unsubscribe  = navigation.addListener('focus', () => {
            fetchDetailOrder()
        });
    
        return unsubscribe
    }, [navigation])

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
                <>
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
                            <Item title={'Total'} value={ order?.total } />
                        </View>

                        <View style={ styles.billContainer }>
                            <View style={ styles.order }>
                                <Text style={ styles.orderText }>Order</Text>
                                <Text style={ styles.orderText }>#{ order?.code }</Text>
                            </View>
                            <View style={ styles.order }>
                                <Text style={[ styles.orderText, { color: '#969696', fontWeight: null } ]}>Time order</Text>
                                <Text style={[ styles.orderText, { color: '#969696', fontWeight: null } ]}>{ handleDate(order?.createdAt) }</Text>
                            </View>
                            {
                                status === 2 &&
                                <View style={ styles.order }>
                                    <Text style={[ styles.orderText, { color: '#969696', fontWeight: null } ]}>Time delivery</Text>
                                    <Text style={[ styles.orderText, { color: '#969696', fontWeight: null } ]}>{ handleDate(order?.deliveryTime) }</Text>
                                </View>
                            }
                        </View>
                    </ScrollView>
                    
                    {
                        status === 2 && !order.rating &&
                        <ButtonCustom 
                            text={ 'Rating' }
                            onPress={() => navigation.navigate('RatingOrder', {
                                _id: order._id,
                                ordersInfo: order.ordersInfo
                            })}
                        />
                    }
                </>
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
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: 'bold'
    },
    addressText: {
        fontSize: 16,
        // fontWeight: '500',
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
        flex: 1,
        height: 100,
        marginLeft: 12,
        justifyContent: 'space-between'
    },
    nameProduct: {
        flex: 1,
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
    }
})

export default DetailOrder