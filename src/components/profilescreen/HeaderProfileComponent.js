import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { violet } from '../../helpers/configs'


const HeaderProfile = () => {
    return (
        <View style={ styles.container }>

            <View style={ styles.titleContainer }>
                <Text style={ styles.title }>Cá Nhân</Text>
            </View>

            <TouchableOpacity
                style={styles.iconHeader}
            >
                <View style={styles.iconBadge}>
                    <Text style={{ color: '#fff', fontSize: 11 }}>3</Text>
                </View>
                <MaterialCommunityIcons name={'cart-outline'} size={25} color={'#fff'} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.iconHeader}
            >
                <Ionicons name={'settings-outline'} size={25} color={'#fff'} />
            </TouchableOpacity>
        </View>
    )
}

const color = '#021961'

const styles = StyleSheet.create({
    container: {
        backgroundColor: violet,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 10
    },
    titleContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600'
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