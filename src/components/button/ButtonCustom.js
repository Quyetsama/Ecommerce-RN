import React from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native'
import { COLORS } from '../../utils'



const ButtonCustom = ({ text, onPress, disabled }) => {
    return (
        <TouchableOpacity
            disabled={ disabled === false ? true : false }
            style={[ styles.button , { opacity: disabled === false ? 0.5 : 1 }]}
            onPress={ onPress }
        >
            <Text style={ styles.txtButton }>{ text }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 0,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        padding: 18,
        marginBottom: 8,
        borderRadius: 15,
        zIndex: 100
    },
    txtButton: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 16
    }
})

export default React.memo(ButtonCustom)