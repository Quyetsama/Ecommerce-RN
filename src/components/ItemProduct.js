import React from 'react'
import { StyleSheet, TouchableOpacity, View, Dimensions, Image, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { doMain } from '../helpers/configs'


const WIDTH = Dimensions.get('window').width

const ItemProduct = ({ data, navigation }) => {

    const goToDetail = () => {
        navigation.navigate('Detail', {
            _id: data._id
        })
    }

    return (
        <TouchableOpacity style={ styles.itemContainer } activeOpacity={ 0.7 } onPress={ goToDetail }>
            <View style={ styles.imageContainer }>
                <Image
                    style={ styles.image }
                    source={{ uri: doMain + '/image/' + data.image[0] }}
                    // resizeMode='stretch'
                />
            </View>
            <View style={ styles.detailContainer }>
                <Text style={ styles.name } numberOfLines={2}>{ data.name }</Text>
                <View style={ styles.rateContainer }>
                    <MaterialCommunityIcons name={ 'star' } size={ 15 } color={ '#fff700' } />
                    <MaterialCommunityIcons name={ 'star' } size={ 15 } color={ '#fff700' } />
                    <MaterialCommunityIcons name={ 'star' } size={ 15 } color={ '#fff700' } />
                    <MaterialCommunityIcons name={ 'star' } size={ 15 } color={ '#fff700' } />
                    <MaterialCommunityIcons name={ 'star-half-full' } size={ 15 } color={ '#fff700' } />
                    <Text style={ styles.sold }> | Đã bán { data.sold }</Text>
                </View>
                <Text style={ styles.price }>{ data.price }đ</Text>
            </View>
        </TouchableOpacity>
    )
}

const color = '#34A853'
const margin = 2
const WIDTH_ITEM = (WIDTH / 2) - (margin * 2)

const styles = StyleSheet.create({
    itemContainer: {
        width: WIDTH_ITEM,
        height: 300,
        margin: margin,
        backgroundColor: '#fff',
        overflow: 'hidden'
    },
    imageContainer: {
        width: WIDTH_ITEM,
        height: 200
    },
    image: {
        flex: 1,
        width: null,
        height: null
    },
    detailContainer: {
        width: WIDTH_ITEM,
        height: 100,
        paddingHorizontal: 15,
        justifyContent: 'space-evenly'
    },
    name: {
        color: '#000',
        fontWeight: '500'
    },
    sold: {
        fontSize: 11
    },
    price: {
        fontSize: 17,
        color: 'tomato',
        fontWeight: 'bold'
    },
    rateContainer: {
        flexDirection: 'row'
    }
})

export default React.memo(ItemProduct)