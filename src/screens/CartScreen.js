import React, { useState, useLayoutEffect, useCallback, memo, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    useWindowDimensions,
    Dimensions,
    Animated,
    TouchableWithoutFeedback,
    Modal
} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { violet } from '../helpers/configs'
import HeaderStore from '../components/storescreen/HeaderStore'
import CartHeader from '../components/cartscreen/CartHeader'
import SimpleModal from '../components/SimpleModal'
import { isEmpty } from 'lodash'
import { doMain } from '../helpers/configs'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromCart, inCrease, deCrease } from '../redux/actions/cartAction'
import LinearGradient from 'react-native-linear-gradient'


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

let rowAnimatedValues = {}
// Array(5).fill('').forEach((_, i) => {
//     rowAnimatedValues[`${i + '123'}`] = {
//         rowHeigt: new Animated.Value(128),
//         deleteBtnWidth: new Animated.Value(100),
//         actionBottom: new Animated.Value(16),
//         rowOpacity: new Animated.Value(1)
//     }
// })


const VisibleItem = memo((props) => {
    const { data, onIncrease, onDecrease } = props

    const rowKey = data.item._id

    return (
        <Animated.View style={[ 
                styles.rowFront,
                {
                    height: rowAnimatedValues[rowKey].rowHeigt,
                    opacity: rowAnimatedValues[rowKey].rowOpacity
                }
            ]}
        >
            <Image 
                style={[ styles.imageContainer ]}
                source={{ uri: doMain + 'image/' + data.item.image }}
            />
            <View style={ styles.name_price_Container }>
                <Text numberOfLines={ 1 } style={ styles.nameText }>{ data.item.name }</Text>
                <Text numberOfLines={ 1 } style={ styles.classify }>
                    { 
                        data.item.selected?.length === 1 
                        ? data.item.selected[0]
                        : (data.item.selected?.length === 2
                        ? data.item.selected[0] + ' - ' + data.item.selected[1]
                        : '')
                    }
                </Text>
                <Text style={ styles.priceText }>{ (data.item.price).toLocaleString('vi', {style : 'currency', currency : 'VND'}) }</Text>
            </View>
            <View style={ styles.quantityContainer }>
                <TouchableOpacity style={ styles.plusBtn } onPress={ onIncrease } activeOpacity={ 0.8 }>
                    <Entypo name="plus" size={18} color={'white'} />
                </TouchableOpacity>
                <Text style={ styles.quantityText }>{ data.item.quantity }</Text>
                <TouchableOpacity style={ styles.minusBtn } onPress={ onDecrease } activeOpacity={ 0.8 }>
                    <Entypo name="minus" size={18} color={ violet } />
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
})

const HiddenItemWithActions = memo((props) => {
    const { rightActionActivated, swipeAnimatedValue, data, onDelete } = props

    const rowKey = data.item._id

    if(rightActionActivated) {
        // Animated.timing(rowAnimatedValues[rowKey].rightBtnWidth, {
        //     toValue: 150,
        //     duration: 200,
        //     useNativeDriver: false,
        // }).start()
        Animated.timing(rowAnimatedValues[rowKey].rightBtnWidth, {
            toValue: Math.abs(swipeAnimatedValue.__getValue()) - 100,
            duration: 200,
            useNativeDriver: false,
        }).start()
        Animated.timing(rowAnimatedValues[rowKey].deleteBtnWidth, {
            toValue: Math.abs(swipeAnimatedValue.__getValue()),
            duration: 250,
            useNativeDriver: false
        }).start()
    }
    else {
        Animated.timing(rowAnimatedValues[rowKey].rightBtnWidth, {
            toValue: 100,
            duration: 200,
            useNativeDriver: false,
        }).start()
        Animated.timing(rowAnimatedValues[rowKey].deleteBtnWidth, {
            toValue: 100,
            duration: 250,
            useNativeDriver: false
        }).start()
    }

    const handleDelete = () => {
        onDelete(rowKey)
    }

    return (
        <View style={ styles.rowBack }>
            <TouchableWithoutFeedback onPress={() => console.log('Touched')}>
                <Animated.View style={[
                        styles.backBtn,
                        styles.backRightBtn,
                        styles.backRightBtnLeft,
                        {
                            width: rowAnimatedValues[rowKey].rightBtnWidth,
                            borderTopLeftRadius: 15,
                            borderBottomLeftRadius: 15,
                            height: rowAnimatedValues[rowKey].rowHeigt,
                            opacity: rowAnimatedValues[rowKey].rowOpacity,
                            transform: [
                                {
                                    translateX: swipeAnimatedValue.interpolate({
                                        inputRange: [-200, -120, 0],
                                        outputRange: [-100, -20, 100],
                                        extrapolate: 'clamp'
                                    })
                                }
                            ]
                        }
                    ]}
                >
                    <View style={ styles.backBtnInner }>
                        <MaterialCommunityIcons name="keyboard-backspace" size={26} color={'#fff'} />
                        <Text style={ styles.backBtnText }>Right</Text>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={ handleDelete }>
                <Animated.View style={[
                        styles.backBtn,
                        styles.backRightBtn,
                        styles.backRightBtnRight,
                        {
                            width: rowAnimatedValues[rowKey].deleteBtnWidth,
                            height: rowAnimatedValues[rowKey].rowHeigt,
                            opacity: rowAnimatedValues[rowKey].rowOpacity,
                            transform: [
                                {
                                    translateX: swipeAnimatedValue.interpolate({
                                        inputRange: [-200, -120, 0],
                                        outputRange: [0, 40, 100],
                                        extrapolate: 'clamp'
                                    })
                                }
                            ]
                        }
                    ]}
                >
                    <View style={ styles.backBtnInner }>
                        <MaterialCommunityIcons name="trash-can-outline" size={26} color={'#fff'} />
                        <Text style={ styles.backBtnText }>Delete</Text>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    )
})

const CartScreen = ({ navigation }) => {

    const { products } = useSelector(state => state.cartReducer)
    const dispatch = useDispatch()

    const [checkRowAnimatedValues, setCheckRowAnimatedValues] = useState(false)

    useEffect(() => {
        createAnimatedValue()
        setCheckRowAnimatedValues(!checkRowAnimatedValues)
        console.log('create animated')
    }, [])

    const createAnimatedValue = React.useCallback(() => {
        products.forEach((item, i) => {
            rowAnimatedValues[`${item._id}`] = {
                rowHeigt: new Animated.Value(128),
                rightBtnWidth: new Animated.Value(100),
                deleteBtnWidth: new Animated.Value(100),
                actionBottom: new Animated.Value(16),
                rowOpacity: new Animated.Value(1)
            }
        })
    }, [])

    // Modal
    const [isModalVisible, setIsModalVisible] = useState({
        visible: false,
        currentRowKey: null
    })

    const changeModalVisible = React.useCallback((bool, data) => {
        setIsModalVisible({
            visible: bool,
            currentRowKey: data ? data : null
        })
    }, [isModalVisible])

    const setData = () => {
        handleDelete(isModalVisible.currentRowKey)
    }

    const showModal = (rowKey) => {
        changeModalVisible(true, rowKey)
    }

    //

    const { width: screenWidth } = useWindowDimensions()

    const renderItem = useCallback((data, rowMap) => (
        <VisibleItem 
            data={data} 
            rowMap={rowMap} 
            onIncrease={() => handleIncrease(data.item._id)} 
            onDecrease={() => handleDecrease(data.item._id)}
        />
    ), [products])

    const renderIrenderHiddenItemtem = useCallback((data, rowMap) => (
        <HiddenItemWithActions data={data} rowMap={rowMap} onDelete={ handleDelete } />
    ), [products])

    const onRightActionStatusChange = useCallback(() => {
        console.log('On right action status change')
    }, [products])

    const swipeGestureEnded = useCallback((rowKey, data) => {
        // -200
        // Animated.timing(rowAnimatedValues[rowKey].rightBtnWidth, {
        //     toValue: 100,
        //     duration: 200,
        //     useNativeDriver: false,
        // }).start()
        if(data.translateX < -250) {
            Animated.timing(rowAnimatedValues[rowKey].deleteBtnWidth, {
                toValue: screenWidth,
                duration: 200,
                useNativeDriver: false,
            }).start()
            handleDelete(rowKey)
        }
    }, [products])

    const onSwipeValueChange = useCallback(data => {
        // console.log(-data.value)
        Animated.timing(rowAnimatedValues[data.key].rightBtnWidth, {
            toValue: (-data.value) > 200 ? (-data.value) - 100 : 100,
            duration: 200,
            useNativeDriver: false,
        }).start()
    }, [products])

    const handleDelete = (rowKey) => {
        Animated.timing(rowAnimatedValues[rowKey].rowOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false
        }).start()
        Animated.timing(rowAnimatedValues[rowKey].rowHeigt, {
            toValue: 0,
            duration: 200,
            delay: 200,
            useNativeDriver: false,
        }).start(() => {
            dispatch(deleteFromCart(rowKey))
        })
    }

    const handleIncrease = useCallback((rowKey) => {
        dispatch(inCrease(rowKey))
    }, [products])

    const handleDecrease = useCallback((rowKey) => {
        const newData = [...products]
        const index = products.findIndex(item => item._id === rowKey)

        if(newData[index].quantity - 1 < 1) {
            showModal(rowKey)
        }
        else {
            dispatch(deCrease(rowKey))
        }

    }, [products])

    const getTotalPrice = useCallback(() => {
        const total = products.reduce(
            (prev, cur) => prev + (cur.price * cur.quantity),
            0
        )
        console.log(total)
        return total
    }, [products])

    const isValid = () => {
        return (
            !isEmpty(products)
        )
    }

    return (
        <View style={ styles.container }>
            <CartHeader 
                label={'My cart'} 
                goBack={() => {
                        rowAnimatedValues = {}
                        navigation.goBack()
                    }
                }
            />
            {!isEmpty(rowAnimatedValues) &&
                <>
                    <View>
                        <SwipeListView
                            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 300, paddingTop: 28 }}
                            data={products}
                            keyExtractor={item => item._id}
                            renderItem={renderItem}
                            renderHiddenItem={renderIrenderHiddenItemtem}
                            // leftOpenValue={75}
                            showsVerticalScrollIndicator={false}
                            // -120
                            rightOpenValue={-200}
                            disableRightSwipe
                            stopLeftSwipe={100}
                            // -201
                            stopRightSwipe={-251}
                            // -250
                            rightActivationValue={-250}
                            rightActionValue={-screenWidth}
                            onRightActionStatusChange={onRightActionStatusChange}
                            swipeGestureEnded={swipeGestureEnded}
                            onSwipeValueChange={onSwipeValueChange}
                            swipeToOpenPercent={10}
                            swipeToClosePercent={10}
                            useNativeDriver={false}
                        />
                    </View>

                    <LinearGradient 
                        style={ styles.checkOutContainer } 
                        colors={['transparent', 'white', 'white']}
                    >
                        {isValid() &&
                            <>
                                <View style={ styles.totalContainer }>
                                    <Text style={ styles.totalTitle }>TOTAL</Text>
                                    <Text style={ styles.totalPrice }>{ (getTotalPrice()).toLocaleString('vi', {style : 'currency', currency : 'VND'}) }</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Checkout')}
                                    style={ styles.checkOutBtn }
                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Check Out</Text>
                                </TouchableOpacity>
                            </>
                        }
                    </LinearGradient>  
                    {/* <View style={ styles.checkOutContainer }>
                    </View> */}

                    <Modal
                        transparent={ true }
                        animationType='fade'
                        visible={ isModalVisible.visible }
                        onRequestClose={() => changeModalVisible(false) }
                    >
                        <SimpleModal 
                            changeModalVisible={ changeModalVisible }
                            setData={ setData }
                        />
                    </Modal>
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    rowFront: {
        flexDirection: 'row',
        // height: 60,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: 20,
        marginBottom: 28,
        elevation: 3
    },
    rowBack: {
        flex: 1,
        height: 134,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginHorizontal: 40
    },
    imageContainer: {
        width: 100,
        height: 100,
        marginRight: 24
    },
    name_price_Container: {
        flex: 1
    },
    nameText: {
        color: '#000',
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 8
    },
    classify: {
        fontSize: 12,
        fontWeight: 'bold',
        paddingVertical: 8
    },
    priceText: {
        color: 'tomato',
        fontSize: 14,
        fontWeight: 'bold'
    },
    quantityContainer: {

    },
    plusBtn: {
        backgroundColor: '#847be8',
        borderRadius: 90,
        padding: 2,
        elevation: 3
    },
    minusBtn: {
        backgroundColor: 'white',
        borderRadius: 90,
        padding: 2,
        elevation: 3
    },
    quantityText: {
        textAlign: 'center',
        color: '#847be8',
        fontWeight: 'bold',
        paddingVertical: 8
    },
    backBtn: {
        position: 'absolute',
        bottom: 16,
        top: 0,
        justifyContent: 'center',
    },
    backLeftBtn: {
        alignItems: 'flex-end',
        backgroundColor: 'green',
        paddingRight: 16,
    },
    backRightBtn: {
        right: 0,
        // 'flex-start'
        alignItems: 'center',
        // paddingLeft: 12,
    },
    backRightBtnLeft: {
        right: 0,
        backgroundColor: violet,
        borderRadius: 15,
    },
    backRightBtnRight: {
        right: 0,
        backgroundColor: 'tomato',
        borderRadius: 15,
        // borderTopRightRadius: 15,
        // borderBottomRightRadius: 15
    },
    backBtnInner: {
        alignItems: 'center',
    },
    backBtnText: {
        color: 'white',
        marginTop: 2,
    },
    checkOutContainer: {
        flex: 1,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        paddingTop: 100,
        paddingBottom: 8
    },
    checkOutBtn: {
        width: '80%',
        alignItems: 'center',
        backgroundColor: violet,
        padding: 18,
        borderRadius: 15,
        zIndex: 100
    },
    totalContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16
    },
    totalTitle: {
        fontSize: 18,
        color: '#969696',
        fontWeight: 'bold'
    },
    totalPrice: {
        fontSize: 32,
        color: 'tomato',
        fontWeight: '800'
    }
})

export default CartScreen