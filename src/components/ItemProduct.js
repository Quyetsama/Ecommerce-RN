// import React from 'react'
// import { StyleSheet, TouchableOpacity, View, Dimensions, Image, Text } from 'react-native'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import { doMain } from '../helpers/configs'


// const WIDTH = Dimensions.get('window').width

// const ItemProduct = ({ data, navigation }) => {

//     const goToDetail = () => {
//         navigation.navigate('Detail', {
//             _id: data._id
//         })
//     }

//     return (
//         <TouchableOpacity style={ styles.itemContainer } activeOpacity={ 0.7 } onPress={ goToDetail }>
//             <View style={ styles.imageContainer }>
//                 <Image
//                     style={ styles.image }
//                     source={{ uri: doMain + '/image/' + data.image[0] }}
//                     // resizeMode='stretch'
//                 />
//             </View>
//             <View style={ styles.detailContainer }>
//                 <Text style={ styles.name } numberOfLines={2}>{ data.name }</Text>
//                 <View style={ styles.rateContainer }>
//                     <MaterialCommunityIcons name={ 'star' } size={ 15 } color={ '#fff700' } />
//                     <MaterialCommunityIcons name={ 'star' } size={ 15 } color={ '#fff700' } />
//                     <MaterialCommunityIcons name={ 'star' } size={ 15 } color={ '#fff700' } />
//                     <MaterialCommunityIcons name={ 'star' } size={ 15 } color={ '#fff700' } />
//                     <MaterialCommunityIcons name={ 'star-half-full' } size={ 15 } color={ '#fff700' } />
//                     <Text style={ styles.sold }> | Đã bán { data.sold }</Text>
//                 </View>
//                 <Text style={ styles.price }>{ data.price }đ</Text>
//             </View>
//         </TouchableOpacity>
//     )
// }

// const color = '#34A853'
// const margin = 2
// const WIDTH_ITEM = (WIDTH / 2) - (margin * 2)

// const styles = StyleSheet.create({
//     itemContainer: {
//         width: WIDTH_ITEM,
//         height: 300,
//         margin: margin,
//         backgroundColor: '#fff',
//         overflow: 'hidden'
//     },
//     imageContainer: {
//         width: WIDTH_ITEM,
//         height: 200
//     },
//     image: {
//         flex: 1,
//         width: null,
//         height: null
//     },
//     detailContainer: {
//         width: WIDTH_ITEM,
//         height: 100,
//         paddingHorizontal: 15,
//         justifyContent: 'space-evenly'
//     },
//     name: {
//         color: '#000',
//         fontWeight: '500'
//     },
//     sold: {
//         fontSize: 11
//     },
//     price: {
//         fontSize: 17,
//         color: 'tomato',
//         fontWeight: 'bold'
//     },
//     rateContainer: {
//         flexDirection: 'row'
//     }
// })

// export default React.memo(ItemProduct)












import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


const ItemProduct = ({ _id, name, price, image, sold, goToDetail }) => {

    return (
        <TouchableOpacity style={ styles.container } activeOpacity={ 0.8 } onPress={ goToDetail }>
            <View style={ styles.imageContainer }>
                <Image 
                    source={{ uri: image }}
                    style={ styles.image }
                    // resizeMode='stretch'
                />
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
        width: (WIDTH / 2) - 8,
        height: 300,
        padding: 8,
        margin: 4,
        borderRadius: 14
    },
    imageContainer: {
        width: (WIDTH / 2) - 24,
        height: 200
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

export default React.memo(ItemProduct)