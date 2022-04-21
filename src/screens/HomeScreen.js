import React, { useState, useRef } from "react"
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Animated,
    Dimensions,
    StatusBar,
    Modal
} from "react-native"
import UnderLineSection from "../components/UnderLineSection"
import HeaderHomeComponent from "../components/HeaderHomeComponent"
import CarouselComponent from "../components/CarouselComponent"
import FeaturesComponent from "../components/FeaturesComponent"
import ProductLimit from "../components/ProductLimitComponent"
import ProductDiscount from "../components/ProductDiscountComponent"
import ProductRecommend from "../components/homescreen/ProductRecommend"
import Categories from "../components/CategoriesComponent"
import Products from "../components/ProductsComponent"

import ViewHeader from "../components/test/ViewHeader"
import Header from "../components/test/Header"


const WIDTH = Dimensions.get('window').width

export const SearchContext = React.createContext({})

const HomeScreen = ({ navigation }) => {

    const offset = useRef(new Animated.Value(0)).current
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
            {/* <StatusBar hidden /> */}
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'}/>
            {/* Header */}
            {/* <HeaderHomeComponent navigation={ navigation } animatedValue={ offset } /> */}
            <Header navigation={ navigation } />

            {/* Body */}
            <ScrollView
                ref={refCategories}
                showsVerticalScrollIndicator={ false }
                removeClippedSubviews
                nestedScrollEnabled={true}
                stickyHeaderIndices={[7]}
                scrollEventThrottle={0.5}
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
                
                <ViewHeader />
                {/* <CarouselComponent /> */}

                {/* Features */}
                <FeaturesComponent />
                {/* <UnderLineSection /> */}

                <ProductRecommend />
                <ProductRecommend />
                <ProductRecommend />
                {/* <UnderLineSection /> */}

                {/* ProductLimit */}
                {/* <ProductLimit />
                <UnderLineSection /> */}

                {/* Discount */}
                {/* <ProductDiscount />
                <UnderLineSection /> */}

                {/* CarouselImage */}
                <CarouselComponent />
                {/* <UnderLineSection /> */}

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