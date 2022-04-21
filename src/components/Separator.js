import React from 'react'
import {
    View,
    StyleSheet
} from 'react-native'


const Separator = () => {
    return (
        <View style={ styles.container }/>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 10,
        backgroundColor: '#f2f2f2'
    }
})

export default Separator