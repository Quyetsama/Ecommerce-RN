import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import ProductItem from './ProductItem'
import { COLORS } from '../../utils'
import useFetchSuggest from '../../hooks/useFetchSuggest'



const ProductRecommend = ({ onAddToCart }) => {

    const products = useFetchSuggest()

    return (
        <View style={ styles.container }>
            {products.length > 0 &&
                <>
                    <View style={ styles.headerContainer }>
                        <Text style={ styles.title }>Recommend</Text>
                        <TouchableOpacity style={ styles.button }>
                            <Text style={ styles.buttonText }>View All</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList 
                        contentContainerStyle={{ paddingLeft: 18, paddingBottom: 18 }}
                        horizontal
                        showsHorizontalScrollIndicator={ false }
                        data={ products }
                        renderItem={({ item }) => (
                            <ProductItem 
                                item={ item }
                                onAddToCart={ onAddToCart }
                            />
                        )}
                    />
                </>
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
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
        backgroundColor: COLORS.primary,
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