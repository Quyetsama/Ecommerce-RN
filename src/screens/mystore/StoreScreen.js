import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'



const StoreScreen = ({ navigation }) => {
    return (
        <View style={ styles.container }>
            <TouchableOpacity style={ styles.btnAddProduct } onPress={() => navigation.navigate('AddProduct')}>
                <Text>Thêm Sản Phẩm</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnAddProduct: {
        backgroundColor: 'tomato',
        padding: 10
    }
})

export default StoreScreen