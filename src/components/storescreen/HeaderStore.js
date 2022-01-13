import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { violet } from '../../helpers/configs'




const HeaderStore = ({ label, goBack }) => {
    return (
        <View style={ styles.container }>
            <Feather name={'corner-down-left'} size={25} color={violet} onPress={ goBack } />
            <View style={ styles.labelContainer }>
                <Text style={ styles.label }>{ label }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 15,
        elevation: 3
    },
    labelContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        color: '#000',
        fontSize: 18,
        fontWeight: '500'
    }
})

export default HeaderStore