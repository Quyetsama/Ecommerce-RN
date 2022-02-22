import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


const ProductItem = ({ name, price, image, sold }) => {
    return (
        <TouchableOpacity style={ styles.container }>
            <View style={ styles.imageContainer }>
                <Image 
                    source={{ uri: image }}
                    style={ styles.image }
                />
                <Ionicons style={ styles.iconHeart } name='heart' size={24} color='red' />
            </View>

            <View style={ styles.footerContainer }>
                <Text numberOfLines={ 1 } style={ styles.name }>{ name }</Text>
                <View style={ styles.soldContainer }>
                    <Text style={ styles.soldText }>{ sold } Sold</Text>
                </View>
                <View style={ styles.price_add }>
                    <Text style={ styles.price }>{ (+price).toLocaleString('vi', {style : 'currency', currency : 'VND'}) }</Text>
                    <TouchableOpacity style={ styles.buttonADD }>
                        <MaterialIcons name='add' size={24} color='#969696' />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 270,
        padding: 8,
        marginRight: 18,
        borderRadius: 14
    },
    imageContainer: {
        width: 150,
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
    }
})

export default React.memo(ProductItem)