import React, { useState } from 'react'
import { 
    ScrollView, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View, 
    Switch 
} from 'react-native'
import { violet } from '../helpers/configs'
import CartHeader from '../components/cartscreen/CartHeader'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'



const convertVND = (value) => {
    return (value).toLocaleString('vi', {style : 'currency', currency : 'VND'})
}

const ItemInfo = ({ icon, text }) => {
    return (
        <View style={ styles.itemInfoContainer }>
            <MaterialCommunityIcons name={icon} size={26} color={violet} />
            <Text 
                style={{
                    color: '#000',
                    fontSize: 16,
                    marginLeft: 6
                }}
            >
                { text }
            </Text>
        </View>
    )
}

const ItemBill = ({ title, text, iconChevron }) => {
    return (
        <View style={ styles.ItemBillContainer }>
            <Text 
                style={{
                    flex: 1,
                    color: '#969696'
                }}
            >
                { title }
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#000', marginRight: 14 }}>{ text }</Text>
                {iconChevron &&
                    <EvilIcons name='chevron-right' size={30} color={'#969696'} />
                }
            </View>
        </View>
    )
}

const CheckOutScreen = ({ navigation }) => {

    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState)

    return (
        <View style={ styles.container }>
            <CartHeader 
                label={'Confirm bill'} 
                goBack={() => {
                        navigation.goBack()
                    }
                }
            />

            <ScrollView
            >
                <View style={ styles.customerInfo }>
                    <View style={ styles.headerAddress }>
                        <Text style={ styles.titleSection }>Delivery Address</Text>
                        <TouchableOpacity>
                            <Text style={ styles.changeText }>Change</Text>
                        </TouchableOpacity>
                    </View>
                    <Text>Home</Text>
                    <View style={ styles.infoContainer }>
                        <View style={ styles.viewLeft }>
                            <ItemInfo icon={'map-marker'} text={'680 Mowe Court, New York, US'} />
                            <ItemInfo icon={'account'} text={'Sophia Benson'} />
                            <ItemInfo icon={'phone'} text={'+(84)-867-985-106'} />
                        </View>
                        <EvilIcons name='chevron-right' size={30} color={'#969696'} />
                    </View>
                </View>
                
                <View style={ styles.orderBill }>
                    <View style={ styles.headerOrderBill }>
                        <Text style={ styles.titleSection }>Order Bill</Text>
                    </View>
                    <View>
                        <ItemBill title={'Product'} text={'3 items'} iconChevron />
                        <ItemBill title={'Price'} text={ convertVND(350000) } />
                        <ItemBill title={'Shopping Fee'} text={ convertVND(15000) } />   
                    </View>
                    <View style={ styles.useCoinsContainer }>
                        <Text style={ styles.useCoinsText }>Use Coins</Text>
                        <Switch
                            style={{ justifyContent: 'center' }}
                            trackColor={{ false: "#f2f2f2", true: "#30d126" }}
                            thumbColor={'white'}
                            ios_backgroundColor="white"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                    <View style={ styles.totalBillContainer }>
                        <Text style={[ styles.totalBillText, { flex: 1 } ]}>Total Bill</Text>
                        <Text style={[ styles.totalBillText, { marginRight: 14 } ]}>{ convertVND(365000) }</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={ styles.btnContainer }>
                <TouchableOpacity
                    style={ styles.completeBtn }
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Complete</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

const sectionContainer = {
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2'
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    customerInfo: {
        ...sectionContainer
    },
    headerAddress: {
        flexDirection: 'row',
        paddingVertical: 16
    },
    titleSection: {
        flex: 1,
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold'
    },
    changeText: {
        color: '#000',
        fontSize: 15
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewLeft: {
        flex: 1,
        paddingVertical: 12
    },
    itemInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4
    },
    orderBill: {
        ...sectionContainer
    },
    headerOrderBill: {
        flexDirection: 'row',
        paddingVertical: 16
    },
    ItemBillContainer: {
        flexDirection: 'row',
        paddingVertical: 8
    },
    useCoinsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8
    },
    useCoinsText: {
        flex: 1,
        color: '#969696'
    },
    totalBillContainer: {
        flexDirection: 'row',
        paddingVertical: 18
    },
    totalBillText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    },
    btnContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        paddingBottom: 8
    },
    completeBtn: {
        width: '80%',
        alignItems: 'center',
        backgroundColor: violet,
        padding: 18,
        borderRadius: 15,
        zIndex: 100
    }
})

export default CheckOutScreen