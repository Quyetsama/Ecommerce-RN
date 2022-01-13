import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const data = ['Đen', 'Vàng Nhạt', 'Xanh Lam', 'Xanh Ngọc', 'Cam']

const TypeProductComponent = () => {
    return (
        <View style={ styles.container }>
            <View style={ styles.headerContainer }>
                <View style={ styles.leftContainer }>
                    <Text style={ styles.textHeader }>Chọn loại hàng</Text>
                </View>
                <View style={ styles.rightContainer }>
                    <MaterialCommunityIcons name={ 'chevron-right' } size={ 25 } color={ 'gray' } />
                </View>
            </View>

            <View style={ styles.bodyContainer }>
                {data.map((item, index) => {
                    if(index >= 3) return
                    return (
                        <View key={ index } style={ styles.itemType }>
                            <Text numberOfLines={2} style={ styles.textType }>{ item }</Text>
                        </View>
                    )
                })
                }
                {data.length > 3 ? (
                    <View style={[ styles.itemType, { width: 50 } ]}>
                        <Text numberOfLines={2} style={ styles.textType }>+{ data.length - 3 }</Text>
                    </View>
                )
                : null
                }
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    headerContainer: {
        flexDirection: 'row',
        // paddingVertical: 5
    },
    leftContainer:{
        flex: 1,
        flexDirection: 'row'
    },
    textHeader: {
        color: '#000',
        fontWeight: '500',
        fontSize: 15
    },
    rightContainer: {

    },
    bodyContainer: {
        flexDirection: 'row',
        // paddingVertical: 5,
        flexWrap: 'wrap'
    },
    itemType: {
        backgroundColor: '#f5f5f5',
        width: 100,
        height: 40,
        marginRight: 10,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textType: {
        color: '#000',
        textAlign: 'center',
        marginHorizontal: 10
    }
})

export default TypeProductComponent