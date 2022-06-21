import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { convertVND } from '../utils/validation'
import { useNavigation } from '@react-navigation/native'
import { doMain, SCREEN } from '../utils/configs'
import { COLORS } from '../utils'


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


const ItemProduct = ({ item, onAddToCart }) => {
    
    const navigation = useNavigation()

    return (
        <TouchableOpacity 
            style={ styles.container } 
            activeOpacity={ 0.8 } 
            onPress={() => navigation.navigate('Detail', { _id: item?._id })}
        >
            <View style={ styles.imageContainer }>
                <Image 
                    source={{ uri: doMain + '/image/' + item?.image }}
                    style={ styles.image }
                    // resizeMode='stretch'
                />
            </View>

            {
                item?.discount &&
                <View style={ styles.discountContainer }>
                    <Text style={ styles.discountTxt }>{ item?.discount }% OFF</Text>
                </View>
            }

            <View style={ styles.footerContainer }>
                <Text numberOfLines={ 1 } style={ styles.name }>{ item?.name }</Text>
                <View style={ styles.soldContainer }>
                    <Text style={ styles.soldText }>{ item?.sold } Sold</Text>
                </View>
                <View style={ styles.price_add }>
                    <Text style={ styles.price }>{ convertVND(+item?.price) }</Text>
                    <TouchableOpacity 
                        style={ styles.buttonADD }
                        onPress={() => onAddToCart(item._id)}
                    >
                        <MaterialIcons name='add' size={24} color={ COLORS.gray } />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        width: (SCREEN.WIDTH / 2) - 8,
        height: (SCREEN.WIDTH / 2) + 100,
        padding: 8,
        margin: 4,
        borderRadius: 14
    },
    imageContainer: {
        width: (SCREEN.WIDTH / 2) - 24,
        height: (SCREEN.WIDTH / 2)
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
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 6
    },
    name: {
        color: '#525252',
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

export default React.memo(ItemProduct)