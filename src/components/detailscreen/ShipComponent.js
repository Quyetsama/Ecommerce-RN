import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'



const ShipComponent = ({ transportFee }) => {
    return (
        <View style={ styles.container }>
            <View style={ styles.topContainer }>
                <View style={ styles.iconContainer }>
                    <MaterialCommunityIcons name={ 'truck-fast' } size={ 20 } color={ '#26ab97' } />
                </View>
                <View style={ styles.textContainer }>
                    <Text style={ styles.text } numberOfLines={1}>Miễn phí vận chuyển</Text>
                    <Text style={{ marginLeft: 10 }} numberOfLines={1}>Miễn phí vận chuyển cho đơn hàng trên { (300000).toLocaleString('vi', {style : 'currency', currency : 'VND'}) }</Text>
                </View>
            </View>

            <View style={ styles.topContainer }>
                <View style={ styles.iconContainer }>
                    <MaterialCommunityIcons name={ 'truck-delivery-outline' } size={ 20 } color={ '#000' } />
                </View>
                <View style={ styles.textContainer }>
                    <Text style={ styles.text } numberOfLines={1}>Phí vận chuyển: { (+transportFee).toLocaleString('vi', {style : 'currency', currency : 'VND'}) }</Text>
                </View>
            </View>

            <View style={[ styles.topContainer, { backgroundColor: '#fffaea' } ]}>
                <View style={ styles.iconContainer }>
                    <MaterialCommunityIcons name={ 'shield-check-outline' } size={ 20 } color={ 'tomato' } />
                </View>
                <View style={ styles.textContainer }>
                    <Text style={{ color: '#26ab97' }} numberOfLines={1}>Shopee Đảm Bảo</Text>
                    <Text numberOfLines={1}>3 Ngày Trả hàng / Hoàn Tiền</Text>
                </View>
            </View>
        </View>
    )
}

const color = '#34A853'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    topContainer: {
        flexDirection: 'row',
        paddingVertical: 5
    },
    iconContainer: {
        justifyContent: 'center',
        padding: 10
    },
    textContainer: {
        justifyContent: 'center'
    },
    text: {
        color: '#000'
    }
})

export default ShipComponent