import React, { forwardRef, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Dimensions, Image, Text, FlatList } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ItemProduct from './ItemProduct'
import { getAllProduct } from '../api/categoriesApi'
import { doMain } from '../helpers/configs'


const WIDTH = Dimensions.get('window').width
// const data = [
//     {
//         image: 'https://cf.shopee.vn/file/c618e75b685cda70aabe2bfa26c067f1',
//         name: 'Giày thể thao Bò Sữa',
//         sold: 21,
//         price: '999.000'
//     },
//     {
//         image: 'http://file.hstatic.net/200000174405/article/5_banner-3-2-betrue-sneaker-pack-2019-pride-month-closer-look-18-1_3a2f5bb39a534deaaa25347a2dc987b5.jpg',
//         name: 'Sneaker 2019',
//         sold: 25,
//         price: '750.000'
//     },
//     {
//         image: 'https://shopop.vn/wp-content/uploads/2020/10/24-04-2020-1587696699-0.jpg',
//         name: 'Ốp lưng điện thoại',
//         sold: 350,
//         price: '30.000'
//     },
//     {
//         image: 'https://cf.shopee.vn/file/932bb626622ae1636b6e6f3192b42afd',
//         name: 'Dây sạc Iphone chính hãng',
//         sold: 136,
//         price: '50.000'
//     },
//     {
//         image: 'https://cdn.tgdd.vn/Products/Images/54/70820/tai-nghe-chup-tai-kanen-ip-952-2-6-org.jpg',
//         name: 'Tai nghe Kanen IP-952',
//         sold: 8,
//         price: '640.000'
//     },
//     {
//         image: 'https://cf.shopee.vn/file/c618e75b685cda70aabe2bfa26c067f1',
//         name: 'Giày thể thao Bò Sữa',
//         sold: 21,
//         price: '999.000'
//     },
//     {
//         image: 'http://file.hstatic.net/200000174405/article/5_banner-3-2-betrue-sneaker-pack-2019-pride-month-closer-look-18-1_3a2f5bb39a534deaaa25347a2dc987b5.jpg',
//         name: 'Sneaker 2019',
//         sold: 25,
//         price: '750.000'
//     },
//     {
//         image: 'https://shopop.vn/wp-content/uploads/2020/10/24-04-2020-1587696699-0.jpg',
//         name: 'Ốp lưng điện thoại',
//         sold: 350,
//         price: '30.000'
//     },
//     {
//         image: 'https://cf.shopee.vn/file/932bb626622ae1636b6e6f3192b42afd',
//         name: 'Dây sạc Iphone chính hãng',
//         sold: 136,
//         price: '50.000'
//     },
//     {
//         image: 'https://cdn.tgdd.vn/Products/Images/54/70820/tai-nghe-chup-tai-kanen-ip-952-2-6-org.jpg',
//         name: 'Tai nghe Kanen IP-952',
//         sold: 8,
//         price: '640.000'
//     }
// ]

const Products = ({ page }) => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        console.log(page)
        getAllProduct(page).then(res => {
            // console.log(res.data)
            setProducts(products.concat(res.data.products))
        })
        .catch(error => console.log(error))
    }, [page])

    // console.log(products)

    return (
        <View removeClippedSubviews style={ styles.container }>
            {/* <FlatList
                nestedScrollEnabled={true}
                removeClippedSubviews
                // scrollEnabled
                // horizontal
                // showsHorizontalScrollIndicator={ false }
                data={products}
                numColumns={2}
                keyExtractor={(item, index) => index}
                renderItem={({item}) => (
                    <ItemProduct 
                        image={ doMain + item.image[0] }
                        name={ item.name }
                        sold={ item.sold }
                        price={ item.price }
                    />
                )}
            /> */}
            
            {products.map((item, index) => (
                <ItemProduct 
                    key={ index }
                    image={ doMain + item.image[0] }
                    name={ item.name }
                    sold={ item.sold }
                    price={ item.price }
                />
            ))}
            {/* <Text style={{ color: 'tomato', textAlign: 'center' }}>Đang tải thêm</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f1f2',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})

export default React.memo(Products)