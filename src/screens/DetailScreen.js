import React, { useEffect, useRef, useState } from "react"
import { 
    Image, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View, 
    Dimensions, 
    ScrollView,
    Button,
    TextInput,
    useWindowDimensions,
    TouchableWithoutFeedback,
    Animated as Anie
} from "react-native"

import Animated, { 
    useAnimatedGestureHandler,
    useSharedValue,
    useAnimatedStyle,
    withSpring
} from 'react-native-reanimated'
import { PanGestureHandler, GestureHandlerRootView, ScrollView as ScrollView2 } from 'react-native-gesture-handler'
import SheetComponent from "../components/detailscreen/SheetComponent"

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
])

const SPRING_CONFIG = {
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500
}

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HeaderDetailProdcut from "../components/HeaderDetailProduct"
import CarouselProduct from "../components/CarouselProduct"
import GeneralComponent from "../components/detailscreen/GeneralComponent"
import ShipComponent from "../components/detailscreen/ShipComponent"
import TypeProductComponent from "../components/detailscreen/TypeProdcutComponent"
import ShopComponent from "../components/detailscreen/ShopComponent"
import UnderLineSection from "../components/UnderLineSection"
import { doMain } from "../helpers/configs"
import { getDetailProduct } from "../api/productApi"
import { violet } from "../helpers/configs"

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const tabs = [
    {
        icon: 'md-layers-outline',
        ref: React.createRef()
    },
    {
        icon: 'chatbubble-ellipses-outline',
        ref: React.createRef()
    }
]

const kFormatter = (num) => {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

const Tab = React.forwardRef(({ icon, onItemPress }, ref) => {
    return (
        <TouchableOpacity
            ref={ ref }
            onPress={ onItemPress }
            style={{
                    // flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Ionicons name={ icon } size={25} color="#000" />

        </TouchableOpacity>
    )
})

const Tabs = ({ scrollX, onItemPress }) => {

    const [measures, setMeasures] = React.useState([])
	const containerRef = React.useRef()

	React.useEffect(() => {
		const m = []
		tabs.forEach(item => {
			item.ref.current.measureLayout(
				containerRef.current, 
				(x, y, width, height) => {
					m.push({
						x, y, width, height
					})

					if (m.length === tabs.length) {
						setMeasures(m)
					}
				}
			)
		})
	}, [containerRef.current])

    // console.log(measures)

    return (
        <View
            style={{ 
                flex: 1,
                flexDirection: 'row',
                backgroundColor: '#fff',
                borderBottomWidth: 1,
                borderBottomColor: '#f2f2f2'
            }}
        >
            <View 
                ref={ containerRef }
                style={{ 
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}
            >
                {tabs.map((item, index) => (
                    <Tab key={ index } icon={ item.icon } ref={ item.ref } onItemPress={() => onItemPress(index)} />
                ))}
            </View>
            
            <TouchableOpacity
                style={{
                    // flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 10,
                    backgroundColor: violet
                }}
            >
                <Text 
                style={{
                    color: '#fff',
                    fontSize: 15,
                    paddingHorizontal: 15
                }}
                >
                    + Mua ngay
                </Text>
            </TouchableOpacity>

            { measures.length > 0 && <Indicator measures={ measures } scrollX={ scrollX } /> }
        </View>
    )
}

const Indicator = ({ measures, scrollX }) => {

    const inputRange = tabs.map((_, i) => i * WIDTH)
	const indicatorWidth = scrollX.interpolate({
		inputRange, 
		outputRange: measures.map(measure => measure.width)
	})
	const translateX = scrollX.interpolate({
		inputRange, 
		outputRange: measures.map(measure => measure.x)
	})

    return (
        <Anie.View
            style={{
                position: 'absolute',
                bottom: 0,
                backgroundColor: violet,
                height: 3,
                width: indicatorWidth,
                left: 0,
                transform: [{
					translateX
				}]
            }}
        >

        </Anie.View>
    )
}

const DetailScreen = ({ route, navigation }) => {

    const [product, setProduct] = useState({})
    useEffect(() => {
        getDetailProduct(route.params._id).then(res => {
            setProduct(res.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    const scrollX = React.useRef(new Anie.Value(0)).current

    const offset = useRef(new Anie.Value(0)).current

    const ref = useRef()
    const onItemPress = React.useCallback(index => {
        ref?.current?.scrollTo({
            x: index * WIDTH,
            animated: true
        })
    })


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
            height: top.value === HEIGHT ? 0 : HEIGHT
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
            top.value = context.startTop + event.translationY
        },
        onEnd() {
            if(top.value > dimensions.height / 2 + 200) {
                top.value = dimensions.height
            }
            else {
                top.value = dimensions.height / 4
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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={ styles.container }>
                <HeaderDetailProdcut navigation={ navigation } animatedValue={ offset } />

                <ScrollView
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={ false }
                    onScroll={Anie.event(
                        [{ nativeEvent: { contentOffset: { y: offset } } }],
                        {
                            useNativeDriver: false 
                        }
                    )}
                >
                    {/* Carousel */}
                    <CarouselProduct images={ product.image || [] } />

                    <Tabs scrollX={ scrollX } onItemPress={ onItemPress } />
                    <ScrollView
                        ref={ ref }
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={ false }
                        removeClippedSubviews
                        onScroll={
                            Anie.event(
                                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                { useNativeDriver: false }
                            )
                        }
                    >
                        <View style={ styles.tabViewContainer }>
                            {/* General */}
                            <GeneralComponent 
                                name={ product.name } 
                                price={ product.price || 0 } 
                                sold={ product.sold || 0 } 
                                discount={ product.discount }
                                rate={ product.rate || {} }
                            />
                            <UnderLineSection />

                            {/* Ship */}
                            <ShipComponent 
                                transportFee={ product.transportFee || 0 }
                            />
                            <UnderLineSection />

                            {/*  */}
                            {product.classify &&
                                <>
                                    <TypeProductComponent 
                                        classify={ product.classify } 
                                        onPress={ handleShowSheet } 
                                    />
                                    <UnderLineSection />
                                </>
                            }

                            {/*  */}
                            <ShopComponent />
                            <UnderLineSection />
                        </View>

                        <View style={ styles.tabViewContainer }>
                            {/*  */}
                            <ShopComponent />
                            <UnderLineSection />
                        </View>
                    </ScrollView>
                </ScrollView>
            </View>

            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        width: WIDTH,
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
                _id={ product?._id }
                image={ product.image && product.image[0] } 
                data={ product.classify }
                onGestureEvent={ gestureHandler } 
                style={ style } 
                onClose={() => {
                    top.value = withSpring(
                        dimensions.height,
                        SPRING_CONFIG
                    )
                }}
            />  

            <View 
                style={{ 
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row', 
                    justifyContent: 'center',
                    backgroundColor: '#fff'
                }}
            >
                <TouchableOpacity 
                    style={[ styles.buttonAddToCart ]}
                    activeOpacity={ 0.8}
                    onPress={ handleShowSheet }
                >
                    <MaterialCommunityIcons name={ 'cart-plus' } size={25} color="#fff" />
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 12
                        }}
                    >Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[ styles.buttonBuyNow ]}
                    activeOpacity={ 0.8}
                    onPress={ handleShowSheet }
                >
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 15
                        }}
                    >Mua ngay</Text>
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
    )
}

{/* <PanGestureHandler
    onGestureEvent={ gestureHandler }
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
                    source={{ uri: product.image && (doMain + '/image/' + product.image[0]) }}
                    style={ styles.imageSheet }
                    resizeMode='contain'
                />
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', marginLeft: 10 }}>
                <Text style={{ color: 'red' }}>25.000đ - 50.000đ</Text>
                <Text>Kho: 282101</Text>
            </View>
            <TouchableOpacity 
                activeOpacity={0.5} 
                onPress={() => {
                        top.value = withSpring(
                            dimensions.height,
                            SPRING_CONFIG
                        )
                    }
                }
            >
                <Ionicons name={ 'md-close-outline' } size={30} color="#969696" />
            </TouchableOpacity>
        </View>
            
        <ScrollView2
                showsVerticalScrollIndicator={ false }
        >
            <ItemSheet />
            <ItemSheet />
            <ItemSheet />
            <ItemSheet />
            <ItemSheet />
            <ItemSheet />
        </ScrollView2>

        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 5, borderTopWidth: 1, borderTopColor: '#f2f2f2' }}>
            <TouchableOpacity 
                style={ styles.buttonAddToCart }
            >
                <Text
                    style={{
                        color: violet,
                        fontSize: 15
                    }}
                >Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={ styles.buttonBuyNow }
            >
                <Text
                    style={{
                        color: '#fff',
                        fontSize: 15
                    }}
                >Mua ngay</Text>
            </TouchableOpacity>
        </View>

    </Animated.View>
</PanGestureHandler> */}

// const color = ['Black', 'White', 'yellow', 'Pink', 'Brown']

// const ItemSheet = () => {
//     return (
//         <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
//             <Text
//                 style={{ color: '#000', fontSize: 15 }}
//             >
//                 Color
//             </Text>
//             <View
//                 style={{
//                     flex: 1,
//                     flexWrap: 'wrap',
//                     flexDirection: 'row',
//                     borderBottomWidth: 1,
//                     borderBottomColor: '#f2f2f2',
//                     paddingVertical: 10
//                 }}
//             >
//                 {color.map((item, index) => (
//                     <TouchableOpacity
//                         activeOpacity={ 0.8 }
//                         style={{
//                             paddingVertical: 5,
//                             paddingHorizontal: 20,
//                             backgroundColor: '#fff',
//                             borderRadius: 3,
//                             marginRight: 10,
//                             marginVertical: 5,
//                             borderWidth: 1,
//                             borderColor: violet
//                         }}
//                     >
//                         <Text style={{ color: '#000' }}>{ item }</Text>
//                     </TouchableOpacity>
//                 ))}
//             </View>
//         </View>
//     )
// }

const button = {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 5
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabViewContainer: {
        flex: 1,
        width: WIDTH
    },
    sheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        elevation: 5,
        paddingTop: 10
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
        ...button,
        backgroundColor: 'tomato',
        // 26ab9a
    },
    buttonBuyNow: {
        ...button,
        backgroundColor: violet
    }
})

export default DetailScreen