import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import UnderLineSection from '../../components/UnderLineSection'
import HeaderStore from '../../components/storescreen/HeaderStore'
import AddImage from '../../components/storescreen/AddImage'
import NameAndDes from '../../components/storescreen/NameAndDes'
import { violet } from '../../helpers/configs'
import { useDispatch, useSelector } from 'react-redux'


const data = [
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80',
    'https://images.unsplash.com/photo-1553456558-aff63285bdd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
]

const AddProductScreen = ({ navigation }) => {

    const [images, setImages] = useState(data)

    const removeImage = (id) => {
        const newImages = images.filter((item, index) => index !== id)
        setImages(newImages)
    }

    return (
        <View style={ styles.container }>
            <HeaderStore label={'Thêm sản phẩm'} goBack={() => navigation.goBack()} />

            <ScrollView
                keyboardShouldPersistTaps='handled'
            >
                {/*  */}
                <AddImage listImage={ images } remove={ removeImage } />
                <UnderLineSection />

                {/*  */}
                <NameAndDes label={ 'Tên sản phẩm' } maxLength={ 120 } minLength={ 10 } />
                <UnderLineSection />
                <NameAndDes label={ 'Mô tả sản phẩm' } maxLength={ 3000 } minLength={ 100 } multiline={ true } />
                <UnderLineSection />

            </ScrollView>
            
            <TouchableOpacity style={ styles.button } activeOpacity={0.5}>
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

export default AddProductScreen