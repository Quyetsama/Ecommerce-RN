import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    StatusBar,
    Platform,
    FlatList,
    ActivityIndicator,
    useWindowDimensions,
    Keyboard,
    Image
} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { COLORS, URL_API, WINDOW_WIDTH, WINDOW_HEIGHT } from '../../utils'
import ItemProduct from '../../components/ItemProduct'
import { relatedProduct, sellingProduct, sortPriceProduct } from '../../api/productApi'
import useBackButton from '../../hooks/useBackButton'
import useFetchProducts from '../../hooks/useFetchProducts'
import LoadingModal from '../../components/modal/LoadingModal'
import notFoundIMG from '../../assets/images/notFound.png'

import Animated, { 
    useAnimatedGestureHandler,
    useSharedValue,
    useAnimatedStyle,
    withSpring
} from 'react-native-reanimated'
import { PanGestureHandler, GestureHandlerRootView, ScrollView as ScrollView2 } from 'react-native-gesture-handler'
import DrawerFilter from './DrawerFilter'

import { useDispatch } from 'react-redux'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { actionOpenBottomSheet, clearBottomSheet } from '../../redux/actions/bottomSheetAction'
import SheetContent from '../../components/bottomsheet/SheetContent'


const SPRING_CONFIG = {
    damping: 10,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
    stiffness: 100
}


const SearchBar = React.memo(({ value, onPress, onFilter, goBack }) => {

    return (
        <View style={ styles.searchBar }>
            <TouchableOpacity
                style={ styles.backButton }
                onPress={ goBack }
            >
                <Feather name={'corner-down-left'} size={24} color={ COLORS.primary } />
            </TouchableOpacity>
            <TouchableOpacity 
                style={ styles.inputContainer }
                onPress={ onPress }
            >
                <Ionicons name={'search'} size={21} color={'#969696'} />
                <TextInput
                    editable={ false }
                    value={ value }
                    style={ styles.searchInput }
                    placeholder='Search...'
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={ styles.backButton }
                onPress={ onFilter }
            >
                <Feather name={'filter'} size={24} color={ COLORS.primary } />
            </TouchableOpacity>
        </View>
    )
})

const SectionFilter = React.memo(({ select, onPress }) => {
    return (
        <View style={ styles.sectionFilter }>
            <TouchableOpacity
                disabled={ select === 1 }
                style={ styles.filterButton } 
                onPress={() => onPress(1)} 
                activeOpacity={ 0.5 }
            >
                <Text style={{ color: select === 1 ? COLORS.primary : COLORS.gray }}>Related</Text>
                {
                    select === 1 && <Indicator />
                }
            </TouchableOpacity>

            <View style={ styles.separatorVertical } />

            <TouchableOpacity
                disabled={ select === 2 }
                style={ styles.filterButton } 
                onPress={() => onPress(2)} 
                activeOpacity={ 0.5 }
            >
                <Text style={{ color: select === 2 ? COLORS.primary : COLORS.gray }}>Selling</Text>
                {
                    select === 2 && <Indicator />
                }
            </TouchableOpacity>

            <View style={ styles.separatorVertical } />

            <TouchableOpacity
                style={ styles.filterButton } 
                onPress={() => {
                    if(select !== 3) {
                        onPress(3)
                    }
                    else if(select === 3) {
                        onPress(4)
                    }
                }} 
                activeOpacity={ 0.5 }
            >
                <View style={{ 
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text style={{ color: (select === 3 || select === 4) ? COLORS.primary : COLORS.gray, paddingRight: 6 }}>Price</Text>
                    {
                        select === 3
                        ? <FontAwesome5 name={'long-arrow-alt-up'} size={14} color={ COLORS.primary } />
                        : select === 4
                        ? <FontAwesome5 name={'long-arrow-alt-down'} size={14} color={ COLORS.primary } />
                        : <FontAwesome5 name={'sort'} size={14} color={ COLORS.gray } />
                    }
                </View>
                {
                    (select === 3 || select === 4) && <Indicator />
                }
            </TouchableOpacity>
        </View>
    )
})

const Indicator = () => {
    return (
        <View style={ styles.indicator } />
    )
}

const Coating = ({ styleWidth, handleCloseSheet }) => {
    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    height: WINDOW_HEIGHT,
                    backgroundColor: 'rgba(52, 52, 52, 0.3)',
                    zIndex: 10
                },
                styleWidth
            ]}
            onStartShouldSetResponder={ handleCloseSheet }
        >
        </Animated.View>
    )
}

const SearchResult = ({ route, navigation }) => {

    const dispatch = useDispatch()
    const [select, setSelect] = useState(1)
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [stop, setStop] = useState(false)
    const [filters, setFilters] = useState({
        // price: {
        //     "min": '',
        //     "max": ''
        // },
        min: '',
        max: '',
        category: ''
    })
    const [isLoading, setIsLoading] = useState(true)


    useBackButton(() => {
        navigation.navigate('Home')
        return true
    })

    useEffect(() => {
        const timeOut = setTimeout(() => {
            fetchProducts()
        }, 50)
        
        return () => clearTimeout(timeOut)
    }, [select, page, stop])

    const fetchProducts = async () => {
        try {
            const res = (
                select === 1 
                ? await relatedProduct(route.params.query, page, filters)
                : select === 2
                ? await sellingProduct(route.params.query, page, filters)
                : await sortPriceProduct(route.params.query, page, select === 3 ? 'asc' : 'desc', filters)
            )
            if(res?.data.data.length <= 0) {
                setIsLoading(false)
                setStop(true)
                return
            }
            setProducts(prev => [...prev, ...res.data.data])
            setIsLoading(false)
        }
        catch(error) {
            console.log(error.response.data)
        }
    }

    const handleFilterSection = React.useCallback((value) => {
        setIsLoading(true)
        setSelect(value)
        setProducts([])
        setPage(1)
        setStop(false)
    }, [select, products, page, stop, isLoading])

    const handleOnEndReached = () => {
        if(!stop) setPage(page + 1)
    }

    const goToDetail = React.useCallback((_id) => {
        navigation.navigate('Detail', {
            _id
        })
    }, [])

    const handleChangeFilter = React.useCallback(({ min, max, category }) => {
        handleCloseSheet()
        setTimeout(() => {
            setFilters({
                ...filters,
                min,
                max,
                category
            })
            handleFilterSection(1)
        }, 100)   
    }, [filters])

    const dimensions = useWindowDimensions()

    const left = useSharedValue(
        dimensions.width
    )

    const style = useAnimatedStyle(() => {
        return {
            left: left.value,
        }
    })
    
    const styleCoating = useAnimatedStyle(() => {
        return {
            width: left.value === WINDOW_WIDTH ? 0 : WINDOW_WIDTH
        }
    })

    const gestureHandler = useAnimatedGestureHandler({
        onStart(_, context) {
            context.startLeft = left.value
        },
        onActive(event, context) {
            if((context.startLeft + event.translationX) < (dimensions.width / 3)) {
                return
            }
            left.value = withSpring(
                context.startLeft + event.translationX,
                SPRING_CONFIG
            )
        },
        onEnd() {
            if(left.value > dimensions.width / 2 + 50) {
                left.value = withSpring(
                    dimensions.width,
                    SPRING_CONFIG
                )
            }
            else {
                left.value = withSpring(
                    dimensions.width / 3,
                    SPRING_CONFIG
                )
            }
        }
    })

    const handleShowSheet = React.useCallback(() => {
        left.value = withSpring(
            dimensions.width / 3,
            SPRING_CONFIG
        )
    }, [])

    const handleCloseSheet = React.useCallback(() => {
        Keyboard.dismiss()
        left.value = withSpring(
            dimensions.width,
            SPRING_CONFIG
        )
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

    return (
        <View style={ styles.container }>
            <StatusBar translucent barStyle='dark-content' />
            <View style={ styles.headerContainer }>
                <SearchBar
                    value={ route.params.query }
                    onPress={() => navigation.push('Search', { query: route.params.query })}
                    onFilter={ handleShowSheet }
                    goBack={() => {
                        navigation.navigate('Home')
                    }}
                />
                <SectionFilter select={ select } onPress={ handleFilterSection } />
            </View>
            
            {
                products.length === 0
                ?
                <Image
                    style={ styles.notFound }
                    source={ notFoundIMG }
                />
                :
                <View style={ styles.productContainer }>
                    <FlatList
                        removeClippedSubviews
                        data={ products }
                        numColumns={2}
                        keyExtractor={(item, index) => item._id}
                        renderItem={({item}) => (
                            <ItemProduct
                                item={ item }
                                onAddToCart={ handleOpenSheet }
                            />
                        )}
                        onEndReached={ handleOnEndReached }
                        onEndReachedThreshold={ 0.3 }
                    />
                </View>
            }
            

            <Coating 
                styleWidth={ styleCoating }
                handleCloseSheet={ handleCloseSheet }
            />

            <DrawerFilter 
                onGestureEvent={ gestureHandler } 
                style={ style }
                onChangeFilter={ handleChangeFilter }
                value={ filters }
            />

            <Modal
                transparent={ true }
                animationType='fade'
                visible={ isLoading }
                onRequestClose={() => navigation.navigate('Home') }
            >
                <LoadingModal />
            </Modal>

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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    searchBar: {
        
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
        paddingVertical: 8
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 12,
        paddingHorizontal: 12
    },
    searchInput: {
        flex: 1,
        color: COLORS.primary,
        paddingHorizontal: 8,
        padding: 6
    },
    backButton: {
        marginHorizontal: 18
    },
    sectionFilter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderColor: '#f2f2f2'
    },
    filterButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 4,
        paddingBottom: 12,
        borderRadius: 15
    },
    separatorVertical: {
        width: 0.7,
        height: '50%',
        alignSelf: 'center',
        backgroundColor: '#969696'
    },
    headerContainer: {
        borderBottomWidth: 0.5,
        borderColor: '#f2f2f2'
    },
    indicator: {
        position: 'absolute',
        bottom: 0,
        width: WINDOW_WIDTH / 3,
        height: 2.6,
        backgroundColor: COLORS.primary
    },
    productContainer: {
        flex: 1,
        backgroundColor: '#f0f1f2',
        flexDirection: 'row'
    },
    notFound: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginTop: 20
    }
})

export default SearchResult