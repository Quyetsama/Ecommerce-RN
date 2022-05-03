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
    TextInput
} from 'react-native'
import voucher from '../assets/img/voucher.png'
import LinearGradient from 'react-native-linear-gradient'
import CartHeader from '../components/cartscreen/CartHeader'
import { useDispatch, useSelector } from 'react-redux'
import { addVoucher, deleteVoucher } from '../redux/actions/cartAction'
import { getListVoucher, getVoucherByCode } from '../api/voucherApi'
import SuccessModal from '../components/modal/SuccessModal'
import LoadingModal from '../components/modal/LoadingModal'
import AlertModal from '../components/modal/AlertModal'
import { handleTime } from '../helpers/validation'
import { SCREEN, COLOR } from '../helpers/configs'
import discountImage from '../assets/img/discount.png'
import { convertToDate } from '../helpers/validation'




const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


const InputCoupon = React.memo(({ value, onchangeValue, onClick }) => {

    const isValid = React.useCallback(() => {
        return value.trim() !== ''
    }, [value])

    return (
        <View style={ styles.inputCouponContainer }>
            <TextInput
                value={ value }
                onChangeText={ onchangeValue }
                style={ styles.inputCoupon }
                placeholder='Enter discount code here'
                placeholderTextColor={ '#afb6be' }
            />
            <TouchableOpacity
                disabled={ !isValid() }
                onPress={ onClick }
                style={ [styles.applyBtn, { backgroundColor: !isValid() ? '#d2d8e4' : COLOR.violet } ]}
            >
                <Text style={ styles.applyTxt }>Apply</Text>
            </TouchableOpacity>
        </View>
    )
})

const ItemVoucher = React.memo(({ item, onCLick }) => {

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
                            <Text>{ handleTime(item.expired) }</Text>
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

const ItemCoupon = React.memo(({ item, isSelected, onCLick }) => {
    return (
        <View style={ styles.couponContainer }>
            <View style={ styles.couponLeft }>
                <View style={ styles.borderLeft } />
                <View style={ styles.bodyCoupon }>
                    <Image
                        style={ styles.imageCoupon }
                        source={ discountImage }
                    />
                    <View style={ styles.txtCouponContainer }>
                        <Text numberOfLines={ 2 } style={ styles.titleCoupon }>{ item.title }</Text>
                        <Text numberOfLines={ 1 } style={ styles.expiryCoupon }>EXP: { convertToDate(item.expired) }</Text>
                    </View>
                </View>
                <View style={ styles.borderSolid } />
            </View>
            <View style={ styles.couponRight }>
                <TouchableOpacity onPress={() => onCLick(item, isSelected ? 2 : 1)}>
                    <Text style={ styles.txtButtonCoupon }>{ isSelected ? 'Deselect' : 'Select' }</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
})

const VoucherScreen = ({ navigation }) => {

    const { userToken } = useSelector(state => state.authReducer)
    const { voucher } = useSelector(state => state.cartReducer)
    const dispatch = useDispatch()

    const [code, setCode] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [listVoucher, setListVoucher] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
        fetchVoucher()
    }, [userToken])

    const fetchVoucher = React.useCallback(async () => {
        try {
            setRefreshing(true)
            const listVoucher = await getListVoucher(userToken)
            setListVoucher([...listVoucher.data.vouchers])
            setRefreshing(false)
        }
        catch(error) {
            console.log(error.response.data)
            setRefreshing(false)
        }
    }, [userToken])

    const fetchVoucherByCode = React.useCallback(async () => {
        try {
            setIsLoading(true)
            const res = await getVoucherByCode(userToken, code)
            if(res.data.success && res.data.data) {
                setIsModalVisible(true)
                setTimeout(() => {
                    dispatch(addVoucher(res.data.data))
                    navigation.goBack()
                }, 1000)
            }
            else {
                setIsError(true)
            }
            setIsLoading(false)
        }
        catch(error) {
            console.log(error.response.data)
            setIsLoading(false)
            setIsError(true)
        }
    }, [userToken, code])

    const handleClick = React.useCallback((voucher, type) => {
        if(type === 1) {
            setIsModalVisible(true)
            setTimeout(() => {
                dispatch(addVoucher(voucher))
                navigation.goBack()
            }, 1000)
        }
        else if(type === 2) {
            dispatch(deleteVoucher())
        }
    }, [])

    const handleChangeCode = (value) => {
        setCode(value)
    }

    const handleClickApply = React.useCallback(() => {
        fetchVoucherByCode()
    }, [userToken, code])

    return (
        <View style={ styles.container }>
            <CartHeader 
                label={'Vouchers'} 
                goBack={() => {
                        navigation.goBack()
                    }
                }
                hideElevation
            />
            <InputCoupon
                value={ code } 
                onchangeValue={ handleChangeCode }
                onClick={ handleClickApply }
            />

            <FlatList
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
                data={ listVoucher }
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <ItemCoupon 
                        item={ item }
                        isSelected={ item._id === voucher?._id ? true : false }
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
                visible={ isLoading }
                onRequestClose={() => setIsLoading(false)}
            >
                <LoadingModal />
            </Modal>
            <Modal
                statusBarTranslucent
                transparent={ true }
                animationType='fade'
                visible={ isModalVisible }
                onRequestClose={() => setIsLoading(false)}
            >
                <SuccessModal
                    text={'Successfully applied'}
                />
            </Modal>
            <Modal
                statusBarTranslucent
                transparent={ true }
                animationType='fade'
                visible={ isError }
                onRequestClose={() => setIsError(false)}
            >
                <AlertModal
                    title={'Error'}
                    content={'Invalid code'}
                    changeModalVisible={bool => setIsError(bool)}
                />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f7fc'
    },
    inputCouponContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingHorizontal: 18,
        paddingBottom: 18
    },
    inputCoupon: {
        flex: 1,
        backgroundColor: '#f4f7fc',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        paddingHorizontal: 18
    },
    applyBtn: {
        justifyContent: 'center',
        // backgroundColor: '#d2d8e4',
        paddingHorizontal: 22,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    },
    applyTxt: {
        color: 'white',
        fontWeight: 'bold'
    },
    couponContainer: {
        width: '100%',
        height: SCREEN.HEIGHT / 8 + 24,
        flexDirection: 'row',
        paddingHorizontal: 18,
        marginTop: 12,
    },
    couponLeft: {
        flex: 4,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        overflow: 'hidden',
        elevation: 3
    },
    bodyCoupon: {
        flex: 1,
        flexDirection: 'row'
    },
    imageCoupon: {
        width: SCREEN.HEIGHT / 10,
        height: SCREEN.HEIGHT / 10,
        marginHorizontal: 12,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#969696'
    },
    txtCouponContainer: {
        justifyContent: 'space-between',
        flex: 1,
        marginRight: 12
    },
    titleCoupon: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#25383C'
    },
    expiryCoupon: {
        fontSize: 13,
        marginTop: 12,
        fontWeight: '500',
        color: '#969696'
    },
    borderLeft: {
        width: 8,
        height: '100%',
        backgroundColor: COLOR.violet
    },
    borderSolid: {
        height: '100%',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#969696'
    },
    couponRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        elevation: 3
    },
    txtButtonCoupon: {
        color: COLOR.violet,
        fontWeight: '500',
        textAlign: 'center'
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