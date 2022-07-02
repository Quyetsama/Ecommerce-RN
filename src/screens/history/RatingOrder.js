import React, { useCallback, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native'
import { Rating, AirbnbRating } from 'react-native-ratings'
import { COLORS, URL_API, WINDOW_WIDTH } from '../../utils'
import STAR from '../../assets/images/star.png'
import StackHeader from '../../components/headers/StackHeader'
import ButtonCustom from '../../components/button/ButtonCustom'
import { useSelector, useDispatch } from 'react-redux'
import { ratingOrder } from '../../api/orderApi'




const ItemProduct = React.memo(({ item, onRating }) => {

    return (
        <View style={ styles.product }>
            <Image
                style={ styles.image }
                source={{ uri: URL_API + '/image/' + item.image[0] }}
            />
            
            <View style={ styles.detailProduct }>
                <Text style={ styles.nameProduct } numberOfLines={1}>{ item.name }</Text>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <AirbnbRating
                        defaultRating={0}
                        showRating={ false }
                        reviewColor={ COLORS.primary }
                        size={ 25 }
                        starContainerStyle={{ alignSelf: 'flex-start' }}
                        onFinishRating={ onRating }
                    />
                </View>
            </View>
        </View>
    )
})

const RatingOrder = ({ navigation, route }) => {

    const { userToken } = useSelector(state => state.authReducer)
    const [products, setProducts] = useState([])

    useEffect(() => {
        const arrProduct = route.params?.ordersInfo?.map(item => (
            {
                ...item.product,
                rating: 0
            }
        ))

        setProducts([...arrProduct])
    }, [])

    const postRating = async () => {
        try {
            console.log(userToken)
            const res = await ratingOrder(userToken, route.params?._id, products)

            if(res?.data.success) {
                navigation.goBack()
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    const handleRating = useCallback((index, rating) => {
        if(products[index].rating !== rating) {
            let newProducts = [...products]
            newProducts[index].rating = rating
    
            setProducts([...newProducts])
        }
    }, [products])

    const isValid = useCallback(() => {
        let isValid = true

        if(!products.length) {
            return false
        }

        products.forEach(item => {
            if(!item.rating) {
                isValid = false
                return isValid
            }
        })

        return isValid
    }, [products])

    return (
        <View style={ styles.container }>
            <StackHeader label={ 'Rating Order' } />

            <FlatList
                contentContainerStyle={{ marginVertical: 10 }}
                data={ products }
                keyExtractor={item => item._id}
                renderItem={({ item, index }) => (
                    <ItemProduct 
                        item={ item }
                        onRating={rating => handleRating(index, rating)}
                    />
                )}
            />

            <ButtonCustom 
                text={ 'Complete' }
                disabled={ isValid() }
                onPress={ postRating }
            />

        </View>
    )
}

const HEIGHT_ITEM = 100

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    product: {
        // width: '100%',
        // height: 100,
        flexDirection: 'row',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    image: {
        width: HEIGHT_ITEM,
        height: HEIGHT_ITEM
    },
    detailProduct: {
        flex: 1,
        height: HEIGHT_ITEM,
        marginLeft: 12
    },
    nameProduct: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold'
    },
})

export default RatingOrder