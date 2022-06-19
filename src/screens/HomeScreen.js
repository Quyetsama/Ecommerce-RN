import React, { useState, useRef, useEffect } from "react"
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Animated,
    Dimensions,
    StatusBar,
    Modal,
    RefreshControl
} from "react-native"
import { useSelector, useDispatch } from 'react-redux'
import { setRefreshing, setCategory, inceasePage } from "../redux/actions/homeAction"
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
import { COLOR } from "../utils/configs"
import { COLORS } from "../theme"


const WIDTH = Dimensions.get('window').width

export const SearchContext = React.createContext({})

const HomeScreen = ({ navigation }) => {

    const { refreshing } = useSelector(state => state.homeReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        if(refreshing) {
            dispatch(setRefreshing())
        }
    }, [refreshing])

    const reFreshData = async () => {
        dispatch(setRefreshing())
    }

    const offset = useRef(new Animated.Value(0)).current
    const refCategories = useRef()
    const [scrollY, setScrollY] = useState()


    const executeScroll = (idCategory) => {
        refCategories.current.scrollTo({
            y: scrollY,
            animated: true
        })
        
        dispatch(setCategory(idCategory, 1))
        // setCategory({id: idCategory, page: 1})
    }

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 1;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
    }

    return (
        <View style={styles.container}>
            {/* <StatusBar hidden /> */}
            <StatusBar hidden translucent backgroundColor={'transparent'} barStyle={'light-content'}/>
            {/* Header */}
            {/* <HeaderHomeComponent navigation={ navigation } animatedValue={ offset } /> */}
            <Header navigation={ navigation } />

            {/* Body */}
            <ScrollView
                ref={refCategories}
                showsVerticalScrollIndicator={ false }
                removeClippedSubviews
                nestedScrollEnabled={true}
                stickyHeaderIndices={[2]}
                scrollEventThrottle={0.5}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    {
                        listener: ({nativeEvent}) => {
                            if (isCloseToBottom(nativeEvent)) {
                                dispatch(inceasePage())
                                // setCategory({...category, page: category.page + 1})
                            }
                        },
                        useNativeDriver: false 
                    }
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={ refreshing }
                        onRefresh={ reFreshData }
                    />
                }
            >
                
                {/* <ViewHeader /> */}
                <CarouselComponent />


                <ProductRecommend />
                {/* <ProductRecommend />
                <ProductRecommend /> */}

                {/* Categories */}
                {/* <Text style={{ padding: 5, fontSize: 15, fontWeight: 'bold', color: COLORS.dark, marginLeft: 5 }}>Danh Mục Sản Phẩm</Text> */}
                <Categories onLayout={(event) => {
                    const {x, y, width, height} = event.nativeEvent.layout;
                    setScrollY(y)
                }} onPress={executeScroll} />

                {/* Product */}
                <Products navigation={navigation} />
                
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