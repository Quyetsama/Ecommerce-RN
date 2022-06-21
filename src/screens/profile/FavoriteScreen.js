import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    RefreshControl
} from 'react-native'
import StackHeader from '../../components/headers/StackHeader'
import { getFavorites } from '../../api/productApi'
import { useSelector, useDispatch } from 'react-redux'
import ItemProduct from '../../components/ItemProduct'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import SheetContent from '../../components/bottomsheet/SheetContent'
import { actionOpenBottomSheet, clearBottomSheet } from '../../redux/actions/bottomSheetAction'


const FavoriteScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const { userToken } = useSelector(state => state.authReducer)
    const [products, setProdcuts] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = useCallback(async () => {
        try {
            setRefreshing(true)
            const res = await getFavorites(userToken)
            if(res?.data?.success) {
                setProdcuts([...res.data.data])
                setRefreshing(false)
            }
        }
        catch(error) {
            console.log(error)
            setRefreshing(false)
        }
    }, [userToken])

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
            <StackHeader 
                label={'Favorites'} 
                hideElevation
            />

            <View style={ styles.productContainer }>
                <FlatList
                    contentContainerStyle={{ paddingVertical: 10 }}
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
                    refreshControl={
                        <RefreshControl
                            refreshing={ refreshing }
                            onRefresh={ fetchData }
                        />
                    }
                />
            </View>

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
        flex: 1
    },
    productContainer: {
        flex: 1,
        backgroundColor: '#f0f1f2',
        flexDirection: 'row'
    },
})

export default FavoriteScreen