import React, { useCallback, useEffect, useState } from 'react'
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
import { useSelector } from 'react-redux'
import ItemProduct from '../../components/ItemProduct'


const FavoriteScreen = ({ navigation }) => {

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