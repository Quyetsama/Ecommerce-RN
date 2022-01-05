import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const WIDTH = Dimensions.get('window').width

const SeeAll = () => {
    return (
        <TouchableOpacity style={ styles.container } activeOpacity={ 0.7 }>
            <MaterialCommunityIcons name={ 'chevron-right-circle-outline' } size={ 25 } color={ 'tomato' } />
            <Text style={{ color: 'tomato', marginTop: 5 }}>Xem tất cả</Text>
        </TouchableOpacity>   
    )
}

const color = '#34A853'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    }
})

export default SeeAll