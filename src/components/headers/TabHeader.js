import React from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    StatusBar
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { COLORS } from '../../theme'



const TabHeader = ({ title }) => {

    const lengthCart = useSelector(state => state.cartReducer.products.length)
    const navigation = useNavigation()

    return (
        <View style={ styles.headerContainer }>
            <StatusBar translucent barStyle='dark-content' />
            <TouchableOpacity
                    onPress={() => navigation.navigate('Order', { screen: 'Cart' })}
                    style={styles.iconCart}
                >
                    <View style={styles.iconBadge}>
                        <Text style={{ color: '#fff', fontSize: 11 }}>{ lengthCart }</Text>
                    </View>
                    <MaterialCommunityIcons name={'cart-outline'} size={25} color={ COLORS.dark } />
            </TouchableOpacity>
            <Text style={ styles.label }>{ title }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 28,
        paddingBottom: 12
    },
    iconCart: {
        position: 'absolute',
        right: 20,
        paddingTop: 15,
        zIndex: 100
    },
    label: {
        color: '#000',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    iconBadge: {
        position: 'absolute',
        top: 9,
        right: -6,
        zIndex: 10,
        backgroundColor: 'red',
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

export default TabHeader