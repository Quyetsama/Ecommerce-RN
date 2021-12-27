import React from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const InputAuthComponent = ({ value, title, iconLeft, iconRight, placeholder, secureTextEntry }) => {
    return (
        <View style={ styles.fieldContainer }>
            <Text style={ styles.titleField }>{ title }</Text>
            <View style={ styles.inputField }>
                <MaterialCommunityIcons style={ styles.iconField } name={ iconLeft } size={21} color={color} />
                <TextInput value={ value } secureTextEntry={ secureTextEntry } style={ styles.input } placeholder={ placeholder }/>
                { secureTextEntry ? 
                    <TouchableOpacity>
                        <Ionicons style={ styles.iconField } name={ iconRight } size={21} color={color} />
                    </TouchableOpacity>
                    :
                    <Ionicons style={ styles.iconField } name={ iconRight } size={21} color={color} />
                }
            </View>
        </View>
    )
}

const color = '#34A853'

const styles = StyleSheet.create({
    fieldContainer: {
        marginBottom: 20
    },
    inputField: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: color
    },
    iconField: {
        marginRight: 5
    },
    input: {
        flex: 1,
        paddingHorizontal: 10
    },
})

export default InputAuthComponent