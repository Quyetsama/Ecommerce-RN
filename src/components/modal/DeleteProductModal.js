import React from 'react'
import {
    StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions, TextInput
} from 'react-native'
import { violet } from '../../helpers/configs'

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

const DeleteProductModal = ({ changeModalVisible, setData }) => {
    

    const okModal = () => {
        changeModalVisible(false)
        setData()
    }


    const cancelModal = () => {
        changeModalVisible(false)
    }
    
    return (
        <TouchableOpacity
            disabled={ true }
            style={ styles.container }
        >
            <View style={ styles.modal }>
                <View style={ styles.textView }>
                    <Text style={[ styles.text, { color: 'red' } ]}>
                        Thông báo
                    </Text>
                    <Text style={ styles.text }>
                        Bạn muốn xóa sản phẩm này?
                    </Text>
                </View>

                <View style={ styles.buttonsView }>
                    <TouchableOpacity
                        onPress={() => cancelModal()}
                        style={ styles.touchableOpacity }
                    >
                        <Text style={[ styles.text, { color: violet } ]}>Hủy</Text>
                    </TouchableOpacity>

                    <View style={{ width: 1, height: '100%', backgroundColor: '#f2f2f2' }} />

                    <TouchableOpacity
                        onPress={() => okModal()}
                        style={ styles.touchableOpacity }
                    >
                        <Text style={[ styles.text, { color: violet } ]}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.4)'
    },
    modal: {
        height: 150,
        width: WIDTH - 80,
        paddingTop: 10,
        backgroundColor: 'white',
        borderRadius: 16
    },
    textView: {
        flex: 1,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    text: {
        margin: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    buttonsView: {
        width: '100%',
        flexDirection: 'row'
    },
    touchableOpacity: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center'
    }
})

export default React.memo(DeleteProductModal)
