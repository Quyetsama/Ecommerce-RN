import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const WIDTH = Dimensions.get('window').width

const ItemProductDiscount = ({ image, name, discount }) => {
    return (
        <TouchableOpacity style={ styles.itemContainer } activeOpacity={ 0.7 }>
            <View style={ styles.imageContainer }>
                <Image
                    style={ styles.image }
                    source={{ uri: image }}
                    resizeMode='stretch'
                />
            </View>
            <View style={ styles.detailContainer }>
                <Text numberOfLines={2} style={ styles.name }>
                    <MaterialCommunityIcons name={ 'shield-check' } size={ 20 } color={ color } />
                    {' '}
                    { name }
                </Text>
                <View style={ styles.discountContainer }>
                    <Text numberOfLines={1} style={ styles.textDiscount } >{ discount }</Text>
                </View>
            </View>
        </TouchableOpacity>       
    )
}

const color = '#34A853'
const WIDTH_ITEM = (WIDTH) / 3

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#f5f7fa',
        borderColor: '#f0f1f2',
        borderWidth: 1,
        marginLeft: 10
        // marginHorizontal: 10
    },
    imageContainer: {
        width: WIDTH_ITEM,
        height: 120
    },
    image: {
        flex: 1,
        width: null,
        height: null
    },
    detailContainer: {
        width: WIDTH_ITEM,
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 5
    },
    name: {
        color: '#000',
        fontSize: 14,
        marginTop: 3
    },
    discountContainer: {
        borderWidth: 0.5,
        borderColor: color,
        marginBottom: 5
    },
    textDiscount: {
        textAlign: 'center',
        fontSize: 10,
        color: color,
        // paddingVertical: 2,
        paddingHorizontal: 5
    }
})

export default ItemProductDiscount