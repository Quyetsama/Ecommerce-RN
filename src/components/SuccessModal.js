import React from 'react'
import {
    StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions, TextInput
} from 'react-native'
import { violet } from '../helpers/configs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

const SuccessModal = ({ changeModalVisible, setData }) => {
    
    const okModal = () => {
        changeModalVisible()
        // setData()
    }


    const cancelModal = () => {
        changeModalVisible()
    }
    
    return (
        <TouchableOpacity
            disabled={ true }
            style={ styles.container }
        >
            <View style={ styles.modal }>
                <MaterialCommunityIcons name={ 'check-decagram' } size={36} color="white" />
                <Text style={ styles.text }>
                    Đã thêm vào giỏ
                </Text>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        borderRadius: 16
    },
    text: {
        margin: 5,
        fontWeight: 'bold',
        color: 'white'
    }
})

export default React.memo(SuccessModal)
