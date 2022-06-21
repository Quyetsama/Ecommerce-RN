import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View, Dimensions, Image, Text, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux'
import ItemProduct from './ItemProduct'
import ProductItem from '../components/homescreen/ProductItem'
import { getAllProduct, getProductByCategory } from '../api/categoriesApi'
import { doMain } from '../utils/configs'
import { COLORS } from '../utils'


const WIDTH = Dimensions.get('window').width

const Loading = () => {
    return (
        <ActivityIndicator color={ COLORS.primary } style={{  width: WIDTH, margin: 10 }} />
    )
}

const Products = ({ navigation, onAddToCart }) => {

    const { category } = useSelector(state => state.homeReducer)

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchData()
    }, [category])

    const fetchData = async () => {
        try {
            const res = await getProductByCategory(category.id, category.page)

            if(res?.data.success) {
                if(category.page === 1) {
                    setProducts(res.data.data)
                }
                else {
                    setProducts([...products, ...res.data.data])
                }
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    return (
        <View removeClippedSubviews={true} style={ styles.container }>
            <ScrollView horizontal={true} scrollEnabled={false}>
                <FlatList
                    // nestedScrollEnabled={true}
                    removeClippedSubviews
                    scrollEnabled={ false }
                    data={products}
                    numColumns={2}
                    keyExtractor={(item) => item._id}
                    renderItem={({item}) => (
                        <ItemProduct item={ item } onAddToCart={ onAddToCart } />
                    )}
                    ListFooterComponent={
                        // isLoading ? <Loading /> : <></>
                        <Loading />
                    }
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f1f2',
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden',
        marginBottom: 60
    }
})

export default React.memo(Products)