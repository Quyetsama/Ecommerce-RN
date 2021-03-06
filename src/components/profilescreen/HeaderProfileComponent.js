import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Platform, StatusBar } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { violet } from '../../helpers/configs'
import { COLORS } from '../../theme'
import { useSelector } from 'react-redux'


const HeaderProfile = ({ navigation }) => {

    const lengthCart = useSelector(state => state.cartReducer.products.length)
    
    return (
        <View style={ styles.container }>

            <View style={ styles.titleContainer }>
                <Text style={ styles.title }>Cá Nhân</Text>
            </View>

            <TouchableOpacity style={ styles.leftContainer } onPress={() => navigation.navigate('myStore')} activeOpacity={1}>
                <Text style={ styles.myShop }>Shop của tôi</Text>
                <Entypo name={ 'chevron-thin-right' } size={ 13 } color={ 'violet' } />
            </TouchableOpacity>

            <View style={ styles.rightContainer }>
                <TouchableOpacity
                    style={styles.iconHeader}
                >
                    <Ionicons name={'settings-outline'} size={25} color={COLORS.dark} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Order', { screen: 'Cart' })}
                    style={styles.iconHeader}
                >
                    <View style={styles.iconBadge}>
                        <Text style={{ color: '#fff', fontSize: 11 }}>{ lengthCart }</Text>
                    </View>
                    <MaterialCommunityIcons name={'cart-outline'} size={25} color={COLORS.dark} />
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

const color = '#021961'

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,
        paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
        elevation: 10
    },
    titleContainer: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
        right: 0,
        left: 0,
        bottom: 0,
        // zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: COLORS.dark,
        fontSize: 20,
        fontWeight: '600'
    },
    leftContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30
    },
    rightContainer: {
        flexDirection: 'row',
        marginRight: 10
    },
    myShop: {
        color: violet,
        fontSize: 13,
        fontWeight: 'bold',
        padding: 5
    },
    iconHeader: {
        // marginLeft: 10
        margin: 10
    },
    iconBadge: {
        position: 'absolute',
        top: -6,
        right: -6,
        zIndex: 10,
        backgroundColor: color,
        width: 19,
        height: 19,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'red'
    }
})

export default HeaderProfile