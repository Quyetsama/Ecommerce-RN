import React from "react"
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, Platform, Image } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NAME } from "../../helpers/configs"
import name from '../../assets/img/name.png'



const WIDTH = Dimensions.get('window').width

const Header = React.memo(({ navigation }) => {
    return (
        <View style={ styles.container }>
            <View style={ styles.spaceX }>
                <Text style={ styles.txtSpaceX }>{NAME}</Text>
            </View>
            <TouchableOpacity style={ styles.inputContainer } onPress={() => navigation.navigate('stackSearch')}>
                <Ionicons name={'search'} size={21} color={'#969696'} />
                <TextInput editable={false} style={ styles.input } placeholder="Search..." />
            </TouchableOpacity>
            <TouchableOpacity 
                style={ styles.Cart }
                onPress={() => navigation.navigate('Order', { screen: 'Cart' })}
            >
                <View style={styles.iconBadge}>
                    <Text style={{ color: '#fff', fontSize: 11 }}>3</Text>
                </View>
                <MaterialCommunityIcons name={'cart-outline'} size={24} color={'#969696'} />
            </TouchableOpacity>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#8141ff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight + 6,
        // paddingBottom: 10
    },
    spaceX: {

    },
    txtSpaceX: {
        fontSize: 20,
        fontWeight: '800',
        color: '#fff'
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginLeft: 30,
        paddingHorizontal: 10
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
        bottom: 25,
        left: 25,
        zIndex: 10,
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

export default Header