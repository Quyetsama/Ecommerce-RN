import React, { useState, useRef, useEffect, forwardRef } from "react"
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView, FlatList, Dimensions } from "react-native"
import all from '../assets/img/all.png'
import clothes from '../assets/img/clothes.png'
import shoes from '../assets/img/shoes.png'
import food from '../assets/img/food.png'
import smarthome from '../assets/img/smarthome.png'
import electronic from '../assets/img/electronic.png'
import accessories from '../assets/img/accessories.png'
import ItemCategories from "./ItemCategories"
import { doMain } from "../helpers/configs"
import { getAllCategory } from "../api/categoriesApi"


const Categories = ({ onLayout, onPress }) => {

    const [categories, setCategories] = useState([])
    const [indexSelected, setIndexSelected] = useState(0)
    const Flatlist = useRef()

    useEffect(() => {
        getAllCategory().then(res => {
            setCategories([{
                _id: 'all',
                name: 'Tất cả',
                image: 'image/all.png'
            }, 
                ...res.data.categories
            ])
        })
        .catch(error => console.log(error))
    }, [])

    const handleScrollCategory = (index) => {
        Flatlist.current.scrollToIndex({
            animated: true,
            index: index,
            // viewPosition: 1,

            // -40 vi item width = 80
            viewOffset: (Dimensions.get('window').width / 2) - 40
          })
          
          setIndexSelected(index)
    }

    // console.log('Categories render')

    return (
        <View onLayout={onLayout} style={ styles.container }>
            <FlatList
                ref={Flatlist}
                contentContainerStyle={ styles.flatlistContainer }
                horizontal
                showsHorizontalScrollIndicator={ false }
                data={categories}
                keyExtractor={(item) => item._id}
                renderItem={({item, index}) => (
                    <ItemCategories
                        onPress={() => {
                            handleScrollCategory(index)
                            onPress(item._id)        
                        }}
                        image={ doMain + item.image }
                        text={ item.name }
                        indexSelected={ index === indexSelected ? true : false }
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#f0f1f2'
    },
    flatlistContainer: {
        // backgroundColor: 'red',
        paddingVertical: 5,
        paddingLeft: 5
    },
    itemContainer: {
        width: 80,
        height: 80,
        alignItems: 'center',
        backgroundColor: '#fff',
        marginRight: 5,
    },
    imgContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#f2f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginVertical: 5
    },
    img: {
        width: 20,
        height: 20
    },
    text: {
        fontSize: 12,
        textAlign: 'center'
    }
})

export default React.memo(Categories)