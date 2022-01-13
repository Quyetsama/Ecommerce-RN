import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NAME } from '../../helpers/configs'


const WIDTH = Dimensions.get('window').width

const ICON = ({ icon, color }) => {
    return (
        <View style={ styles.iconContainer }>
            <View style={[ styles.iconBG, { backgroundColor: color } ]} />
            <MaterialCommunityIcons style={ styles.icon } name={ icon } size={30} color={ color } />
        </View>
    )
}

const CoinVoucher = () => {
    return (
        <View style={ styles.container }>
            <View style={ styles.itemLeftContainer }>
                <View style={ styles.contentContainer }>          
                    <ICON icon={ 'skype' } color={ '#ffe600' } />
                    <View style={ styles.textContainer }>
                        <Text style={ styles.title }>{ NAME } Xu</Text>
                        <Text style={{ color: 'tomato', fontSize: 13, fontWeight: '500' }}>200 Xu</Text>
                    </View>
                </View>
            </View>

            <View style={ styles.itemRightContainer }>
                <View style={ styles.contentContainer }>          
                    <ICON icon={ 'ticket-percent' } color={ '#00a6ff' } />
                    <View style={ styles.textContainer }>
                        <Text style={ styles.title }>Kho Voucher</Text>
                        <Text style={{ color: '#969696', fontSize: 13 }}>Tìm thêm</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const color = '#021961'

const itemContainer = {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ededed',
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: WIDTH,
        height: WIDTH / 5,
        flexDirection: 'row'
    },
    itemLeftContainer: {
        ...itemContainer,
        borderRightWidth: 0.5
    },
    itemRightContainer: {
        ...itemContainer,
        borderLeftWidth: 0.5
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        overflow: 'hidden'
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15
    },
    iconBG: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.2
    },
    icon: {
        padding: 10,
        zIndex: 10
    },
    textContainer: {
        marginLeft: 10
    },
    title: {
        color: color,
        fontWeight: '600'
    }
})

export default CoinVoucher