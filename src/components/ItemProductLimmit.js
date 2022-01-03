import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView } from "react-native"


const WIDTH = Dimensions.get('window').width

const ItemProductLimit = ({ image, name, price, percent, sold, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={ styles.itemContainer } activeOpacity={ 0.7 }>
            <View style={ styles.imageContainer }>
                <Image
                    style={ styles.image }
                    source={{ uri: image }}
                    resizeMode='stretch'
                />
            </View>
            <View style={ styles.detailContainer }>
                <Text numberOfLines={1} style={ styles.name }>{ name }</Text>
                <Text numberOfLines={1} style={ styles.price }>{ price }đ</Text>
                <View style={ styles.processBar }>
                    <View style={{...styles.percentProcess, width: percent + '%'}} />
                    <Text style={ styles.textSold } >{ sold } ĐÃ BÁN</Text>
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
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    name: {
        color: '#000',
        fontSize: 14
    },
    price: {
        color: color,
        fontSize: 15,
        fontWeight: 'bold'
    },
    processBar: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#ebeced',
        borderRadius: 15,
        overflow: 'hidden'
    },
    percentProcess: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: color,
        // width: '100%',
        height: '100%'
    },
    textSold: {
        textAlign: 'center',
        fontSize: 10,
        fontWeight: 'bold',
        color: '#fff',
        paddingVertical: 2
    }
})

export default ItemProductLimit