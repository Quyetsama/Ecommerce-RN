import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { setNameProduct } from '../../redux/actions/myStoreAction'



const NameAndDes = ({ label, maxLength, minLength, multiline }) => {

    // const [text, setText] = useState('')
    const dispatch = useDispatch()
    const name = useSelector(state => state.myStoreReducer.name)

    return (
        <View style={ styles.container }>
            <View style={ styles.labelContainer }>
                <Text style={ styles.label }>
                    { label }
                    <Text style={{ color: 'red' }}> *</Text>
                </Text>
                <Text>{ name.length }/{ maxLength }</Text>
            </View>
            
            <View style={ styles.inputContainer }>
                <TextInput
                    style={ styles.input }
                    placeholder={ 'Nhập ' + ('' + label).toLowerCase() }
                    maxLength={ maxLength }
                    value={ name }
                    onChangeText={text => dispatch(setNameProduct(text))}
                    multiline={ multiline }
                />

                {name.length >= minLength ? (
                    <TouchableOpacity style={ styles.iconRemove } onPress={() => dispatch(setNameProduct(''))} >
                        <Ionicons name={'close-circle'} size={20} color={'rgba(52, 52, 52, 0.4)'} />
                    </TouchableOpacity>
                ) : (
                    null
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        marginTop: 10
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        flex: 1,
        color: '#000',
        fontSize: 15,
        marginLeft: 3
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1
    },
    iconRemove: {
        marginLeft: 10
    }
})

export default NameAndDes