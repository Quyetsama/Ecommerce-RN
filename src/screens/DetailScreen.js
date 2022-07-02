import React, { useState, useEffect, useRef } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated as Animated1,
    Modal,
    LogBox,
    useWindowDimensions
} from 'react-native'
import { SCREEN, SIZE } from '../utils/configs'
import { COLORS, WINDOW_WIDTH, WINDOW_HEIGHT } from '../utils'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { getDetailProduct } from '../api/productApi'
import useBackButton from '../hooks/useBackButton'
import CarouselProduct from '../components/CarouselProduct'
import LinearGradient from 'react-native-linear-gradient'
import { kFormatter, convertVND } from '../utils/validation'
import LoadingModal from '../components/modal/LoadingModal'
import logoQ from '../assets/images/Q.png'
import AnimatedHeart from '../components/detailscreen/AnimatedHeart'
import { useSelector } from 'react-redux'
import { favoriteProduct } from '../api/productApi'
import { AirbnbRating } from 'react-native-ratings'


LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
])

import Animated, { 
    useAnimatedGestureHandler,
    useSharedValue,
    useAnimatedStyle,
    withSpring
} from 'react-native-reanimated'
import { PanGestureHandler, GestureHandlerRootView, ScrollView as ScrollView2 } from 'react-native-gesture-handler'
import SheetComponent from "../components/detailscreen/SheetComponent"



const SPRING_CONFIG = {
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500
}

const getUniqueId = () => {
    return Math.floor(Math.random() * Date.now()).toString()
}

const ItemClassify = React.memo(({ item }) => {
    return (
        <View style={ styles.itemClassify }>
            <Text style={{ fontWeight: '500', fontSize: 13 }}>{ item }</Text>
        </View>
    )
})

const ClassifyProduct = React.memo(({ data }) => {
    return (
        <>
            {
                data?.length > 0 &&
                <TouchableOpacity
                    style={ styles.classifyContainer }
                    activeOpacity={1}
                >
                    {
                        data?.map((item, index) => {
                            if(index >= 5) return
                            return <ItemClassify key={ index } item={ item } />
                        })
                    }
                    {
                        data?.length > 3 && <ItemClassify item={ '+' + (data?.length - 5) } />
                    }
                    {/* <FlatList
                        // horizontal
                        numColumns={10}
                        data={ data }
                        renderItem={({item, index}) => {
                            // if(index >= 3) return
                            return <ItemClassify item={ item } />
                        }}
                        ListFooterComponent={
                            data.length >= 3 && <Text>...</Text>
                        }
                    /> */}
                </TouchableOpacity>
            }
        </>
    )
})

const HeaderDetail = ({ navigation, lengthCart, animatedValue }) => {

    const headerAnimation = {
        opacity: animatedValue.interpolate({
            inputRange: [0, 120],
            outputRange: [0, 1]
        })
    }

    return (
        <>
            <View style={ styles.header }>
                <TouchableOpacity style={ styles.iconBack } onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons 
                        style={ styles.iconHeader } 
                        name={ 'keyboard-backspace' } 
                        size={ 24 } 
                        color={ COLORS.primary } 
                    />
                </TouchableOpacity>
                <TouchableOpacity style={ styles.iconCart } onPress={() => navigation.navigate('Order')}>
                    <MaterialCommunityIcons 
                        style={ styles.iconHeader } 
                        name={ 'cart-outline' } 
                        size={ 24 } 
                        color={ COLORS.primary } 
                    />
                    <View style={ styles.iconBage }>
                        <Text style={{ color: 'white' }}>{ lengthCart }</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Animated1.View 
                style={[ styles.header, { backgroundColor: 'white', elevation: 10 }, headerAnimation ]}
            >
                <TouchableOpacity 
                    // style={ styles.iconBack }
                    style={{
                        padding: 24,
                        paddingLeft: 18
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialCommunityIcons 
                        style={{ padding: 4 }} 
                        name={ 'keyboard-backspace' } 
                        size={ 24 } 
                        color={'#000'} 
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={ styles.iconCart }
                    onPress={() => navigation.navigate('Order')}
                >
                    <MaterialCommunityIcons 
                        style={{ padding: 4 }} 
                        name={ 'cart-outline' } 
                        size={ 24 } 
                        color={'#000'} 
                    />
                    <View style={ styles.iconBage }>
                        <Text style={{ color: 'white' }}>{ lengthCart }</Text>
                    </View>
                </TouchableOpacity>
            </Animated1.View>
        </>
    )
}

const InfoProduct = React.memo(({ navigation, product }) => {

    const userToken = useSelector(state => state.authReducer.userToken)
    const lengthCart = useSelector(state => state.cartReducer.products.length)

    const animatedvalue = useRef(new Animated1.Value(0)).current

    const [heart, setHeart] = useState(product?.favorite)
    const [countHeart, setCountHeart] = useState(product?.favorite ? true : false)
    
    const handleFavorite = async () => {
        try {
            setHeart(prev => !prev)
            setCountHeart(false)
            
            await favoriteProduct(userToken, !heart, product?._id)
        }
        catch(error) {
            console.log(error.response?.data)
            setHeart(false)
            navigation.navigate('stackAuth')
        }

    }

    return (
        <View style={ styles.infoProductContainer }>
        
            <HeaderDetail navigation={ navigation } lengthCart={ lengthCart } animatedValue={ animatedvalue } />

            <ScrollView
                contentContainerStyle={{ paddingBottom: 50 }}
                showsVerticalScrollIndicator={ false }
                onScroll={Animated1.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: { y: animatedvalue }
                            }
                        }
                    ],
                    { useNativeDriver: false }
                )}
            >
                <View>
                    <CarouselProduct images={ product?.image } />
                    {
                        product?.discount &&
                        <View style={ styles.discountContainer }>
                            <Text style={ styles.discountTxt }>{ product?.discount }% OFF</Text>
                        </View>
                    }
                    
                </View>
                
                <View style={{ flex: 1 }}>
                    <View style={ styles.nameProductContainer }>
                        <Text numberOfLines={ 2 } style={ styles.nameProduct }>{ product?.name }</Text>
                        <TouchableOpacity 
                            style={ styles.iconHeartBtn }
                            onPress={ handleFavorite }
                        >
                            <AntDesign 
                                name={ heart ? 'heart' : 'hearto' } 
                                size={ SIZE(28) } 
                                color={ heart ? 'red' : '#000'} 
                            />
                        </TouchableOpacity>
                        {
                            // heart && <AnimatedHeart key={ getUniqueId()} />
                            heart && (countHeart === false) && <AnimatedHeart />
                        }
                    </View>

                    {/* {
                        product?.rate.count > 0 && */}
                        <AirbnbRating
                            isDisabled={ true }
                            defaultRating={ Math.round(product?.rate.star / product?.rate.count) }
                            showRating={ false }
                            size={ 25 }
                            starContainerStyle={{ alignSelf: 'flex-start', paddingVertical: 6 }}
                        />
                    {/* } */}
                    
                    {/* <View style={ styles.ratingContainer }>
                        <Feather name={ 'star' } size={ SIZE(22) } color={'#fdd34d'} />
                        <Text style={ styles.ratingTxt }>
                            {
                                product?.rate.count > 0 ?
                                (product?.rate.star / product?.rate.count).toFixed(1) :
                                0
                            }
                        </Text>
                    </View> */}

                    <View style={ styles.soldContainer }>
                        <Text style={ styles.soldText }>Sold: { kFormatter(product?.sold) }</Text>
                    </View>

                    <ClassifyProduct 
                        data={ 
                            [
                                ...(product?.classify[0]?.data ? product?.classify[0]?.data : []),
                                ...(product?.classify[1]?.data ? product?.classify[1]?.data : [])
                            ]
                        } 
                    />

                    <View style={ styles.desContainer }>
                        <Text style={ styles.desProduct }>● { product?.description }</Text>
                    </View>
                </View>
            </ScrollView>
            <LinearGradient 
                style={ styles.linearGradient } 
                colors={['transparent', 'transparent', 'white']}
            />
        </View>
    )
})

const DetailScreen = ({ route, navigation }) => {

    const userToken = useSelector(state => state.authReducer.userToken)
    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useBackButton(() => {
        navigation.goBack()
        return true
    })

    useEffect(() => {
        fetchProduct()
    }, [])

    const fetchProduct = async () => {
        try {
            const res = await getDetailProduct(route.params._id, userToken)
            setProduct(res.data)
            setIsLoading(false)
        }
        catch(error) {
            console.log(error.response.data)
        }
    }


    // Animated
    const sheetRef = useRef()
    const dimensions = useWindowDimensions()

    const top = useSharedValue(
        dimensions.height
    )

    const style = useAnimatedStyle(() => {
        return {
            top: top.value,
        }
    })

    const styleHeight = useAnimatedStyle(() => {
        return {
            height: top.value === WINDOW_HEIGHT ? 0 : WINDOW_HEIGHT
        }
    })

    const gestureHandler = useAnimatedGestureHandler({
        onStart(_, context) {
            context.startTop = top.value
        },
        onActive(event, context) {
            if((context.startTop + event.translationY) < (dimensions.height / 4)) {
                return
            }
            top.value = withSpring(
                context.startTop + event.translationY,
                SPRING_CONFIG
            )
        },
        onEnd() {
            if(top.value > dimensions.height / 2 + 50) {
                top.value = withSpring(
                    dimensions.height,
                    SPRING_CONFIG
                )
            }
            else {
                top.value = withSpring(
                    dimensions.height / 4,
                    SPRING_CONFIG
                )
            }
        }
    })

    const handleShowSheet = React.useCallback(() => {
        top.value = withSpring(
            dimensions.height / 4,
            SPRING_CONFIG
        )
    }, [])

    return (
        <View style={{ flex: 1 }}>
            {
                !isLoading &&
                <View style={ styles.container }>
                    <View style={ styles.topContainer }>
                        <InfoProduct navigation={ navigation } product={ product } />
                    </View>
                    <View style={ styles.bottomContainer }>
                        <View style={ styles.priceProduct }>
                            <Text style={{ color: '#fdd34d' }}>PRICE:</Text>
                            <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>{ convertVND(product?.price) }</Text>
                        </View>

                        <TouchableOpacity
                            style={ styles.addToCartBtn }
                            onPress={ handleShowSheet }
                        >
                            <Feather name={ 'shopping-bag' } size={ 22 } color={'#000'} />
                            <Text style={ styles.addToCartTxt }>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>

                    <Animated.View
                        style={[
                            {
                                position: 'absolute',
                                width: WINDOW_WIDTH,
                                backgroundColor: 'rgba(52, 52, 52, 0.4)',
                                zIndex: 10
                            },
                            styleHeight
                        ]}
                        onStartShouldSetResponder={() => {
                            top.value = withSpring(
                                dimensions.height,
                                SPRING_CONFIG
                            )
                        }}
                    >

                    </Animated.View>
                    
                    <SheetComponent
                        product={ product }
                        onGestureEvent={ gestureHandler } 
                        style={ style } 
                        onClose={() => {
                            top.value = withSpring(
                                dimensions.height,
                                SPRING_CONFIG
                            )
                        }}
                    />
                </View>
            }
            
            <Modal
                statusBarTranslucent
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


// 1a1b1d
// fdd34d
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    topContainer: {
        // flex: 1,
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT * 0.85,
        backgroundColor: 'white',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        overflow: 'hidden'
    },
    image: {
        // flex: 1,
        // width: '100%',
        height: WINDOW_HEIGHT * 0.4
    },
    infoProductContainer: {
        flex: 1,
        paddingHorizontal: 18
    },
    nameProductContainer: {
        flexDirection: 'row'
    },
    nameProduct: {
        flex: 1,
        marginRight: 18,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000'
    },
    discountContainer: {
        position: 'absolute',
        right: 0,
        bottom: 10,
        backgroundColor: COLORS.secondary,
        paddingVertical: 3,
        paddingHorizontal: 12,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12
    },
    discountTxt: {
        color: COLORS.dark,
        fontSize: 13,
        fontWeight: 'bold'
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6
    },
    ratingTxt: {
        fontWeight: '500',
        color: COLORS.gray,
        marginLeft: 6
    },
    soldContainer: {
        backgroundColor: '#ededed',
        alignSelf: 'flex-start',
        padding: 6,
        borderRadius: 6,
        marginVertical: 6
    },
    soldText: {
        fontWeight: '500',
        color: COLORS.gray
    },
    header: {
        position: 'absolute',
        top: 0,
        zIndex: 100,
        flexDirection: 'row',
        width: WINDOW_WIDTH,
        // backgroundColor: 'red',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    iconHeader: {
        borderRadius: 100,
        backgroundColor: COLORS.secondary,
        padding: 4
    },
    iconBack: {
        position: 'absolute',
        top: 24,
        left: 18,
        zIndex: 100
    },
    iconCart: {
        position: 'absolute',
        top: 24,
        right: 18,
        zIndex: 100
    },
    iconBage: {
        position: 'absolute',
        top: -6,
        right: -6,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 6,
        width: 22,
        height: 22,
        borderRadius: 100,
        backgroundColor: COLORS.tomato,
        borderWidth: 1,
        borderColor: 'white'
    },
    iconHeartBtn: {
        marginTop: 4
    },
    desContainer: {
        marginTop: 8
    },
    desProduct: {
        fontSize: 16,
        color: 'gray'
    },



    bottomContainer: {
        // flex: 0.15,
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT * 0.15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18
    },
    addToCartBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8
    },
    addToCartTxt: {
        color: '#000',
        fontWeight: 'bold',
        marginLeft: 12
    },
    classifyContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 12
    },
    itemClassify: {
        padding: 8,
        marginRight: 12,
        marginBottom: 12,
        backgroundColor: 'rgba(253, 211, 77, 0.7)',
        borderRadius: 12
    },
    linearGradient: {
        width: '200%',
        height: 100,
        position: 'absolute',
        bottom: 0
    }
})

export default DetailScreen