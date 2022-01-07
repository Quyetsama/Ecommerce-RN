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

const HomeScreen = ({ navigation }) => {

    const offset = useRef(new Animated.Value(0)).current
    const dispatch = useDispatch()
    const userToken = useSelector(state => state.authReducer.userToken)
    const userName = useSelector(state => state.authReducer.userName)
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

    

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            {/* <StatusBar backgroundColor={color} /> */}
            {/* Header */}
            <HeaderHomeComponent navigation={ navigation } animatedValue={ offset } />


            {/* Body */}
            <ScrollView
                ref={refCategories}
                removeClippedSubviews
                nestedScrollEnabled={true}
                stickyHeaderIndices={[10]}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    {
                        listener: ({nativeEvent}) => {
                            if (isCloseToBottom(nativeEvent)) {
                                setCategory({...category, page: category.page + 1})
                            }
                        },
                        useNativeDriver: false 
                    }
                )}
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
    }
})

export default HomeScreen