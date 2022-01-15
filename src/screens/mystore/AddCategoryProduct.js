import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getAllCategory } from '../../api/categoriesApi'
import HeaderStore from '../../components/storescreen/HeaderStore'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryProduct } from '../../redux/actions/myStoreAction'


const AddCategoryProduct = ({ navigation }) => {

    const [categories, setCategories] = useState([])
    const dispatch = useDispatch()
    const categorySelected = useSelector(state => state.myStoreReducer.category)

    useEffect(() => {
        getAllCategory().then(res => setCategories([...res.data.categories])).catch(error => console.log(error))
    }, [])

    const handleSelect = (category) => {
        dispatch(setCategoryProduct(category))
        navigation.goBack()
    }

    return (
        <View style={ styles.container }>
            <HeaderStore label={'Danh mục'} goBack={() => navigation.goBack()} />

            <FlatList 
                data={categories}
                renderItem={({item, index}) => (
                    <TouchableOpacity key={ index } style={ styles.itemContainer } activeOpacity={0.7} onPress={() => handleSelect({ _id: item._id, name: item.name })}>
                        <Text style={{ color: item._id === categorySelected._id ? 'tomato' : '#000' }}>{ item.name }</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 15,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    text: {
        color: '#000'
    }
})

export default AddCategoryProduct