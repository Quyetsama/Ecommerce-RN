import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { COLORS, doMain, WINDOW_WIDTH } from '../../utils'
import { useNavigation } from '@react-navigation/native'


const ProductItem = ({ item }) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity 
            style={ styles.container }
            onPress={() => navigation.navigate('Detail', { _id: item?._id })}
        >
            <View style={ styles.imageContainer }>
                <Image 
                    source={{ uri: doMain + '/image/' + item.image }}
                    style={ styles.image }
                />
                {/* <Ionicons style={ styles.iconHeart } name='heart' size={24} color='red' /> */}
            </View>

            {
                item?.discount &&
                <View style={ styles.discountContainer }>
                    <Text style={ styles.discountTxt }>{ item?.discount }% OFF</Text>
                </View>
            }

            <View style={ styles.footerContainer }>
                <Text numberOfLines={ 1 } style={ styles.name }>{ item.name }</Text>
                <View style={ styles.soldContainer }>
                    <Text style={ styles.soldText }>{ item.sold } Sold</Text>
                </View>
                <View style={ styles.price_add }>
                    <Text style={ styles.price }>{ (+item.price).toLocaleString('vi', {style : 'currency', currency : 'VND'}) }</Text>
                    <TouchableOpacity style={ styles.buttonADD }>
                        <MaterialIcons name='add' size={24} color='#969696' />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const ITEM_WIDTH = WINDOW_WIDTH / 3.5
const ITEM_HEIGHT = ITEM_WIDTH + 120

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        height: ITEM_HEIGHT,
        padding: 8,
        marginRight: 18,
        borderRadius: 14,
        elevation: 5
    },
    imageContainer: {
        width: ITEM_WIDTH,
        height: 160
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        borderRadius: 14
    },
    iconHeart: {
        position: 'absolute',
        right: 6,
        top: 6
    },
    footerContainer: {
        flex: 1,
        width: ITEM_WIDTH,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 6
    },
    name: {
        color: COLORS.primary,
        fontSize: 15,
        fontWeight: 'bold'
    },
    soldContainer: {
        backgroundColor: '#ededed',
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 6
    },
    soldText: {
        fontSize: 12,
        fontWeight: '500',
        color: 'grey'
    },
    price_add: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    price: {
        flex: 1,
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonADD: {
        borderWidth: 1,
        borderColor: '#f2f2f2',
        borderRadius: 7,
        padding: 2
    },
    discountContainer: {
        position: 'absolute',
        top: 18,
        right: 0,
        backgroundColor: COLORS.secondary,
        paddingVertical: 3,
        paddingHorizontal: 12,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12
    },
    discountTxt: {
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: 'bold'
    }
})

export default React.memo(ProductItem)