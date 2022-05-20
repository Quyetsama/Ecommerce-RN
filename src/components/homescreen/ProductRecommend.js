import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import ProductItem from './ProductItem'
import { doMain } from '../../helpers/configs'
import { COLORS } from '../../theme'


const data = [
    {
        id: 1,
        name: 'Giày thể thao',
        image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        price: 500000,
        sold: 1200
    },
    {
        id: 2,
        name: 'Giày thể thao Trắng',
        image: 'https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        price: 450000,
        sold: 700
    },
    {
        id: 3,
        name: 'Giày thể thao',
        image: 'https://images.unsplash.com/photo-1603787081207-362bcef7c144?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
        price: 500000,
        sold: 1200
    },
    {
        id: 4,
        name: 'Giày thể thao',
        image: 'https://images.unsplash.com/photo-1588484628369-dd7a85bfdc38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
        price: 500000,
        sold: 1200
    },
    {
        id: 5,
        name: 'Giày thể thao',
        image: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        price: 500000,
        sold: 1200
    },
]

const ProductRecommend = () => {
    return (
        <View style={ styles.container }>
            <View style={ styles.headerContainer }>
                <Text style={ styles.title }>Recommend</Text>
                <TouchableOpacity style={ styles.button }>
                    <Text style={ styles.buttonText }>View All</Text>
                </TouchableOpacity>
            </View>

            <FlatList 
                contentContainerStyle={{ paddingLeft: 18, paddingBottom: 32 }}
                horizontal
                showsHorizontalScrollIndicator={ false }
                data={ data }
                renderItem={({ item }) => (
                    <ProductItem 
                        key={ item.id }
                        name={ item.name }
                        price={ item.price }
                        image={ item.image }
                        sold={ item.sold }
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        marginTop: 16,
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30
        borderRadius: 30
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 18
    },
    title: {
         flex: 1,
         color: '#000',
         fontSize: 22,
         fontWeight: 'bold'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.dark,
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 12
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    }
})

export default React.memo(ProductRecommend)