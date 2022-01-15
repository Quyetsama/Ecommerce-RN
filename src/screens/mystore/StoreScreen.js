import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import HeaderStore from '../../components/storescreen/HeaderStore'



const StoreScreen = ({ navigation }) => {
    return (
        <View style={ styles.container }>
            <HeaderStore label={'Shop của tôi'} goBack={() => navigation.goBack()} />
            
            <ScrollView
                contentContainerStyle={ styles.bodyContainer }
            >
                <TouchableOpacity style={ styles.btnAddProduct } onPress={() => navigation.navigate('AddProductStack')}>
                    <Text>Thêm Sản Phẩm</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bodyContainer: {
        alignItems: 'center'
    },
    btnAddProduct: {
        backgroundColor: 'tomato',
        padding: 10
    }
})

export default StoreScreen