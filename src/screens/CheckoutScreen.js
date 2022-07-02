import React, { useState, useEffect } from 'react'
import { 
    ScrollView, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View, 
    Switch,
    Image,
    LayoutAnimation,
    Platform,
    UIManager,
    Modal,
    TextInput
} from 'react-native'
import CartHeader from '../components/cartscreen/CartHeader'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { useDispatch, useSelector } from 'react-redux'
import { deleteVoucher, clearCart } from '../redux/actions/cartAction'
import { setCoin } from '../redux/actions/authAction'
import { orderApi } from '../api/orderApi'
import { getCurrentUser } from '../api/authApi'
import LoadingModal from '../components/modal/LoadingModal'
import { convertVND } from '../utils/validation'
import { COLORS, URL_API, WINDOW_WIDTH } from '../utils'



const ItemInfo = React.memo(({ icon, text, placeholder }) => {
    return (
        <View style={ styles.itemInfoContainer }>
            <MaterialCommunityIcons name={icon} size={26} color={COLORS.dark} />
            <TextInput
                editable={ false }
                value={ text }
                placeholder={ placeholder }
                multiline
                style={{
                    flex: 1,
                    padding: 0,
                    color: '#000',
                    fontSize: 16,
                    marginLeft: 6
                }}
            />
        </View>
    )
})

const ItemBill = React.memo(({ title, text, iconChevron, onCLick }) => {
    return (
        <TouchableOpacity 
            style={ styles.ItemBillContainer }
            activeOpacity={ 1 }
            onPress={ onCLick }
        >
            <Text 
                style={{
                    flex: 1,
                    color: '#969696'
                }}
            >
                { title }
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#000', marginRight: 14 }}>{ text }</Text>
                {iconChevron &&
                    <EvilIcons name='chevron-right' size={30} color={'#969696'} />
                }
            </View>
        </TouchableOpacity>
    )
})

const ExpandableProduct = React.memo(({ data, onClick }) => {

    const [layoutHeight, setLayoutHeight] = useState(0)

    useEffect(() => {
        if(data.isExpanded) {
            setLayoutHeight(null)
        }
        else {
            setLayoutHeight(0)
        }
    }, [data.isExpanded])

    return (
        <View>
            <View style={ styles.ItemBillContainer }>
                <Text 
                    style={{
                        flex: 1,
                        color: '#969696'
                    }}
                >
                    { data.title }
                </Text>
                <TouchableOpacity 
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={ onClick }
                >
                    <Text style={{ color: '#000', marginRight: 14 }}>{ data.subProduct.length } items</Text>
                    <EvilIcons name={ layoutHeight === null ? 'chevron-down' : 'chevron-right' } size={30} color={'#969696'} />
                </TouchableOpacity>
            </View>
            <View
                    style={{
                        height: layoutHeight,
                        overflow: 'hidden'
                    }}
                >
                    {
                        data.subProduct.map((item, index) => (
                            <View
                                key={ index }
                                style={ styles.productContainer }
                            >
                                <Image 
                                    style={ styles.imageProduct }
                                    source={{ uri: URL_API + '/image/' + item.image  }}
                                />
                                <View style={ styles.detailContainer }>
                                    <Text style={ styles.nameProduct } numberOfLines={ 1 }>{ item.name }</Text>
                                    <Text numberOfLines={ 1 }>{ item.selected }</Text>
                                    <Text numberOfLines={ 1 }>{ (item.price).toLocaleString('vi', {style : 'currency', currency : 'VND'}) }</Text>
                                    <Text style={ styles.quantityProduct }>x{ item.quantity }</Text>
                                </View>
                            </View>
                        ))
                    }
                </View>
        </View>
    )
})

const CheckOutScreen = ({ navigation }) => {
    
    const { products, voucher, deliveryAddress } = useSelector(state => state.cartReducer)
    // console.log(deliveryAddress)
    const { userToken } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const { coin } = useSelector(state => state.authReducer)
    const [bill, setBill] = useState({
        price: 0,
        transportFee: 0,
        coin: 0,
        discount: 0,
        total: 0
    })
    const [isLoading, setIsLoading] = useState(true)
    // console.log(coin)
    const [dataSource, setDataSource] = useState({
        isExpanded: false,
        title: 'Product',
        subProduct: [
            ...JSON.parse(JSON.stringify(products))
        ]
    })
    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState)

    useEffect(() => {
        try {
            const fetch = async () => {
                const user = await getCurrentUser(userToken)
                dispatch(setCoin(user.data.profile.coin))
                setIsLoading(false)
            }
            fetch()
        }
        catch(error) {
            navigation.goBack()
        }
    }, [])

    useEffect(() => {
        let total = 0
        let price = products.reduce((prev, cur) => prev + (cur.price * cur.quantity), 0)
        let transportFee = products.reduce((prev, cur) => prev + cur.transportFee, 0)
        let orignalTotal = price + transportFee

        if(voucher?.classify.type === 1 || voucher?.classify.type === 3) {
            total = price + transportFee - (voucher?.classify.value * 1000)
            if(voucher?.classify.type === 3 && transportFee > 0) {
                transportFee = total - price
            }
            // discount = 
        }
        else if(voucher?.classify.type === 2) {
            total = (price + transportFee) * (100 - voucher?.classify.value) / 100
        }
        else if(voucher?.classify.type === 4) {
            total = price + (transportFee * (100 - voucher?.classify.value)) / 100
            transportFee = total - price
        }
        else {
            total = price + transportFee
        }

        if(total < 0) {
            total = 0
        }

        if(isEnabled) {
            if(total >= coin) {
                total = total - coin
                setBill({
                    ...bill,
                    price: price,
                    transportFee: transportFee,
                    coin: coin,
                    discount: orignalTotal - total,
                    total: total
                })
            }
            else {
                setBill({
                    ...bill,
                    price: price,
                    transportFee: transportFee,
                    coin: total,
                    discount: orignalTotal,
                    total: 0
                })
            }
        }
        else {
            setBill({
                ...bill,
                price: price,
                transportFee: transportFee,
                coin: 0,
                discount: orignalTotal - total,
                total: total
            })
        }
    }, [products, voucher, isEnabled])

    if(Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    const updateLayout = React.useCallback(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        const newDataSource = { ...dataSource }
        newDataSource['isExpanded'] = !newDataSource['isExpanded']
        setDataSource(newDataSource)
    }, [dataSource])

    const handleOrder = async () => {
        try {
            setIsLoading(true)
            const result = products.map(item => (
                {
                    product: item._id,
                    classify: item.selected,
                    price: item.price,
                    quantity: item.quantity
                }
            ))

            const data = {
                bill: {
                    price: bill.price,
                    transportFee: bill.transportFee,
                    voucher: voucher?._id,
                    discount: bill.discount,
                    coin: bill.coin,
                    total: bill.total
                },
                products: result,
                contact: {
                    name: deliveryAddress.contact.name,
                    phone: deliveryAddress.contact.phone,
                },
                address: {
                    province: deliveryAddress.address.province.name,
                    district: deliveryAddress.address.district.name,
                    ward: deliveryAddress.address.ward.name,
                    street: deliveryAddress.contact.street
                }
            }

            const res = await orderApi(userToken, data)
            
            if(res.data.success) {
                setIsLoading(false)

                dispatch(clearCart())

                navigation.reset({
                    index: 0,
                    routes: [{name: 'Success', params: { bill: res.data.newOrder }}]
                })

                // navigation.popToTop()
                // navigation.navigate('Success', { bill: res.data.newOrder })
            }
        }
        catch(error) {
            console.log(error.response.data)
            setIsLoading(false)
        }
    }

    const isValid = React.useCallback(() => {
        return (
            deliveryAddress.contact.name === '' ||
            deliveryAddress.contact.phone === '' ||
            deliveryAddress.address.province === null ||
            deliveryAddress.address.district === null ||
            deliveryAddress.address.ward === null
        )
    }, [deliveryAddress])

    return (
        <View style={ styles.container }>
            <CartHeader 
                label={'Confirm bill'} 
                goBack={() => {
                        navigation.goBack()
                        // dispatch(deleteVoucher())
                    }
                }
            />

            <ScrollView
                showsVerticalScrollIndicator={ false }
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View style={ styles.customerInfo }>
                    <View style={ styles.headerAddress }>
                        <Text style={ styles.titleSection }>Delivery Address</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('NewAddress')}
                        >
                            <Text style={ styles.changeText }>Change</Text>
                        </TouchableOpacity>
                    </View>
                    <Text>Home</Text>
                    <TouchableOpacity 
                        style={ styles.infoContainer }
                        onPress={() => navigation.navigate('NewAddress')}
                    >
                        <View style={ styles.viewLeft }>
                            <ItemInfo 
                                icon={'account'} 
                                text={ deliveryAddress.contact.name !== '' ? deliveryAddress.contact.name : '' } 
                                placeholder={'Name'}
                            />
                            <ItemInfo 
                                icon={'map-marker'} 
                                text={
                                    (deliveryAddress.contact.street !== '' && deliveryAddress.address.ward && deliveryAddress.address.district && deliveryAddress.address.province)
                                    ?
                                        (
                                            deliveryAddress.contact.street + ', '
                                            + deliveryAddress.address.ward?.name + ', '
                                            + deliveryAddress.address.district?.name + ', '
                                            + deliveryAddress.address.province?.name
                                        )
                                    :
                                        ''
                                    } 
                                placeholder={'Address'}
                            />
                            <ItemInfo 
                                icon={'phone'} 
                                text={ deliveryAddress.contact.phone !== '' ? '+' + deliveryAddress.contact.phone : ''}
                                placeholder={'Phone'}
                            />
                        </View>
                        <EvilIcons name='chevron-right' size={30} color={'#969696'} />
                    </TouchableOpacity>
                </View>
                
                <View style={ styles.orderBill }>
                    <View style={ styles.headerOrderBill }>
                        <Text style={ styles.titleSection }>Order Bill</Text>
                    </View>
                    <View>
                        <ExpandableProduct 
                            data={ dataSource } 
                            onClick={ updateLayout }
                        />
                        <ItemBill title={'Price'} text={ convertVND(bill.price) } />
                        <ItemBill title={'Shopping Fee'} text={ convertVND(bill.transportFee) } />
                        <ItemBill 
                            title={'Voucher'} 
                            text={voucher?.title} 
                            iconChevron 
                            onCLick={() => navigation.navigate('Voucher')} 
                        />
                    </View>
                    <View style={ styles.useCoinsContainer }>
                        <Text style={ styles.useCoinsText }>Use Coins</Text>
                        {
                            isEnabled &&
                            <Text style={{ color: '#000', marginRight: 12 }}>-{ convertVND(bill.coin) }</Text>
                        }
                        <Switch
                            style={{ justifyContent: 'center' }}
                            trackColor={{ false: "#f2f2f2", true: "#30d126" }}
                            thumbColor={'white'}
                            ios_backgroundColor="white"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                    <ItemBill title={'Total Discount'} text={ convertVND(bill.discount) } />
                    <View style={ styles.totalBillContainer }>
                        <Text style={[ styles.totalBillText, { flex: 1 } ]}>Total Bill</Text>
                        <Text style={[ styles.totalBillText, { marginRight: 14 } ]}>{ convertVND(bill.total) }</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={ styles.btnContainer }>
                <TouchableOpacity
                    disabled={ isValid() }
                    style={[ styles.completeBtn, { opacity: isValid() ? 0.5 : 1 } ]}
                    onPress={ handleOrder }
                >
                    <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 16 }}>Complete</Text>
                </TouchableOpacity>
            </View>
            
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

const sectionContainer = {
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2'
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    customerInfo: {
        ...sectionContainer
    },
    headerAddress: {
        flexDirection: 'row',
        paddingVertical: 16
    },
    titleSection: {
        flex: 1,
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold'
    },
    changeText: {
        color: '#000',
        fontSize: 15
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewLeft: {
        flex: 1,
        paddingVertical: 12
    },
    itemInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4
    },
    orderBill: {
        ...sectionContainer
    },
    headerOrderBill: {
        flexDirection: 'row',
        paddingVertical: 16
    },
    ItemBillContainer: {
        flexDirection: 'row',
        paddingVertical: 8
    },
    useCoinsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8
    },
    useCoinsText: {
        flex: 1,
        color: '#969696'
    },
    totalBillContainer: {
        flexDirection: 'row',
        paddingVertical: 18
    },
    totalBillText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    },
    btnContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        paddingBottom: 8
    },
    completeBtn: {
        width: '80%',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        padding: 18,
        borderRadius: 15,
        zIndex: 100
    },
    productContainer: {
        width: WINDOW_WIDTH,
        flexDirection: 'row',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    imageProduct: {
        width: 75,
        height: 75
    },
    detailContainer: {
        flex: 1,
        justifyContent: 'space-around',
        marginLeft: 12
    },
    nameProduct: {
        color: '#3d3d3d',
        fontWeight: 'bold',
        marginRight: 28,
    },
    quantityProduct: {
        position: 'absolute',
        bottom: 0,
        right: 28
    }
})

export default CheckOutScreen