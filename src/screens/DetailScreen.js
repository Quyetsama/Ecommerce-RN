// import React, { useEffect, useRef, useState } from "react"
// import { 
//     Image, 
//     StyleSheet, 
//     Text, 
//     TouchableOpacity, 
//     View, 
//     Dimensions, 
//     ScrollView,
//     Button,
//     TextInput,
//     useWindowDimensions,
//     TouchableWithoutFeedback,
//     StatusBar,
//     Modal,
//     Animated as Anie
// } from "react-native"

// import Animated, { 
//     useAnimatedGestureHandler,
//     useSharedValue,
//     useAnimatedStyle,
//     withSpring
// } from 'react-native-reanimated'
// import { PanGestureHandler, GestureHandlerRootView, ScrollView as ScrollView2 } from 'react-native-gesture-handler'
// import SheetComponent from "../components/detailscreen/SheetComponent"
// import LoadingModal from "../components/modal/LoadingModal"
// import useBackButton from "../hooks/useBackButton"

// import { LogBox } from 'react-native';

// LogBox.ignoreLogs([
//     "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
// ])

// const SPRING_CONFIG = {
//     damping: 80,
//     overshootClamping: true,
//     restDisplacementThreshold: 0.1,
//     restSpeedThreshold: 0.1,
//     stiffness: 500
// }

// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import HeaderDetailProdcut from "../components/HeaderDetailProduct"
// import CarouselProduct from "../components/CarouselProduct"
// import GeneralComponent from "../components/detailscreen/GeneralComponent"
// import ShipComponent from "../components/detailscreen/ShipComponent"
// import TypeProductComponent from "../components/detailscreen/TypeProdcutComponent"
// import ShopComponent from "../components/detailscreen/ShopComponent"
// import UnderLineSection from "../components/UnderLineSection"
// import { doMain } from "../helpers/configs"
// import { getDetailProduct } from "../api/productApi"
// import { violet } from "../helpers/configs"

// const WIDTH = Dimensions.get('window').width
// const HEIGHT = Dimensions.get('window').height

// const tabs = [
//     {
//         icon: 'md-layers-outline',
//         ref: React.createRef()
//     },
//     {
//         icon: 'chatbubble-ellipses-outline',
//         ref: React.createRef()
//     }
// ]

// const Tab = React.forwardRef(({ icon, onItemPress }, ref) => {
//     return (
//         <TouchableOpacity
//             ref={ ref }
//             onPress={ onItemPress }
//             style={{
//                     // flex: 1,
//                     justifyContent: 'center',
//                     alignItems: 'center'
//                 }}
//             >
//                 <Ionicons name={ icon } size={25} color="#000" />

//         </TouchableOpacity>
//     )
// })

// const Tabs = ({ scrollX, onItemPress, onClickBuy }) => {

//     const [measures, setMeasures] = React.useState([])
// 	const containerRef = React.useRef()

// 	React.useEffect(() => {
// 		const m = []
// 		tabs.forEach(item => {
// 			item.ref.current.measureLayout(
// 				containerRef.current, 
// 				(x, y, width, height) => {
// 					m.push({
// 						x, y, width, height
// 					})

// 					if (m.length === tabs.length) {
// 						setMeasures(m)
// 					}
// 				}
// 			)
// 		})
// 	}, [containerRef.current])

//     // console.log(measures)

//     return (
//         <View
//             style={{ 
//                 // flex: 1,
//                 flexDirection: 'row',
//                 backgroundColor: '#fff',
//                 borderBottomWidth: 1,
//                 borderBottomColor: '#f2f2f2'
//             }}
//         >
//             <View 
//                 ref={ containerRef }
//                 style={{ 
//                     flex: 1,
//                     flexDirection: 'row',
//                     justifyContent: 'space-around',
//                     alignItems: 'center'
//                 }}
//             >
//                 {tabs.map((item, index) => (
//                     <Tab key={ index } icon={ item.icon } ref={ item.ref } onItemPress={() => onItemPress(index)} />
//                 ))}
//             </View>
            
//             <TouchableOpacity
//                 style={{
//                     // flex: 1,
//                     width: WIDTH / 4,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     paddingVertical: 10,
//                     backgroundColor: violet
//                 }}
//                 onPress={ onClickBuy }
//             >
//                 <Text 
//                 style={{
//                     color: '#fff',
//                     fontSize: 15,
//                     paddingHorizontal: 15
//                 }}
//                 >
//                     + Buy
//                 </Text>
//             </TouchableOpacity>

//             { measures.length > 0 && <Indicator measures={ measures } scrollX={ scrollX } /> }
//         </View>
//     )
// }

// const Indicator = ({ measures, scrollX }) => {

//     const inputRange = tabs.map((_, i) => i * WIDTH)
// 	const indicatorWidth = scrollX.interpolate({
// 		inputRange, 
// 		outputRange: measures.map(measure => measure.width)
// 	})
// 	const translateX = scrollX.interpolate({
// 		inputRange, 
// 		outputRange: measures.map(measure => measure.x)
// 	})

//     return (
//         <Anie.View
//             style={{
//                 position: 'absolute',
//                 bottom: 0,
//                 backgroundColor: violet,
//                 height: 3,
//                 width: indicatorWidth,
//                 left: 0,
//                 transform: [{
// 					translateX
// 				}]
//             }}
//         >

//         </Anie.View>
//     )
// }

// const DetailScreen = ({ route, navigation }) => {

//     const [product, setProduct] = useState(null)
//     const [isLoading, setIsLoading] = useState(true)

//     useBackButton(() => {
//         navigation.goBack()
//         return true
//     })

//     useEffect(() => {
//         fetchProduct()
//     }, [])

//     const fetchProduct = async () => {
//         try {
//             const res = await getDetailProduct(route.params._id)
//             setProduct(res.data)
//             setIsLoading(false)
//         }
//         catch(error) {
//             console.log(error.response.data)
//         }
//     }

//     const scrollX = React.useRef(new Anie.Value(0)).current

//     const offset = useRef(new Anie.Value(0)).current

//     const ref = useRef()
//     const onItemPress = React.useCallback(index => {
//         ref?.current?.scrollTo({
//             x: index * WIDTH,
//             animated: true
//         })
//     })


//     // Animated
//     const sheetRef = useRef()
//     const dimensions = useWindowDimensions()

//     const top = useSharedValue(
//         dimensions.height
//     )

//     const style = useAnimatedStyle(() => {
//         return {
//             top: top.value,
//         }
//     })

//     const styleHeight = useAnimatedStyle(() => {
//         return {
//             height: top.value === HEIGHT ? 0 : HEIGHT
//         }
//     })

//     const gestureHandler = useAnimatedGestureHandler({
//         onStart(_, context) {
//             context.startTop = top.value
//         },
//         onActive(event, context) {
//             if((context.startTop + event.translationY) < (dimensions.height / 4)) {
//                 return
//             }
//             top.value = withSpring(
//                 context.startTop + event.translationY,
//                 SPRING_CONFIG
//             )
//         },
//         onEnd() {
//             if(top.value > dimensions.height / 2 + 50) {
//                 top.value = withSpring(
//                     dimensions.height,
//                     SPRING_CONFIG
//                 )
//             }
//             else {
//                 top.value = withSpring(
//                     dimensions.height / 4,
//                     SPRING_CONFIG
//                 )
//             }
//         }
//     })

//     const handleShowSheet = React.useCallback(() => {
//         top.value = withSpring(
//             dimensions.height / 4,
//             SPRING_CONFIG
//         )
//     }, [])

//     return (
//         <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
//             {
//                 product &&
//                 <>
//                     <View style={ styles.container }>
//                         <StatusBar hidden />
//                         {/* <HeaderDetailProdcut navigation={ navigation } animatedValue={ offset } /> */}

//                         {/* <ScrollView
//                             contentContainerStyle={{ paddingBottom: 100 }}
//                             showsVerticalScrollIndicator={ false }
//                             onScroll={Anie.event(
//                                 [{ nativeEvent: { contentOffset: { y: offset } } }],
//                                 {
//                                     useNativeDriver: false 
//                                 }
//                             )}
//                         > */}
//                             {/* Carousel */}
//                             <CarouselProduct images={ product?.image || [] } />

//                             <Tabs scrollX={ scrollX } onItemPress={ onItemPress } onClickBuy={ handleShowSheet } />
//                             <ScrollView
//                                 ref={ ref }
//                                 horizontal
//                                 pagingEnabled
//                                 showsHorizontalScrollIndicator={ false }
//                                 removeClippedSubviews
//                                 onScroll={
//                                     Anie.event(
//                                         [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//                                         { useNativeDriver: false }
//                                     )
//                                 }
//                             >
//                                 <ScrollView
//                                     showsVerticalScrollIndicator={ false }
//                                 >
//                                     <View style={ styles.tabViewContainer }>
//                                         {/* General */}
//                                         <GeneralComponent 
//                                             name={ product?.name } 
//                                             price={ product?.price || 0 } 
//                                             sold={ product?.sold || 0 } 
//                                             discount={ product?.discount }
//                                             rate={ product?.rate || {} }
//                                         />
//                                         <UnderLineSection />

//                                         {/* Ship */}
//                                         <ShipComponent 
//                                             transportFee={ product?.transportFee || 0 }
//                                         />
//                                         <UnderLineSection />

//                                         {/*  */}
//                                         {product?.classify &&
//                                             <>
//                                                 <TypeProductComponent 
//                                                     classify={ product?.classify } 
//                                                     onPress={ handleShowSheet } 
//                                                 />
//                                                 <UnderLineSection />
//                                             </>
//                                         }

//                                         {/*  */}
//                                         <ShopComponent />
//                                         <UnderLineSection />
//                                     </View>
//                                 </ScrollView>

//                                 <ScrollView
//                                     showsVerticalScrollIndicator={ false }
//                                 >
//                                     <View style={ styles.tabViewContainer }>
//                                         {/*  */}
//                                         <ShopComponent />
//                                         <UnderLineSection />
//                                     </View>
//                                 </ScrollView>
//                             </ScrollView>
//                         {/* </ScrollView> */}
//                     </View>

//                     <Animated.View
//                         style={[
//                             {
//                                 position: 'absolute',
//                                 width: WIDTH,
//                                 backgroundColor: 'rgba(52, 52, 52, 0.4)',
//                                 zIndex: 10
//                             },
//                             styleHeight
//                         ]}
//                         onStartShouldSetResponder={() => {
//                             top.value = withSpring(
//                                 dimensions.height,
//                                 SPRING_CONFIG
//                             )
//                         }}
//                     >

//                     </Animated.View>
                    
//                     <SheetComponent
//                         product={ product }
//                         onGestureEvent={ gestureHandler } 
//                         style={ style } 
//                         onClose={() => {
//                             top.value = withSpring(
//                                 dimensions.height,
//                                 SPRING_CONFIG
//                             )
//                         }}
//                     />
//                 </>
//             }
            

//             <Modal
//                 transparent={ true }
//                 animationType='fade'
//                 visible={ isLoading }
//                 onRequestClose={() => navigation.goBack() }
//             >
//                 <LoadingModal />
//             </Modal>

//             {/* <View 
//                 style={{ 
//                     position: 'absolute',
//                     bottom: 0,
//                     flexDirection: 'row', 
//                     justifyContent: 'center',
//                     backgroundColor: '#fff'
//                 }}
//             >
//                 <TouchableOpacity 
//                     style={[ styles.buttonAddToCart ]}
//                     activeOpacity={ 0.8}
//                     onPress={ handleShowSheet }
//                 >
//                     <MaterialCommunityIcons name={ 'cart-plus' } size={25} color="#fff" />
//                     <Text
//                         style={{
//                             color: '#fff',
//                             fontSize: 12
//                         }}
//                     >Thêm vào giỏ hàng</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={[ styles.buttonBuyNow ]}
//                     activeOpacity={ 0.8}
//                     onPress={ handleShowSheet }
//                 >
//                     <Text
//                         style={{
//                             color: '#fff',
//                             fontSize: 15
//                         }}
//                     >Mua ngay</Text>
//                 </TouchableOpacity>
//             </View> */}
//         </GestureHandlerRootView>
//     )
// }


// const button = {
//     flex: 1,
//     justifyContent: 'center', 
//     alignItems: 'center',
//     padding: 5
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     tabViewContainer: {
//         flex: 1,
//         width: WIDTH
//     },
//     sheet: {
//         position: 'absolute',
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'white',
//         borderTopLeftRadius: 5,
//         borderTopRightRadius: 5,
//         elevation: 5,
//         paddingTop: 10
//         // padding: 10
//     },
//     headerSheet: {
//         // flex: 1,
//         flexDirection: 'row',
//         paddingBottom: 10,
//         paddingHorizontal: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#f2f2f2'
//     },
//     imageSheet: {
//         flex: 1,
//         width: null,
//         height: null,
//     },
//     buttonAddToCart: {
//         ...button,
//         backgroundColor: 'tomato',
//         // 26ab9a
//     },
//     buttonBuyNow: {
//         ...button,
//         backgroundColor: violet
//     }
// })

// export default DetailScreen





















import React, { useState, useEffect, useRef } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    FlatList,
    Animated as Animated1,
    Modal,
    LogBox,
    useWindowDimensions
} from 'react-native'
import { SCREEN, SIZE } from '../utils/configs'
import { COLORS } from '../utils'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { getDetailProduct } from '../api/productApi'
import useBackButton from '../hooks/useBackButton'
import { doMain } from '../utils/configs'
import CarouselProduct from '../components/CarouselProduct'
import LinearGradient from 'react-native-linear-gradient'
import { kFormatter, convertVND } from '../utils/validation'
import LoadingModal from '../components/modal/LoadingModal'
import logoQ from '../assets/images/Q.png'
import AnimatedHeart from '../components/detailscreen/AnimatedHeart'
import { useSelector } from 'react-redux'
import { favoriteProduct } from '../api/productApi'


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



const InfoProduct = React.memo(({ navigation, product }) => {

    const userToken = useSelector(state => state.authReducer.userToken)
    const lengthCart = useSelector(state => state.cartReducer.products.length)

    const animatedvalue = useRef(new Animated1.Value(0)).current

    const headerAnimation = {
        opacity: animatedvalue.interpolate({
            inputRange: [0, 120],
            outputRange: [0, 1]
        })
    }

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
            <Animated1.View style={ styles.header }>
                <TouchableOpacity style={ styles.iconBack } onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons style={{ borderRadius: 100, backgroundColor: COLORS.secondary, padding: 4 }} name={ 'keyboard-backspace' } size={ SIZE(24) } color={'#000'} />
                </TouchableOpacity>
                <TouchableOpacity style={ styles.iconCart } onPress={() => navigation.navigate('Order')}>
                    <MaterialCommunityIcons style={{ borderRadius: 100, backgroundColor: COLORS.secondary, padding: 4 }} name={ 'cart-outline' } size={ SIZE(24) } color={'#000'} />
                    <View style={ styles.iconBage }>
                        <Text style={{ color: 'white' }}>{ lengthCart }</Text>
                    </View>
                </TouchableOpacity>
            </Animated1.View>

            <Animated1.View 
                style={[ styles.header, { backgroundColor: 'white', elevation: 10 }, headerAnimation ]}
            >
                <TouchableOpacity 
                    style={ styles.iconBack }
                    onPress={() => navigation.goBack()}
                >
                    <MaterialCommunityIcons 
                        style={{ padding: 4 }} 
                        name={ 'keyboard-backspace' } 
                        size={ SIZE(24) } 
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
                        size={ SIZE(24) } 
                        color={'#000'} 
                    />
                    <View style={ styles.iconBage }>
                        <Text style={{ color: 'white' }}>{ lengthCart }</Text>
                    </View>
                </TouchableOpacity>
                <Image
                    style={{
                        width: SIZE(42),
                        height: SIZE(42)
                    }}
                    source={ logoQ }
                    resizeMode='contain'
                />
                {/* <Text style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, textAlign: 'center' }}>Product</Text> */}
            </Animated1.View>

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

                    <View style={ styles.reviews }>
                        <Feather name={ 'star' } size={ SIZE(22) } color={'#fdd34d'} />
                        <Text style={ styles.reviewsTxt }>
                            {
                                product?.count > 0 ?
                                product?.star / product?.count :
                                0
                            }
                        </Text>
                    </View>

                    <View style={ styles.reviews }>
                        <Text>Sold: { kFormatter(product?.sold) }</Text>
                    </View>

                    <ClassifyProduct 
                        data={ 
                            [
                                ...(product?.classify?.generalClassification[0]?.data ? product?.classify?.generalClassification[0]?.data : []),
                                ...(product?.classify?.generalClassification[1]?.data ? product?.classify?.generalClassification[1]?.data : [])
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
            height: top.value === SCREEN.HEIGHT ? 0 : SCREEN.HEIGHT
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
        // <GestureHandlerRootView style={{ flex: 1 }}>
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
                                <Text style={{ color: 'white', fontSize: SIZE(22), fontWeight: 'bold' }}>{ convertVND(product?.price) }</Text>
                            </View>

                            <TouchableOpacity
                                style={ styles.addToCartBtn }
                                onPress={ handleShowSheet }
                            >
                                <Feather name={ 'shopping-bag' } size={ SIZE(22) } color={'#000'} />
                                <Text style={ styles.addToCartTxt }>Add to Cart</Text>
                            </TouchableOpacity>
                        </View>

                        <Animated.View
                            style={[
                                {
                                    position: 'absolute',
                                    width: SCREEN.WIDTH,
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
        // </GestureHandlerRootView>
    )
}


// 1a1b1d
// fdd34d
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.dark
    },
    topContainer: {
        // flex: 1,
        width: SCREEN.WIDTH,
        height: SCREEN.HEIGHT * 0.85,
        backgroundColor: 'white',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        overflow: 'hidden'
    },
    image: {
        // flex: 1,
        // width: '100%',
        height: SCREEN.HEIGHT * 0.4
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
        fontSize: SIZE(32),
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
    reviews: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6
    },
    reviewsTxt: {
        marginLeft: 6
    },
    header: {
        position: 'absolute',
        top: 0,
        zIndex: 100,
        flexDirection: 'row',
        width: SCREEN.WIDTH,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 18
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
        width: SIZE(22),
        height: SIZE(22),
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
        fontSize: SIZE(16),
        color: 'gray'
    },



    bottomContainer: {
        // flex: 0.15,
        width: SCREEN.WIDTH,
        height: SCREEN.HEIGHT * 0.15,
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