import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { useSelector } from 'react-redux'



const NoName = ({ icon, label, onPress, hideRequired, hideIconChevron, colorIcon }) => {

    const categorySelected = useSelector(state => state.myStoreReducer.category)

    return (
        <TouchableOpacity style={ styles.container } activeOpacity={0.5} onPress={ onPress }>
            <View style={ styles.leftContainer }>
                <Ionicons name={ icon } size={25} color={ colorIcon ? colorIcon : '#969696' } />
                <Text style={ styles.label }>{ label }
                { !hideRequired ? <Text style={{ color: 'red' }}> *</Text> : null }
                </Text>
            </View>
            <View style={ styles.rightContainer }>
                <Text style={ styles.txtDetail }>{ categorySelected.name }</Text>
                { !hideIconChevron ? <Entypo name={ 'chevron-thin-right' } size={ 13 } color={ 'gray' } /> : null }
            </View>
        </TouchableOpacity>
    )
}

const color = '#021961'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#f2f2f2'
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
        color: '#000',
        marginLeft: 15
    },
    txtDetail: {
        color: '#969696',
        fontSize: 13,
        marginRight: 5
    }
})

export default NoName