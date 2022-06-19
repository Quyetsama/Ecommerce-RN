import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, TextInput, Modal } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import Animated from 'react-native-reanimated'
import { PanGestureHandler, ScrollView as ScrollView2 } from 'react-native-gesture-handler'
import { violet, doMain, SCREEN, SIZE } from '../../utils/configs'
import SuccessModal from '../modal/SuccessModal'

import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/actions/cartAction'
import { COLORS } from '../../utils'



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
                    alignItems: 'center'
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
                            marginRight: 10,
                            marginVertical: 5
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
                        style={{
                            fontSize: SIZE(18),
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

const SheetComponent = ({ product, onGestureEvent, style, onClose }) => {

    // const { products } = useSelector(state => state.cartReducer)
    // console.log(product?.discount)
    const dispatch = useDispatch()
    const [selected, setSelected] = useState([])
    const [quantity, setQuantity] = useState(1)
    // SuccessModal
    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
        if(isModalVisible) {
            setTimeout(() => {
                setSelected([])
                setQuantity(1)
                setIsModalVisible(false)
                onClose()
            }, 1500)
        }
    }, [isModalVisible])


    const handleOnSelect = React.useCallback((index, prev, item) => {
        // console.log(prev)
        // console.log(index)
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
            return +value < 1 ? 0 : +value
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
            if(item.type.includes(...selected)) {
                return item.price
            }
        })
        return null
    }, [selected])

    const handleAddToCart = React.useCallback(() => {
        // onClose()
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
    })

    const isValid = () => {
        return (
            selected.length === (product?.classify?.generalClassification?.length || 0)
            &&
            quantity > 0
        )  
    }

    return (
        <PanGestureHandler
            onGestureEvent={ onGestureEvent }
        >
            <Animated.View
                style={[ 
                    styles.sheet,
                    style
                ]}
            >
                
                <View style={ styles.headerSheet }>
                    <View style={{ width: SCREEN.HEIGHT / 6, height: SCREEN.HEIGHT / 6 }}>
                        <Image 
                            source={{ uri: product?.image && (doMain + '/image/' + product?.image[0]) }}
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
                    <TouchableOpacity 
                        activeOpacity={0.5} 
                        onPress={ onClose }
                    >
                        <Ionicons name={ 'md-close-outline' } size={30} color="#969696" />
                    </TouchableOpacity>
                </View>
                    
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ flex: 1 }}>
                        <ScrollView2
                            contentContainerStyle={{ paddingBottom: 100 }}
                            showsVerticalScrollIndicator={ false }
                            keyboardShouldPersistTaps='handled'
                        >
                            {product?.classify?.generalClassification.map((item, index) => (
                                <ItemSheet 
                                    key={ item.id } 
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
                        </ScrollView2>
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

                <Modal
                    transparent={ true }
                    animationType='fade'
                    visible={ isModalVisible }
                    onRequestClose={() => setIsModalVisible(false) }
                >
                    <SuccessModal 
                        text={'Add to cart successfully'}
                    />
                </Modal>
            </Animated.View>
            {/* </Animated.View> */}
        </PanGestureHandler>
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
    btnContainer: { 
        // flexDirection: 'row', 
        // justifyContent: 'flex-end',
        // paddingVertical: 5, 
        // borderTopWidth: 1, 
        // borderTopColor: '#f2f2f2' 
    },
    buttonAddToCart: {
        // ...button,
        // marginLeft: 5,
        // marginRight: 2.5,
        // borderRadius: 3,
        // borderWidth: 1,
        // borderColor: violet
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        backgroundColor: COLORS.secondary,
        paddingVertical: 18,
        borderRadius: 30,
        marginBottom: 18
    },
    buttonBuyNow: {
        ...button,
        marginRight: 5,
        marginLeft: 2.5,
        backgroundColor: violet
    },
    nameProduct: {
        fontSize: SIZE(16),
        // fontWeight: 'bold',
        // color: COLORS.primary
    },
    priceProduct: {
        fontSize: SIZE(22),
        fontWeight: '800',
        color: '#000',
        paddingVertical: 18
    },
    discountProduct: {
        fontSize: SIZE(16),
        fontWeight: '500',
        color: 'green'
    },
    label: {
        color: '#969696',
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default React.memo(SheetComponent)