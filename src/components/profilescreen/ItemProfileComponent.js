import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'



const ItemProfile = ({ icon, label, txtDetail, onPress }) => {
    return (
        <TouchableOpacity style={ styles.container } activeOpacity={0.5} onPress={ onPress }>
            <View style={ styles.leftContainer }>
                <MaterialCommunityIcons name={ icon } size={25} color={'#8141ff'} />
                <Text style={ styles.label }>{ label }</Text>
            </View>
            <View style={ styles.rightContainer }>
                <Text style={ styles.txtDetail }>{ txtDetail }</Text>
                <Entypo name={ 'chevron-thin-right' } size={ 13 } color={ 'gray' } />
            </View>
        </TouchableOpacity>
    )
}

const color = '#021961'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        color: color,
        marginLeft: 15,
        fontSize: 15,
        fontWeight: '500'
    },
    txtDetail: {
        color: '#969696',
        fontSize: 13,
        marginRight: 5
    }
})

export default ItemProfile