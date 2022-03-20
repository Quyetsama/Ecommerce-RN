import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    VirtualizedList,
    Modal,
} from 'react-native'
import voucher from '../assets/img/voucher.png'
import LinearGradient from 'react-native-linear-gradient'
import CartHeader from '../components/cartscreen/CartHeader'
import { useDispatch, useSelector } from 'react-redux'
import { addVoucher } from '../redux/actions/cartAction'
import { getListVoucher } from '../api/voucherApi'
import AlertModal from '../components/modal/AlertModal'




const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


const ItemVoucher = React.memo(({ item, onCLick }) => {

    const handleTime = () => {
        const timeExpired = new Date(item.expired)
        return (
            (timeExpired.getDate() < 10 ? ('0' + timeExpired.getDate()) : timeExpired.getDate()) 
            + '.' + 
            (timeExpired.getMonth() + 1 < 10 ?  '0' + (timeExpired.getMonth() + 1) : (timeExpired.getMonth() + 1))
            + '.' + 
            timeExpired.getFullYear()
        )
    }
    return (
        <ImageBackground
                style={ styles.voucher }
                source={ voucher }
                resizeMode='stretch'
            >
                <View style={ styles.voucherContainer }>
                    <View style={ styles.leftContainer }>
                        <View style={ styles.percentContainer }>
                            {
                                item.classify.type === 1 || item.classify.type === 3
                                ?
                                <>
                                    <Text style={ styles.number }>{ item.classify.value }</Text>
                                    <Text style={ styles.percent }>K</Text>
                                </>
                                : 
                                <>
                                    <Text style={ styles.number }>{ item.classify.value }</Text>
                                    <Text style={ styles.percent }>%</Text>
                                </>
                            }                 
                        </View>
                        <View style={ styles.detail }>
                            <Text style={ styles.title } numberOfLines={2}>{ item.title }</Text>
                            <Text>{ handleTime() }</Text>
                        </View>
                    </View>
                    
                    <TouchableOpacity 
                        onPress={() => onCLick(item) }
                    >
                        <LinearGradient
                            style={ styles.button }
                            colors={['#fd8158', '#f83853']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Text style={ styles.textButton }>Dùng ngay</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
        </ImageBackground>
    )
})

const VoucherScreen = ({ navigation }) => {

    const lengthProducts = useSelector(state => state.cartReducer.products.length)
    const dispatch = useDispatch()

    const [refreshing, setRefreshing] = useState(false)
    const [listVoucher, setListVoucher] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
        fetchVoucher()
    }, [])

    const fetchVoucher = React.useCallback(async () => {
        try {
            setRefreshing(true)
            const listVoucher = await getListVoucher()
            setListVoucher([...listVoucher.data.vouchers])
            setRefreshing(false)
        }
        catch(error) {
            console.log(error.response.data)
            setRefreshing(false)
        }
    }, [])

    const handleClick = React.useCallback((voucher) => {
        if(lengthProducts > 0) {
            dispatch(addVoucher(voucher))
            navigation.navigate('Checkout')
        }
        else {
            setIsModalVisible(true)
        }
    }, [])

    return (
        <View style={ styles.container }>
            <CartHeader 
                label={'Vouchers'} 
                goBack={() => {
                        navigation.goBack()
                    }
                }
            />
            <FlatList 
                data={ listVoucher }
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <ItemVoucher 
                        item={ item }
                        onCLick={ handleClick } 
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={fetchVoucher}
                    />
                }
            />

            <Modal
                statusBarTranslucent
                transparent={ true }
                animationType='fade'
                visible={ isModalVisible }
                onRequestClose={() => setIsModalVisible(false)}
            >
                <AlertModal 
                    title={'Failed'} 
                    content={'Vui lòng thêm hàng vỏ giỏ\nđể sử dụng'}
                    changeModalVisible={(bool) => setIsModalVisible(bool)}
                />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    voucher: {
        width: '100%',
        height: WIDTH / 3,
        justifyContent: 'center'
    },
    voucherContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
        // paddingLeft: 50
    },
    leftContainer: { 
        flexDirection: 'row',
        width: WIDTH / 1.65,
        height: '100%',
        alignItems: 'center',
        paddingLeft: 44
    },
    percentContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    percent: {
        color: 'tomato',
        fontSize: 24,
        fontWeight: 'bold'
    },
    number: {
        color: 'tomato',
        fontSize: 42,
        fontWeight: 'bold'
    },
    detail: {
        flex: 1,
        // justifyContent: 'space-evenly',
        marginHorizontal: 12
    },
    title: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6
    },
    button: {
        // backgroundColor: 'tomato',
        padding: 12,
        marginRight: 44,
        borderRadius: 20
    },
    textButton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default VoucherScreen