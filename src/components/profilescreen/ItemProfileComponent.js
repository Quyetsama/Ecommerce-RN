import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { COLORS } from '../../utils'



const ItemProfile = ({ icon, color, label, txtDetail, chevron, onPress }) => {
    return (
        <TouchableOpacity style={ styles.container } activeOpacity={0.5} onPress={ onPress }>
            <View style={ styles.leftContainer }>
                <MaterialCommunityIcons name={ icon } size={25} color={ color ? color : COLORS.primary} />
                <Text style={[ styles.label, { color: color } ]}>{ label }</Text>
            </View>
            <View style={ styles.rightContainer }>
                <Text style={ styles.txtDetail }>{ txtDetail }</Text>
                {chevron &&
                    <Entypo name={ 'chevron-thin-right' } size={ 13 } color={ 'gray' } />
                }
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 15,
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
        color: '#021961',
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

export default React.memo(ItemProfile)