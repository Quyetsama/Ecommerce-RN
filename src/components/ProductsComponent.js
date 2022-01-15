import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Dimensions, Image, Text, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import ItemProduct from './ItemProduct'
import { getAllProduct, getProductByCategory } from '../api/categoriesApi'
import { doMain } from '../helpers/configs'


const WIDTH = Dimensions.get('window').width

const Loading = () => {
    return (
        <ActivityIndicator style={{  width: WIDTH, margin: 10 }} />
    )
}

const Products = ({ category, navigation }) => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        console.log(category.page)

        getProductByCategory(category.id, category.page).then(res => {
            if(category.page === 1) {
                setProducts(res.data.products)
            }
            else {
                setProducts([...products, ...res.data.products])
            }
        })
        .catch(error => console.log(error))
        
    }, [category])

    return (
        <View removeClippedSubviews={true} style={ styles.container }>
            <ScrollView horizontal={true} scrollEnabled={false}>
                <FlatList
                    // nestedScrollEnabled={true}
                    removeClippedSubviews
                    data={products}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                    renderItem={({item}) => (
                        <ItemProduct 
                            data={ item }
                            navigation={navigation}
                        />
                    )}
                    ListFooterComponent={
                        // isLoading ? <Loading /> : <></>
                        <Loading />
                    }
                />
            </ScrollView>
            
            {/* {products.map((item, index) => (
                <ItemProduct 
                    key={ index }
                    image={ doMain + item.image[0] }
                    name={ item.name }
                    sold={ item.sold }
                    price={ item.price }
                />
            ))} */}
            {/* <Text style={{ color: 'tomato', textAlign: 'center' }}>Đang tải thêm</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f1f2',
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden'
    }
})

export default React.memo(Products)