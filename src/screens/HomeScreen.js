import React, { useState, useRef, useEffect, useCallback, useMemo } from "react"
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Animated,
    Dimensions,
    StatusBar,
    Modal,
    RefreshControl,
    TouchableOpacity
} from "react-native"
import { useSelector, useDispatch } from 'react-redux'
import { setRefreshing, setCategory, inceasePage } from "../redux/actions/homeAction"
import CarouselComponent from "../components/CarouselComponent"
import ProductRecommend from "../components/homescreen/ProductRecommend"
import Categories from "../components/CategoriesComponent"
import Products from "../components/ProductsComponent"
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { actionOpenBottomSheet, clearBottomSheet } from "../redux/actions/bottomSheetAction"
import CustomBackdrop from "../components/bottomsheet/CustomBackdrop"
import SheetContent from "../components/bottomsheet/SheetContent"

import ViewHeader from "../components/test/ViewHeader"
import Header from "../components/test/Header"
import CarouselHome from "../components/CarouselHome"

import BottomSheetProduct from '../components/bottomsheet/BottomSheetProduct'
import { COLORS } from "../utils"



const HomeScreen = ({ navigation, route }) => {

    const { refreshing } = useSelector(state => state.homeReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        if(refreshing) {
            dispatch(setRefreshing())
        }
    }, [refreshing])

    const reFreshData = useCallback(async () => {
        dispatch(setRefreshing())
    }, [])

    const offset = useRef(new Animated.Value(0)).current
    const refCategories = useRef()
    const [scrollY, setScrollY] = useState()


    const executeScroll = useCallback((idCategory) => {
        refCategories.current.scrollTo({
            y: scrollY,
            animated: true
        })
        
        dispatch(setCategory(idCategory, 1))
        // setCategory({id: idCategory, page: 1})
    }, [scrollY])

    const isCloseToBottom = useCallback(({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 1;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
    }, [])


    // ref
    const bottomSheetRef = useRef(null);

    // variables
    // const snapPoints = useMemo(() => ['50%'], []);
    const snapPoints = useMemo(() => ['70%', '70%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        // console.log('handleSheetChanges', index);
        // if(index === 1) {
        //     dispatch(actionSetLoadingBottomSheet())
        // }
        if(index === -1) {
            dispatch(clearBottomSheet())
        }
    }, [])

    // renders
    const renderBackdrop = useCallback(props => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={1}
            pressBehavior={'close'}
        />
    ), [])

    const handleOpenSheet = useCallback((_id) => {
        bottomSheetRef.current?.present()
        dispatch(actionOpenBottomSheet(_id))
    }, [])

    // const refBottomSheet = React.createRef()

    // const handleOpenSheet = (_id) => {
    //     refBottomSheet.current?.handleOpenSheet(_id)
    // }

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
                <CarouselHome />

                <ProductRecommend onAddToCart={ handleOpenSheet }/>

                {/* Categories */}
                <Categories onLayout={(event) => {
                    const {x, y, width, height} = event.nativeEvent.layout;
                    setScrollY(y)
                }} onPress={executeScroll} />

                {/* Product */}
                <Products navigation={navigation} onAddToCart={ handleOpenSheet } />
                
            </ScrollView>

            <BottomSheetModal
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                // enableOverDrag={ false }
                enablePanDownToClose
                backdropComponent={renderBackdrop}
                onChange={handleSheetChanges}
            >
                <SheetContent />
            </BottomSheetModal>

            {/* <BottomSheetProduct ref={ refBottomSheet } /> */}

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    }
})

export default HomeScreen