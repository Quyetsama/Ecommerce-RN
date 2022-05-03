import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, TextInput, Modal } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import Animated from 'react-native-reanimated'
import { PanGestureHandler, ScrollView as ScrollView2 } from 'react-native-gesture-handler'
import { violet, doMain } from '../../helpers/configs'
import SuccessModal from '../modal/SuccessModal'

import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/actions/cartAction'


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const color = ['Black', 'White', 'yellow', 'Pink', 'Brown', 'pink']

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
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <Text
                style={{ color: '#000', fontSize: 15 }}
            >
                { classify.label }
            </Text>
            <View
                style={{
                    flex: 1,
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: '#f2f2f2',
                    paddingVertical: 10
                }}
            >
                {classify.data.map((item, index) => (
                    <TouchableOpacity
                        key={ index }
                        onPress={() => handleSelect(item)}
                        activeOpacity={ 0.8 }
                        style={{
                            paddingVertical: 5,
                            paddingHorizontal: 20,
                            backgroundColor: item === isSelect ? '#fff' : '#f2f2f2',
                            borderRadius: 3,
                            marginRight: 10,
                            marginVertical: 5,
                            borderWidth: 1,
                            borderColor: item === isSelect ? violet : '#f2f2f2'
                        }}
                    >
                        <Text style={{ color: '#000' }}>{ item }</Text>
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
            flexDirection: 'row',
            marginTop: 15, 
            paddingHorizontal: 10
        }}>
            <Text style={{ flex: 1, color: '#000', fontSize: 15 }}>Số lượng</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#f3f3f3'
            }}>
                <View style={{
                    // padding: 3,
                    // borderRightWidth: 1,
                    // borderColor: '#f3f3f3'
                }}>
                    <TouchableOpacity onPress={ onDecrease }>
                        <Entypo name={ 'minus' } size={20} color="#969696" />
                    </TouchableOpacity>
                </View>
                <View style={{
                    // paddingVertical: 3,
                    paddingHorizontal: 20,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderColor: '#f3f3f3'
                }}>
                    <TextInput
                        value={ value + '' }
                        onChangeText={value => onChangeQuantity(value)}
                        padding={ 0 }
                        keyboardType='numeric'
                        textAlign='center'
                    />
                </View>
                <View style={{
                    // padding: 3,
                    // borderLeftWidth: 1,
                    // borderColor: '#f3f3f3'
                }}>
                    <TouchableOpacity onPress={ onIncrease }>
                        <Entypo name={ 'plus' } size={20} color="#969696" />
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
                    <View style={{ width: HEIGHT / 5, height: HEIGHT / 5 }}>
                        <Image 
                            source={{ uri: product?.image && (doMain + '/image/' + product?.image[0]) }}
                            style={ styles.imageSheet }
                            resizeMode='contain'
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', marginLeft: 10 }}>
                        <Text style={{ color: 'red' }}>{ (+product?.price).toLocaleString('vi', {style : 'currency', currency : 'VND'}) }</Text>
                        <Text>Kho: { product?.quantity }</Text>
                    </View>
                    <TouchableOpacity 
                        activeOpacity={0.5} 
                        onPress={ onClose }
                    >
                        <Ionicons name={ 'md-close-outline' } size={30} color="#969696" />
                    </TouchableOpacity>
                </View>
                    
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View>
                        <ScrollView2
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

                    <View style={ styles.btnContainer }>
                        <TouchableOpacity 
                            disabled={ !isValid() }
                            style={[ styles.buttonAddToCart, { opacity: isValid() ? 1 : 0.5 } ]}
                            onPress={ handleAddToCart }
                        >
                            <Text
                                style={{
                                    color: violet,
                                    fontSize: 15
                                }}
                            >Thêm vào giỏ hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setIsModalVisible(true)}
                            disabled={ !isValid() }
                            style={[ styles.buttonBuyNow, { opacity: isValid() ? 1 : 0.5 } ]}
                        >
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 15
                                }}
                            >Mua ngay</Text>
                        </TouchableOpacity>
                    </View>
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
        flexDirection: 'row', 
        justifyContent: 'flex-end',
        paddingVertical: 5, 
        borderTopWidth: 1, 
        borderTopColor: '#f2f2f2' 
    },
    buttonAddToCart: {
        ...button,
        marginLeft: 5,
        marginRight: 2.5,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: violet
    },
    buttonBuyNow: {
        ...button,
        marginRight: 5,
        marginLeft: 2.5,
        backgroundColor: violet
    }
})

export default React.memo(SheetComponent)