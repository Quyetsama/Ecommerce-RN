import React from "react"
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, Platform, Image } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import { NAME } from "../../helpers/configs"
import name from '../../assets/img/name.png'
import { COLORS } from "../../theme"
import { SIZE } from "../../helpers/configs"
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'



const Header = React.memo(({ navigation }) => {

    const lengthCart = useSelector(state => state.cartReducer.products.length)

    return (
        <View style={ styles.container }>
            <View style={ styles.spaceX }>
                <Text style={ styles.txtSpaceX }>{NAME}</Text>
            </View>
            <TouchableOpacity style={ styles.inputContainer } onPress={() => navigation.navigate('stackSearch')}>
                <Ionicons name={'search'} size={21} color={'#969696'} />
                <TextInput editable={false} style={ styles.input } placeholder="Search here" />
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={ styles.Cart }
                onPress={() => navigation.navigate('Order', { screen: 'Cart' })}
            >
                <View style={styles.iconBadge}>
                    <Text style={{ color: '#fff', fontSize: 11 }}>{ lengthCart }</Text>
                </View>
                <Feather name={ 'shopping-bag' } size={ SIZE(24) } color={ COLORS.dark } />
                {/* <MaterialCommunityIcons name={'cart-outline'} size={24} color={ COLORS.dark } /> */}
            </TouchableOpacity>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 18,
        // paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight + 6,
        // paddingBottom: 10
    },
    spaceX: {

    },
    txtSpaceX: {
        fontSize: 20,
        fontWeight: '800',
        color: COLORS.dark
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f4f7fc',
        borderRadius: 10,
        marginLeft: 30,
        paddingHorizontal: 10,
        // elevation: 20
    },
    input: {
        flex: 1,
        marginLeft: 5,
        marginRight: 20,
        padding: 0,
        height: 42
    },
    Cart: {
        backgroundColor: '#fff',
        marginLeft: 10,
        padding: 8,
        borderRadius: 10
    },
    iconBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: COLORS.white,
        backgroundColor: 'red'
    }
})

export default Header