import React, { useState, useCallback, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import UnderLineSection from '../../components/UnderLineSection'
import HeaderStore from '../../components/storescreen/HeaderStore'
import AddImage from '../../components/storescreen/AddImage'
import NameAndDes from '../../components/storescreen/NameAndDes'
import NoName from '../../components/storescreen/NoName'
import { isEmpty } from 'lodash'

import { violet } from '../../utils/configs'
import { useDispatch, useSelector } from 'react-redux'
import { postProduct, clearProduct, setImageProduct, setValuePrice, setValueQuantity, setValueTransportFee } from '../../redux/actions/myStoreAction'


const data = [
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80',
    'https://images.unsplash.com/photo-1553456558-aff63285bdd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
]

const AddProductScreen = ({ navigation }) => {

    const { image, category, classify, price, quantity, transportfee, post_success } = useSelector(state => state.myStoreReducer)
    // const [imagesSelected, setImagesSelected] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        if(post_success === true) {
            dispatch(clearProduct())
            navigation.goBack()
        }
        else if(post_success === false) {
            console.log('faild')
            Alert.alert('Lỗi', 'Có lỗi xảy ra vui lòng thử lại sau !', [{
                text: 'OK',
                onPress: () => dispatch({ type: 'SET_POST_NULL' })
            }])
        }
    }, [post_success])

    const openImage = useCallback(() => {
        if(image.length < 5) {
            let listImage = []

            ImagePicker.openPicker({
                multiple: true,
                waitAnimationEnd: false,
                includeExif: true,
                forceJpg: true,
                maxFiles: 5,
                compressImageQuality: 0.8,
                includeBase64: true,
                mediaType: 'photo'
            })
            .then(images => {
                if(images.length + image.length <= 5) {
                    images.map((image, index) => {
                        listImage.push(image.data)
                    })
                    dispatch(setImageProduct([...image, ...listImage]))
                    // setImagesSelected([...imagesSelected, ...listImage])
                }
                else {
                    Alert.alert('Lỗi', 'Chỉ được phép chọn tối đa 5 ảnh', [{
                        text: 'OK'
                    }])
                }
            })
            .catch(error => console.log(error))
        }
        else {
            Alert.alert('Lỗi', 'Chỉ được phép chọn tối đa 5 ảnh', [{
                text: 'OK'
            }])
        }
    })

    const removeImage = (id) => {
        const newImages = image.filter((item, index) => index !== id)
        dispatch(setImageProduct(newImages))
        // setImagesSelected(newImages)
    }

    const handleGoBack = () => {
        dispatch(clearProduct())
        navigation.goBack()
    }

    const handleChangePrice = useCallback((value) => {
        dispatch(setValuePrice(+value))
    }, []) 

    const handleChangeQuantity= useCallback((value) => {
        dispatch(setValueQuantity(+value))
    }, [])

    const handleChangeTransportFee = useCallback((value) => {
        dispatch(setValueTransportFee(+value))
    })

    return (
        <View style={ styles.container }>
            <HeaderStore label={'Thêm sản phẩm'} goBack={ handleGoBack } />

            <ScrollView
                keyboardShouldPersistTaps='handled'
            >
                {/*  */}
                <AddImage openImage={ openImage } listImage={ image } remove={ removeImage } />
                <UnderLineSection />

                {/*  */}
                <NameAndDes label={ 'Tên sản phẩm' } maxLength={ 120 } minLength={ 10 } type={'name'} />
                <UnderLineSection />
                <NameAndDes label={ 'Mô tả sản phẩm' } maxLength={ 3000 } minLength={ 100 } multiline={ true } type={'des'} />
                <UnderLineSection />

                {/*  */}
                <NoName 
                    icon={'list-outline'} 
                    label={'Danh mục'} 
                    valueDetail={ category.name } 
                    onPress={() => navigation.navigate('AddCategoryProduct', { category: category })} 
                />
                <NoName 
                    icon={'md-layers-outline'} 
                    label={'Phân loại hàng'} 
                    onPress={() => navigation.navigate('ClassifyProduct', { classify: classify })} 
                    hideRequired 
                />
                <NoName 
                    icon={'pricetag-outline'} 
                    label={'Giá'} 
                    showInput={ isEmpty(classify) } 
                    onChangeInput={ handleChangePrice }
                    valueDetail={ price ? price + '' : '' } 
                    hideIconChevron={ isEmpty(classify) }
                    onPress={() =>  !isEmpty(classify) ? navigation.navigate('PriceQuantity', { classify: classify }) : null} 
                />
                <NoName 
                    icon={'file-tray-stacked-outline'} 
                    label={'Kho hàng'} 
                    showInput={ isEmpty(classify) }
                    onChangeInput={ handleChangeQuantity }
                    valueDetail={ quantity ? quantity + '' : '' }
                    hideIconChevron={ isEmpty(classify) }
                    onPress={() =>  !isEmpty(classify) ? navigation.navigate('PriceQuantity', { classify: classify }) : null} 
                />
                <NoName 
                    icon={'rocket-outline'}
                    label={'Phí vận chuyển'}
                    showInput={ true }
                    onChangeInput={ handleChangeTransportFee }
                    valueDetail={ transportfee ? transportfee + '' : '' }
                    hideIconChevron
                />
                <UnderLineSection />

            </ScrollView>
            
            <TouchableOpacity style={ styles.button } activeOpacity={0.5} onPress={() => dispatch(postProduct())}>
                <Text style={ styles.txtButton }>Đăng bán</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    button: {
        backgroundColor: violet,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15
    },
    txtButton: {
        color: '#fff',
        fontSize: 15
    }
})

export default React.memo(AddProductScreen)