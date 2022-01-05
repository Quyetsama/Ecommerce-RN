import React, { useState, useRef, useEffect } from "react"
import {
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Image,
    Animated,
    Dimensions,
    StatusBar,
    Button
} from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../redux/actions/authAction"
import HeaderHomeComponent from "../components/HeaderHomeComponent"
import CarouselComponent from "../components/CarouselComponent"
import FeaturesComponent from "../components/FeaturesComponent"
import ProductLimit from "../components/ProductLimitComponent"
import ProductDiscount from "../components/ProductDiscountComponent"
import Categories from "../components/CategoriesComponent"
import Products from "../components/ProductsComponent"
import { getAllProduct } from '../api/categoriesApi'


const WIDTH = Dimensions.get('window').width
const Header_Max_Height = 100
const Header_Min_Height = 60

const HomeScreen = ({ navigation }) => {

    const refCategories = useRef()
    const [index, setIndex] = useState()
    const [category, setCategory] = useState({
        id: 'all',
        page: 1
    })

    const executeScroll = (idCategory) => {
        refCategories.current.scrollTo({
            y: index.y,
            animated: true
        })
        console.log(idCategory)
        setCategory({id: idCategory, page: 1})
    }

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 1;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
    }

    const [AnimatedHeaderValue, setAnimatedHeaderValue] = useState(new Animated.Value(0))

    const animatedHeaderHeight = AnimatedHeaderValue.interpolate({
        inputRange: [0, Header_Max_Height - Header_Min_Height],
        outputRange: [Header_Max_Height, Header_Min_Height],
        extrapolate: 'clamp'
    })

    const animatedHeaderOpacityText = AnimatedHeaderValue.interpolate({
        inputRange: [0, Header_Max_Height - Header_Min_Height],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    })

    const animatedHeaderInput = AnimatedHeaderValue.interpolate({
        inputRange: [0, Header_Max_Height - Header_Min_Height],
        // margin left 20 thif phair truwf 40
        outputRange: [WIDTH - 20, WIDTH - 55],
        extrapolate: 'clamp'
    })

    // console.log(animatedHeaderHeight, animatedHeaderOpacityText, animatedHeaderInput)

    const dispatch = useDispatch()
    const userToken = useSelector(state => state.authReducer.userToken)
    const userName = useSelector(state => state.authReducer.userName)

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            {/* <StatusBar backgroundColor={color} /> */}
            {/* Header */}
            {/* <HeaderHomeComponent navigation={ navigation } /> */}
            <Animated.View style={[
                styles.headerContainer,
                {
                    height: animatedHeaderHeight
                }
            ]}>
                <Animated.Text style={[
                    styles.logo,
                    {
                        opacity: animatedHeaderOpacityText
                    }
                ]}>
                    Grabee
                </Animated.Text>
                <TouchableOpacity
                    style={styles.iconCartHeader}
                >
                    <View style={styles.iconBadge}>
                        <Text style={{ color: '#fff', fontSize: 11 }}>3</Text>
                    </View>
                    <Ionicons name={'cart-outline'} size={25} color={'#fff'} />
                </TouchableOpacity>
                <Animated.View style={{ flexDirection: 'row', width: animatedHeaderInput }}>
                    <TouchableOpacity activeOpacity={1} style={styles.inputSearchContainer}>
                        <Ionicons name={'search-outline'} size={21} color={'gray'} />
                        <TextInput editable={false} style={styles.inputSearch} placeholderTextColor={color} placeholder="Search..."></TextInput>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>


            {/* Body */}
            <ScrollView
                ref={refCategories}
                removeClippedSubviews
                nestedScrollEnabled={true}
                stickyHeaderIndices={[10]}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: AnimatedHeaderValue } } }],
                    {
                        listener: ({nativeEvent}) => {
                            if (isCloseToBottom(nativeEvent)) {
                                setCategory({...category, page: category.page + 1})
                            }
                        },
                        useNativeDriver: false 
                    }
                )}
                // showsVerticalScrollIndicator={false}
            >
                {/* <View style={ styles.bodyContainer }> */}
                {/* CarouselImage */}
                <CarouselComponent />

                {/* Features */}
                <FeaturesComponent />
                <View style={styles.underLineSection} />

                {/* ProductLimit */}
                <ProductLimit />
                <View style={styles.underLineSection} />

                {/* Discount */}
                <ProductDiscount />
                <View style={styles.underLineSection} />

                {/* CarouselImage */}
                <CarouselComponent />
                <View style={styles.underLineSection} />

                {/* Categories */}
                <Text style={{ padding: 5, fontSize: 15, fontWeight: 'bold', color: color, marginLeft: 5 }}>Danh Mục Sản Phẩm</Text>
                <Categories onLayout={(event) => {
                    const {x, y, width, height} = event.nativeEvent.layout;
                    // console.log(x, y, width, height)
                    setIndex({x, y, width, height})
                }} onPress={executeScroll} />

                {/* Product */}
                <Products category={ category } navigation={navigation} />
                
            </ScrollView>
        </View>
    )
}

const color = '#34A853'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    bodyContainer: {
        flex: 1
    },
    underLineSection: {
        width: WIDTH,
        height: 10,
        marginTop: 10,
        backgroundColor: '#f0f1f2'
    },



    headerContainer: {
        backgroundColor: color,
        justifyContent: 'flex-end',
        // flexDirection: 'row',
        // alignItems: 'center',
        paddingHorizontal: 10,
        elevation: 5
    },
    logo: {
        position: 'absolute',
        top: 5,
        left: 10,
        flex: 1,
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold'
    },
    inputSearchContainer: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 3
    },
    inputSearch: {
        flex: 1,
        color: color,
        height: 40
    },
    iconCartHeader: {
        position: 'absolute',
        top: 10,
        right: 15,
        marginLeft: 10,
        marginTop: 5
    },
    iconBadge: {
        position: 'absolute',
        bottom: 15,
        left: 13,
        zIndex: 10,
        backgroundColor: color,
        width: 19,
        height: 19,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'red'
    }
})

export default HomeScreen