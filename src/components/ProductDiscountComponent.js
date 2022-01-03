import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ItemProductDiscount from "./ItemProductDiscount"
import SeeAll from "./SeeAll"


const WIDTH = Dimensions.get('window').width

const ProductDiscount = () => {
    return (
        <View style={ styles.container }>
            <View style={ styles.header }>
                <View style={ styles.titleContainer }>
                    <Text style={ styles.title }>Khuyễn mãi</Text>
                </View>
                <TouchableOpacity style={ styles.seeAll }>
                    <Text style={ styles.textSeeAll }>Xem tất cả</Text>
                    <MaterialCommunityIcons name={ 'chevron-right' } size={ 20 } color={ 'gray' } />
                </TouchableOpacity>
            </View>
            
            <View style={ styles.body }>
                <ScrollView horizontal showsHorizontalScrollIndicator={ false }>
                    <ItemProductDiscount 
                        image={'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/05/macbook-pro-2021-1.jpg'}
                        name={'MacBook Pro 2021 Đắt vkl'}
                        discount={'Giảm 20%'}
                    />
                    <ItemProductDiscount 
                        image={'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/05/macbook-pro-2021-1.jpg'}
                        name={'MacBook 2021'}
                        discount={'Giảm 50k'}
                    />
                    <ItemProductDiscount 
                        image={'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/05/macbook-pro-2021-1.jpg'}
                        name={'MacBook Pro 2021 Đắt vkl'}
                        discount={'Freeship'}
                    />
                    <ItemProductDiscount 
                        image={'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/05/macbook-pro-2021-1.jpg'}
                        name={'MacBook Pro 2021 Đắt vkl'}
                        discount={'Giảm 100k'}
                    />
                    <SeeAll />
                </ScrollView>
            </View>
        </View>
    )
}

const color = '#34A853'

const styles = StyleSheet.create({
    container: {
        
    },
    header: {
        flexDirection: 'row',
        padding: 10
    },
    body: {
        flexDirection: 'row'
    },
    titleContainer: {
        flex: 1
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: color
    },
    seeAll: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textSeeAll: {
        fontSize: 12
    }
})

export default ProductDiscount