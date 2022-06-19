import React from 'react'
import {
    StyleSheet, 
    Text, 
    View, 
    Modal, 
    TouchableOpacity, 
    Dimensions, 
    TextInput,
    ActivityIndicator,
    StatusBar
} from 'react-native'
import { violet } from '../../utils/configs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

const LoadingModal = () => {
    
    return (
        <TouchableOpacity
            disabled={ true }
            style={ styles.container }
        >
            <StatusBar hidden />
            <View style={ styles.modal }>
                <ActivityIndicator color={'white'} />
                <Text style={ styles.text }>
                    Loading...
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
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 30,
        borderRadius: 16
    },
    text: {
        paddingHorizontal: 5,
        paddingTop: 15,
        fontWeight: 'bold',
        color: 'white'
    }
})

export default React.memo(LoadingModal)
