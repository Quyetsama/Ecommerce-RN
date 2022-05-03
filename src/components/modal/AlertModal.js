import React from 'react'
import {
    StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions, TextInput
} from 'react-native'
import { violet } from '../../helpers/configs'

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

const AlertModal = ({ title, content, changeModalVisible, setData }) => {
    
    const okModal = () => {
        changeModalVisible(false)
    }
    
    return (
        <TouchableOpacity
            disabled={ true }
            style={ styles.container }
        >
            <View style={ styles.modal }>
                <View style={ styles.textView }>
                    <Text style={[ styles.text, { fontSize: 22, color: '#000' } ]}>
                        { title }
                    </Text>
                    <Text style={ styles.text }>
                        { content }
                    </Text>
                </View>

                <View style={ styles.buttonsView }>
                    <TouchableOpacity
                        onPress={() => okModal()}
                        style={ styles.touchableOpacity }
                    >
                        <Text style={[ styles.text, { color: violet } ]}>OK</Text>
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
        // height: 165,
        width: WIDTH / 1.5,
        paddingTop: 10,
        backgroundColor: 'white',
        borderRadius: 16
    },
    textView: {
        // flex: 1,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    text: {
        textAlign: 'center',
        marginVertical: 5,
        marginHorizontal: 15,
        // fontSize: 16,
        fontWeight: 'bold',
        color: 'grey'
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

export default React.memo(AlertModal)
