import React, { useState, useRef, useEffect } from "react"
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList, Dimensions } from "react-native"
import { useSelector } from 'react-redux'
import useFetchCategories from "../hooks/useFetchCategories"
import { COLORS } from "../utils"


const ItemCategory = React.memo(({ item, isSelect, onSelect }) => {

    const [width, setWidth] = useState(0)
    // const itemRef = useRef()

    // itemRef?.current?.measure((ox, oy, width, height, px, py) => {
    //     console.log('measure ' + item.name + ' - ' + width)
    // })

    return (
        <TouchableOpacity
            // ref={ itemRef }
            onLayout={ e => {
                // console.log('WIDTH', e.nativeEvent.layout.width)
                // console.log('WIDTH ' + item.name + ' - ' + e.nativeEvent.layout.width)
                setWidth(e.nativeEvent.layout.width)
            }}
            style={[ styles.itemCategoryBtn, { backgroundColor: isSelect ? COLORS.primary : COLORS.white } ]}
            onPress={() => {
                onSelect(width)
            }}
        >
            <Text style={[ styles.itemCategoryTxt, { color: isSelect ? COLORS.white : COLORS.gray } ]}>{ item.name }</Text>
        </TouchableOpacity>
    )
})

const Categories = ({ onLayout, onPress }) => {

    const { refreshing, category } = useSelector(state => state.homeReducer)

    const categories = useFetchCategories()
    const Flatlist = useRef()

    useEffect(() => {
        if(refreshing && categories.length) {
            handleScrollCategory(0, 0)
        }
    }, [refreshing, categories])

    const handleScrollCategory = (index, width) => {
        // console.log(width)
        Flatlist.current.scrollToIndex({
            animated: true,
            index: index,
            // viewPosition: 1,

            // -40 vi item width = 80
            viewOffset: (Dimensions.get('window').width / 2) - (width / 2)
          })
    }

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
                    <ItemCategory 
                        item={ item }
                        isSelect={ item._id === category.id ? true : false }
                        onSelect={(width) => {
                            onPress(item._id)  
                            handleScrollCategory(index, width)
                        }}
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
        // paddingVertical: 5,
        // paddingLeft: 5
        backgroundColor: COLORS.white,
        paddingTop: 6,
        paddingBottom: 18,
        paddingLeft: 18
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
    },

    itemCategoryBtn: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        backgroundColor: COLORS.white,
        marginRight: 18,
        elevation: 5
    },
    itemCategoryTxt: {
        color: COLORS.primary,
        fontWeight: 'bold'
    }
})

export default React.memo(Categories)