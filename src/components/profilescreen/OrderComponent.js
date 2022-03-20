import React from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ItemProfile from "./ItemProfileComponent"


const WIDTH = Dimensions.get('window').width

const OrderComponent = ({ onHistory }) => {
    return (
        <View style={ styles.container }>
            <ItemProfile icon={'history'} label={'Đơn Hàng'} txtDetail={'Xem lịch sử mua hàng'} onPress={ onHistory } />
            
            <View style={ styles.progerssContainer }>
                <View style={ styles.itemProgress }>
                    {/* card-account-phone-outline  clock-check-outline  credit-card-clock-outline */}
                    <MaterialCommunityIcons name={'credit-card-clock-outline'} size={30} color={color} />
                    <Text style={ styles.text }>Chờ xác nhận</Text>
                </View>
                <View style={ styles.itemProgress }>
                    <MaterialCommunityIcons name={'archive-outline'} size={30} color={color} />
                    <Text style={ styles.text }>Chờ lấy hàng</Text>
                </View>
                <View style={ styles.itemProgress }>
                    <MaterialCommunityIcons name={'truck-check-outline'} size={30} color={color} />
                    <Text style={ styles.text }>Đang giao</Text>
                </View>
                <View style={ styles.itemProgress }>
                    <MaterialCommunityIcons name={'star-circle-outline'} size={30} color={color} />
                    <Text style={ styles.text }>Đánh giá</Text>
                </View>
            </View>
        </View>
    )
}

const color = '#021961'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    progerssContainer: {
        flex: 1,
        width: WIDTH,
        height: WIDTH / 4,
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#ededed'
    },
    itemProgress: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 11,
        color: '#969696',
        marginTop: 15
    }
})

export default OrderComponent