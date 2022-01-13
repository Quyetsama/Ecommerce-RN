import React, { useRef, useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView, TextInput, Animated } from "react-native"
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


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const kFormatter = (num) => {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

const DetailScreen = ({ route, navigation }) => {

    const { image, name, sold, price }  = route.params.product
    const offset = useRef(new Animated.Value(0)).current

    return (
        <View style={ styles.container }>
            <HeaderDetailProdcut navigation={ navigation } animatedValue={ offset } />

            <ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    {
                        useNativeDriver: false 
                    }
                )}
            >
                {/* Carousel */}
                <CarouselProduct images={ image } />
                
                {/* General */}
                <GeneralComponent name={ name } price={ price } sold={ sold } />
                <UnderLineSection />

                {/* Ship */}
                <ShipComponent />
                <UnderLineSection />

                {/*  */}
                <TypeProductComponent />
                <UnderLineSection />

                {/*  */}
                <ShopComponent />
                <UnderLineSection />

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    name_discount_price_rate_sold_favorite: {
        backgroundColor: '#fff',
        paddingHorizontal: 10
    },
    name_discount_Container: {
        flexDirection: 'row',
        marginVertical: 5
    },
    textContainer: {
        flex: 1,
        marginRight: 50
    },
    nameProduct: {
        color: '#000',
        fontSize: 15
    },
    newPrice: {
        color: 'tomato',
        fontSize: 17,
        fontWeight: '500'
    },
    oldPrice: {
        textDecorationLine: 'line-through'
    },
    rate_sold_favorite_Container: {
        flexDirection: 'row',
        marginVertical: 10
    },
    rate_sold_favorite_left: {
        flex: 1,
        flexDirection: 'row'
    },
    rate_sold_favorite_right: {
        flexDirection: 'row',
        marginHorizontal: 10
    }
})

export default DetailScreen