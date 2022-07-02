import React, { useCallback, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    Image,ScrollView,
    TextInput,
    Modal
} from 'react-native'
import { COLORS, WINDOW_WIDTH, WINDOW_HEIGHT, URL_API } from '../../utils'
import { useSelector, useDispatch } from 'react-redux'
import { actionSetLoadingBottomSheet, clearBottomSheet } from '../../redux/actions/bottomSheetAction'
import { addToCart } from '../../redux/actions/cartAction'
import { BottomSheetScrollView, useBottomSheet } from '@gorhom/bottom-sheet'
import { getClassifyProduct } from '../../api/productApi'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import LoadingModal from '../modal/LoadingModal'
import SuccessModal from '../modal/SuccessModal'



const ItemSheet = React.memo(({ classify, selected, onSelect }) => {

    const [isSelect, setIsSelect] = useState('')

    useEffect(() => {
        if(selected.length < 1) {
            setIsSelect('')
        }
    }, [selected])

    const handleSelect = (item) => {
        onSelect(isSelect, item)
        setIsSelect(prev => {
            return prev !== item ? item : ''
        })
    }

    // console.log(isSelect)
    return (
        <View style={{ alignItems: 'center', marginTop: 16, paddingHorizontal: 10 }}>
            <Text
                style={ styles.label }
            >
                { classify.label.toUpperCase() }
            </Text>
            <View
                style={{
                    flex: 1,
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: '#f2f2f2',
                    paddingVertical: 10,
                    justifyContent: 'center'
                }}
            >
                {classify.data.map((item, index) => (
                    <TouchableOpacity
                        key={ index }
                        onPress={() => handleSelect(item)}
                        activeOpacity={ 0.8 }
                        style={{
                            paddingVertical: 12,
                            paddingHorizontal: 18,
                            backgroundColor: item === isSelect ? COLORS.secondary : COLORS.primary,
                            borderRadius: 30,
                            margin: 10
                        }}
                    >
                        <Text style={{ color: item === isSelect ? COLORS.primary : 'white', fontWeight: 'bold' }}>{ item }</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
})

const Quantity = React.memo(({ value, onChangeQuantity, onIncrease, onDecrease }) => {
    
    // console.log(value)
    return (
        <View style={{
            alignItems: 'center',
            marginTop: 15, 
            paddingHorizontal: 10
        }}>
            <Text style={ styles.label }>QUANTITY</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 18
            }}>
                <View style={{
                    padding: 3,
                    borderWidth: 1,
                    borderColor: '#969696',
                    borderRadius: 100
                }}>
                    <TouchableOpacity onPress={ onDecrease }>
                        <Entypo name={ 'minus' } size={20} color={ COLORS.primary } />
                    </TouchableOpacity>
                </View>
                <View style={{
                    paddingHorizontal: 30
                }}>
                    <TextInput
                        editable={false}
                        style={{
                            color: COLORS.primary,
                            fontSize: 18,
                            fontWeight: 'bold'
                        }}
                        value={ value + '' }
                        onChangeText={value => onChangeQuantity(value)}
                        padding={ 0 }
                        keyboardType='numeric'
                        textAlign='center'
                    />
                </View>
                <View style={{
                    padding: 3,
                    borderWidth: 1,
                    borderColor: '#969696',
                    borderRadius: 100

                }}>
                    <TouchableOpacity onPress={ onIncrease }>
                        <Entypo name={ 'plus' } size={20} color={ COLORS.primary } />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
})

const SheetContent = ({}) => {

    const { _id, isLoading } = useSelector(state => state.bottomSheetReducer)
    const dispatch = useDispatch()

    const { close } = useBottomSheet()
    const [product, setProduct] = useState(null)
    const [selected, setSelected] = useState([])
    const [quantity, setQuantity] = useState(1)
    // SuccessModal
    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
        if(_id) {
            fetchData(_id)
        }
    }, [_id])

    const fetchData = useCallback(async (_id) => {
        try {
            const res = await getClassifyProduct(_id)

            if(res?.data.success) {
                setProduct({
                    ...res.data.data
                })
                dispatch(actionSetLoadingBottomSheet())
            }
        }
        catch(error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        if(isModalVisible) {
            setTimeout(() => {
                setSelected([])
                setQuantity(1)
                setIsModalVisible(false)
                close()
            }, 1500)
        }
    }, [isModalVisible])


    const handleOnSelect = React.useCallback((index, prev, item) => {
        const newSelected = selected.filter(item => item !==prev)
        if(prev !== item) {
            // newSelected.push(item)
            newSelected.splice(index, 0, item)
        }
        setSelected([...newSelected])
        // !selected.includes(item) && setSelected([...selected, item])
    }, [selected])

    const handleChangeQuantity = React.useCallback((value) => {
        !isNaN(value) && (+value > -1 && +value < 1000) && setQuantity(prev => {
            return +value < 1 ? 1 : +value
        })
    }, [])

    const handleIncrease = React.useCallback(() => {
        handleChangeQuantity(quantity + 1)
    }, [quantity])

    const handleDecrease = React.useCallback(() => {
        handleChangeQuantity(quantity - 1)
    }, [quantity])

    const getPriceClassify = React.useCallback(() => {
        product?.classify?.detailClassification?.map(item => {
            if(item.type.includes([...selected])) {
                return item.price
            }
        })
        return null
    }, [product, selected])

    const handleAddToCart = React.useCallback(() => {
        const price = getPriceClassify()

        dispatch(addToCart(
            {
                _id: product?._id,
                timestamp: Date.now(),
                name: product?.name,
                price: (price ? price : product?.price * (100 - product?.discount) / 100),
                discount: product?.discount ? product?.discount : null,
                transportFee: product?.transportFee,
                quantity: quantity,
                image: product?.image[0],
                selected: selected.length !== 0 ? selected : null
            }
        ))

        setIsModalVisible(true)
    }, [product, quantity, selected])

    const isValid = () => {
        return (
            selected.length === (product?.classify?.length || 0)
            &&
            quantity > 0
        )  
    }

    return (
        <View style={{ flex: 1 }}>
            {
                !isLoading && _id &&
                <>
                    <View style={ styles.headerSheet }>
                        <View style={{ width: WINDOW_HEIGHT / 6, height: WINDOW_HEIGHT / 6 }}>
                            <Image 
                                source={{ uri: product?.image && (URL_API + '/image/' + product?.image[0]) }}
                                style={ styles.imageSheet }
                                resizeMode='contain'
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={ styles.nameProduct }>{ product?.name }</Text>
                            <Text style={ styles.priceProduct }>{ (+product?.price).toLocaleString('vi', {style : 'currency', currency : 'VND'}) }</Text>
                            {
                                product?.discount &&
                                <Text style={ styles.discountProduct }>{ product?.discount }% off</Text>
                            }
                            
                        </View>
                    </View>
                        
                    <View style={{ flex: 1, justifyContent: 'space-between' }}>
                        <View style={{ flex: 1 }}>
                            <BottomSheetScrollView
                                contentContainerStyle={{ flexGrow: 1 }}
                                showsVerticalScrollIndicator={ false }
                                keyboardShouldPersistTaps='handled'
                            >
                                {product?.classify?.map((item, index) => (
                                    <ItemSheet 
                                        key={ index } 
                                        classify={ item } 
                                        selected={ selected } 
                                        onSelect={(prev, item) => handleOnSelect(index, prev, item) } 
                                    />
                                ))}

                                <Quantity 
                                    value={ quantity } 
                                    onChangeQuantity={ handleChangeQuantity } 
                                    onIncrease={ handleIncrease } 
                                    onDecrease={ handleDecrease } 
                                />
                            </BottomSheetScrollView>
                        </View>

                        <TouchableOpacity 
                            disabled={ !isValid() }
                            style={[ styles.buttonAddToCart, { opacity: isValid() ? 1 : 0.5 } ]}
                            onPress={ handleAddToCart }
                        >
                            <Text
                                style={{
                                    color: COLORS.primary,
                                    fontSize: 18,
                                    fontWeight: '800'
                                }}
                            >ADD TO CART</Text>
                        </TouchableOpacity>
                        
                    </View>
                </>
            }

            <Modal
                transparent={ true }
                animationType='fade'
                visible={ isLoading }
            >
                <LoadingModal />
            </Modal>

            <Modal
                transparent={ true }
                animationType='fade'
                visible={ isModalVisible }
            >
                <SuccessModal 
                    text={'Add to cart successfully'}
                />
            </Modal>
        </View>
    )
}

const button = {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 15,
}

const styles = StyleSheet.create({
    sheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        elevation: 5,
        paddingTop: 10,
        zIndex: 11
        // padding: 10
    },
    headerSheet: {
        // flex: 1,
        flexDirection: 'row',
        paddingBottom: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    imageSheet: {
        flex: 1,
        width: null,
        height: null,
    },
    buttonAddToCart: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        backgroundColor: COLORS.secondary,
        paddingVertical: 18,
        borderRadius: 30,
        marginVertical: 18
    },
    nameProduct: {
        flex: 1,
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: '500'
    },
    priceProduct: {
        fontSize: 22,
        fontWeight: '800',
        color: '#000'
    },
    discountProduct: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.tomato
    },
    label: {
        color: '#969696',
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default React.memo(SheetContent)