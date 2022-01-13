import React from 'react'
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const ShopComponent = () => {
    return (
        <View style={ styles.container }>
            <View style={ styles.topContainer }>
                <View style={ styles.avatarContainer }>
                    <Image 
                        style={ styles.avatar }
                        source={{ uri: 'https://prod5.assets-cdn.io/event/7329/assets/8367866153-bb5f6325cc.jpg' }}
                    />
                </View>
                <View style={ styles.infoShopContainer }>
                    <Text style={ styles.shopName }>Quyết Sama</Text>
                    <View style={ styles.address_phone }>
                        <MaterialCommunityIcons name={ 'map-marker-outline' } size={ 14 } color={ 'gray' } />
                        <Text> Hưng Yên</Text>
                    </View>
                    <View style={ styles.address_phone }>
                        <MaterialCommunityIcons name={ 'phone-outline' } size={ 14 } color={ 'gray' } />
                        <Text> 0867985106</Text>
                    </View>
                </View>
                <View style={ styles.viewShop }>
                    <TouchableOpacity style={ styles.btnViewShop }>
                        <Text style={ styles.textViewShop }>Xem Shop</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={ styles.botContainer }>
                <Text style={ styles.text }><Text style={{ color: 'tomato' }}>20</Text> Sản phẩm</Text>
                <Text style={ styles.text }><Text style={{ color: 'tomato' }}>4.8</Text> Đánh giá</Text>
                <Text style={ styles.text }><Text style={{ color: 'tomato' }}>94%</Text> Phản hồi Chat</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    topContainer: {
        flexDirection: 'row'
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 90,
        overflow: 'hidden'
    },
    avatar: {
        flex: 1,
        width: null,
        height: null
    },
    infoShopContainer: {
        flex: 1,
        marginLeft: 10
    },
    shopName: {
        color: '#000'
    },
    address_phone: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewShop: {
        justifyContent: 'center'
    },
    btnViewShop: {
        borderWidth: 1,
        borderColor: 'tomato',
        borderRadius: 2,
        paddingHorizontal: 10
    },
    textViewShop: {
        color: 'tomato',
        padding: 3
    },

    botContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    text: {
        color: '#000',
        textAlign: 'center',
        marginRight: 10
    }
})

export default ShopComponent