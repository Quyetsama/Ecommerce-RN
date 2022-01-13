import React, { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Discount from "../DiscountComponent"


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const kFormatter = (num) => {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

const GeneralComponent = ({ name, discount, price, sold }) => {
    const [favorite, setFavorite] = useState(false)

    const handleFavorite = () => {
        setFavorite(!favorite)
    }

    return ( 
        <View style={ styles.name_discount_price_rate_sold_favorite }>
            <View style={ styles.name_discount_Container }>
                <View style={ styles.textContainer }>
                    <Text style={ styles.nameProduct } numberOfLines={ 2 }>{ name } { name } { name } { name }</Text>                
                </View>
                <Discount percent={ 22 } />
            </View>

            <View>
                <Text style={ styles.newPrice }>{ price.toLocaleString('vi', {style : 'currency', currency : 'VND'}) }</Text>
                <Text style={ styles.oldPrice }>{ price.toLocaleString('vi', {style : 'currency', currency : 'VND'}) }</Text>
            </View>

            <View style={ styles.rate_sold_favorite_Container }>
                <View style={ styles.rate_sold_favorite_left }>
                    <MaterialCommunityIcons name={ 'star' } size={ 20 } color={ '#f7ed2a' } />
                    <MaterialCommunityIcons name={ 'star' } size={ 20 } color={ '#f7ed2a' } />
                    <MaterialCommunityIcons name={ 'star' } size={ 20 } color={ '#f7ed2a' } />
                    <MaterialCommunityIcons name={ 'star' } size={ 20 } color={ '#f7ed2a' } />
                    <MaterialCommunityIcons name={ 'star-half-full' } size={ 20 } color={ '#f7ed2a' } />

                    <View style={{ paddingHorizontal: 10 }}>
                        <Text>4.2</Text>
                    </View>

                    <View style={{ height: '80%',width: 1,backgroundColor: '#909090' }} />

                    <View style={{ paddingHorizontal: 10 }}>
                        <Text>Đã bán { kFormatter(sold) }</Text>
                    </View>         
                </View>

                <View style={ styles.rate_sold_favorite_right }>
                    <TouchableOpacity activeOpacity={ 0.5 } onPress={ handleFavorite }>
                        <MaterialCommunityIcons name={ favorite ? 'heart' : 'heart-outline' } size={ 20 } color={ favorite ? 'tomato' : 'gray' } />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    name_discount_price_rate_sold_favorite: {
        backgroundColor: '#fff',
        paddingHorizontal: 10
    },
    name_discount_Container: {
        flexDirection: 'row',
        marginVertical: 5
    },
    textContainer: {
        flex: 1,
        marginRight: 50
    },
    nameProduct: {
        color: '#000',
        fontSize: 15
    },
    newPrice: {
        color: 'tomato',
        fontSize: 17,
        fontWeight: '500'
    },
    oldPrice: {
        textDecorationLine: 'line-through'
    },
    rate_sold_favorite_Container: {
        flexDirection: 'row',
        marginVertical: 10
    },
    rate_sold_favorite_left: {
        flex: 1,
        flexDirection: 'row'
    },
    rate_sold_favorite_right: {
        flexDirection: 'row',
        marginHorizontal: 10
    }
})

export default GeneralComponent