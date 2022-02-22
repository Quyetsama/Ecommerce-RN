import React from 'react'
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { violet } from '../../helpers/configs'




const HeaderStore = ({ label, goBack, backgroundColor }) => {

    return (
        <View style={[ styles.container, { backgroundColor: backgroundColor ? backgroundColor : 'white' } ]}>
            <StatusBar barStyle='dark-content' />
            <Feather style={{ zIndex: 12 }} name={'corner-down-left'} size={25} color={ backgroundColor ? 'white' : violet } onPress={ goBack } />
            <View style={ styles.labelContainer }>
                <Text style={[ styles.label, { color: backgroundColor ? 'white' : '#000' } ]}>{ label }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 15,
        elevation: 3,
        paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    },
    labelContainer: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 11
    },
    label: {
        color: '#000',
        fontSize: 18,
        fontWeight: '500'
    }
})

export default HeaderStore