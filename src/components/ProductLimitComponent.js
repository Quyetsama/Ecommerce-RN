import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView, FlatList } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ItemProductLimit from "./ItemProductLimmit"
import SeeAll from "./SeeAll"


const WIDTH = Dimensions.get('window').width

const data = [
    {
        id: 1,
        image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/05/macbook-pro-2021-1.jpg',
        name: 'MacBook Pro 2021 Đắt vkl',
        price: '30,000,000',
        percent: 30,
        sold: 21
    },
    {
        id: 2,
        image: 'https://shopop.vn/wp-content/uploads/2020/09/16-01-2020-1579150319-1.jpg',
        name: 'Ốp lưng điện thoại',
        price: '50,000',
        percent: 79,
        sold: 123
    },
    {
        id: 3,
        image: 'https://vnn-imgs-f.vgcloud.vn/2021/08/17/17/iphone-13-pro-se-co-man-hinh-phu-o-mat-lung-1.jpg',
        name: 'Iphone 13 Pro Max',
        price: '40,000,000',
        percent: 100,
        sold: 10
    },
    {
        id: 4,
        image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/05/macbook-pro-2021-1.jpg',
        name: 'MacBook Pro 2021 Đắt vkl',
        price: '30,000,000',
        percent: 30,
        sold: 21
    },
    {
        id: 5,
        image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/05/macbook-pro-2021-1.jpg',
        name: 'MacBook Pro 2021 Đắt vkl',
        price: '30,000,000',
        percent: 30,
        sold: 21
    },
    {
        id: 6,
        image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/05/macbook-pro-2021-1.jpg',
        name: 'MacBook Pro 2021 Đắt vkl',
        price: '30,000,000',
        percent: 30,
        sold: 21
    },
    {
        id: 7,
        image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/05/macbook-pro-2021-1.jpg',
        name: 'MacBook Pro 2021 Đắt vkl',
        price: '30,000,000',
        percent: 30,
        sold: 21
    }
]

const ProductLimit = () => {

    console.log('ProductLimit render')

    return (
        <View style={ styles.container }>
            <View style={ styles.header }>
                <View style={ styles.titleContainer }>
                    <Text style={ styles.title }>Sản phẩm giới hạn</Text>
                </View>
                <TouchableOpacity style={ styles.seeAll }>
                    <Text style={ styles.textSeeAll }>Xem tất cả</Text>
                    <MaterialCommunityIcons name={ 'chevron-right' } size={ 20 } color={ 'gray' } />
                </TouchableOpacity>
            </View>
            
            <View style={ styles.body }>
                {/* <ScrollView horizontal showsHorizontalScrollIndicator={ false }> */}
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => (
                            <ItemProductLimit
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                percent={item.percent}
                                sold={item.sold}
                            />
                            )
                        }
                        ListFooterComponent={
                            <SeeAll />
                        }
                    />
                    {/* <SeeAll /> */}
                {/* </ScrollView> */}
            </View>
        </View>
    )
}

const color = '#34A853'

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10
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

export default React.memo(ProductLimit)