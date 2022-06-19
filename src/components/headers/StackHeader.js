import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'




const StackHeader = ({ label, hideElevation }) => {

    const navigation = useNavigation()

    return (
        <View style={[ styles.container, { elevation: hideElevation ? 0 : 3 } ]}>
            <StatusBar translucent barStyle='dark-content' />
            <Feather style={ styles.iconBack } name={'corner-down-left'} size={25} color={'#000'} onPress={() => navigation.goBack()} />
            <Text style={ styles.label }>{ label }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 28,
        paddingBottom: 12
    },
    iconBack: {
        position: 'absolute',
        left: 20,
        paddingTop: 15,
        zIndex: 12
    },
    label: {
        color: '#000',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default React.memo(StackHeader)