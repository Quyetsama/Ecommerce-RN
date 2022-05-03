import React from 'react'
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native'
import success from '../assets/img/success.png'
import { violet } from '../helpers/configs'



const convertVND = (value) => {
    return (value).toLocaleString('vi', {style : 'currency', currency : 'VND'})
}

const Item = ({ title, money }) => {
    return (
        <View style={ styles.item }>
            <Text style={[ styles.textDetail, { flex: 1 } ]}>{ title }</Text>
            <Text style={ styles.textDetail }>{ money }</Text>
        </View>
    )
}

const SuccessScreen = ({ route, navigation }) => {

    const { bill } = route.params

    return (
        <View style={ styles.container }>
            <View style={ styles.top }>
                <Image
                    style={ styles.image }
                    source={ success }
                    />
                <Text style={ styles.success }>Order Successful</Text>
                <Text style={[ styles.success, { fontSize: 14 } ]}>Thank you for your purchase!</Text>
            </View>
            <View style={ styles.detail }>
                <Item title={'Price'} money={convertVND(bill?.price)} />
                <Item title={'Shipping Fee'} money={convertVND(bill?.transportFee)} />
                <Item title={'Discount'} money={convertVND(bill?.discount)} />
                <View style={ styles.separator }></View>
                <Item title={'Total'} money={convertVND(bill?.total)} />
            </View>
            <View style={ styles.buttonContainer }>
                <TouchableOpacity style={ styles.button } onPress={() => {
                    navigation.navigate('Home')
                    // navigation.goBack()
                }}>
                    <Text style={ styles.txtButton }>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.button } onPress={() => {
                        // navigation.goBack()
                        // navigation.navigate('tabProfile', { screen: 'HistoryStack' })
                        // navigation.navigate('History')
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'HistoryStack'}]
                        })
                    }
                }>
                    <Text style={ styles.txtButton }>Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        // alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 18
    },
    image: {
        width: 165,
        height: 165
    },
    success: {
        color: '#9087e8',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 12
    },
    top: {
        alignItems: 'center'
    },
    detail: {
        width: '100%',
        backgroundColor: 'rgba(144, 135, 232, 0.15)',
        padding: 24,
        borderRadius: 18
    },
    item: {
        flexDirection: 'row',
        paddingVertical: 8
    },
    separator: {
        width: '100%',
        height: 2,
        backgroundColor: '#9087e8',
        marginVertical: 8
    },
    textDetail: {
        fontSize: 16,
        color: '#9087e8',
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        backgroundColor: '#9087e8',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#9087e8',
        paddingVertical: 8,
        paddingHorizontal: 24
    },
    txtButton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default SuccessScreen