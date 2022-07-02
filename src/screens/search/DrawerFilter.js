import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
    StatusBar
} from 'react-native'
import Animated from 'react-native-reanimated'
import { FlatList, PanGestureHandler } from 'react-native-gesture-handler'
import { SCREEN } from '../../utils/configs'
import { COLORS } from '../../utils'
import useFetchCategories from '../../hooks/useFetchCategories'
import { getAllCategory } from '../../api/categoriesApi'


const ItemCategory = React.memo(({ item, onPress, isSelect }) => {
    return (
        <TouchableOpacity 
            style={{
                backgroundColor: '#f2f2f2',
                padding: 8,
                marginHorizontal: 16,
                marginVertical: 3,
                width: (SCREEN.WIDTH / 3) - 32,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: isSelect ? COLORS.primary : '#f2f2f2'
            }}
            onPress={ onPress }
        >
            <Text numberOfLines={ 1 }>{ item.name }</Text>
        </TouchableOpacity>
    )
})

const DrawerFilter = React.memo(({ onGestureEvent, style, onChangeFilter, value }) => {

    const [filters, setFilters] = useState(value)
    const [categories, setCategories] = useState([])
    // const categories = useFetchCategories()

    useEffect(() => {
        setFilters(value)
    }, [value])

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = React.useCallback(async () => {
        try {
            const res = await getAllCategory()
            setCategories([...res.data.categories])
        }
        catch(error) {
            console.log(error.response.data)
        }
    }, [])

    const handleSelectCategory = React.useCallback((_id) => {
        if(_id !== filters.category) {
            setFilters({
                ...filters,
                category: _id
            })
        }
        else {
            setFilters({
                ...filters,
                category: ''
            })
        }
    }, [filters])

    const isValid = () => {

        return (
            (
                +filters.max > +filters.min
                || 
                // (
                    (filters.max === '' && filters.min === '')
                    // || (filters.price.max !== 0 && filters.price.min !== 0)
                // )
                || (filters.max === 0 && filters.min === 0)
            )
            // && filters.category !== ''
            && JSON.stringify(filters) !== JSON.stringify(value)
        )
    }

    return (
        <PanGestureHandler
            onGestureEvent={ onGestureEvent }
        >
            <Animated.View
                style={[ 
                    styles.container,
                    style
                ]}
            >
                <View style={ styles.searchFilterContainer }>
                    <Text style={ styles.searchFilterText }>Search filter</Text>
                </View>

                <View style={ styles.bodyContainer }>
                    <Text style={ styles.filterTitle }>Price Range (đ)</Text>
                    <View style={ styles.filterPrice }>
                        <TextInput
                            style={ styles.filterInPut }
                            placeholder='MIN'
                            keyboardType='numeric'
                            value={ filters.min.toString() }
                            onChangeText={text => setFilters({
                                ...filters,
                                min: +text.replace(/[^0-9]/g, '')
                            })}
                        />

                        <View style={{ backgroundColor: '#969696', height: 1, width: 10, marginHorizontal: 8 }}/>

                        <TextInput
                            style={ styles.filterInPut }
                            placeholder='MAX'
                            keyboardType='numeric'
                            value={ filters.max.toString() }
                            onChangeText={text => setFilters({
                                ...filters,
                                max: +text.replace(/[^0-9]/g, '')
                            })}
                        />
                    </View>

                    <Text style={ styles.filterTitle }>Category ({ categories.length })</Text>
                    <View style={ styles.categoriesContainer }>
                        <FlatList
                            scrollEnabled={ false }
                            numColumns={ 2 }
                            data={ categories }
                            renderItem={({item, index}) => (
                                <ItemCategory 
                                    key={ index } 
                                    item={ item } 
                                    onPress={() => handleSelectCategory(item._id)}
                                    isSelect={ filters.category === item._id }
                                />
                            )}
                        />
                    </View>
                </View>

                <View style={ styles.buttonContainer }>
                    <TouchableOpacity 
                        style={ styles.resetButton }
                        onPress={() => {
                            onChangeFilter({
                                min: '',
                                max: '',
                                category: ''
                            })
                        }}
                    >
                        <Text style={ styles.resetText }>Reset</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={ !isValid() }
                        style={[ styles.applyButton, { opacity: !isValid() ? 0.5 : 1 } ]}
                        onPress={() => {
                            onChangeFilter(filters)
                        }}
                    >
                        <Text style={ styles.applyText }>Apply</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </PanGestureHandler>
        
    )
})

const button = {
    flex: 1,
    alignItems: 'center',
    borderRadius: 2,
    paddingVertical: 12
}

const styles = StyleSheet.create({
    container: {
        width: (SCREEN.WIDTH / 3) * 2,
        height: SCREEN.HEIGHT,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'white',
        zIndex: 100
    },
    searchFilterContainer: {
        backgroundColor: '#f2f2f2',
        paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
    },
    searchFilterText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '500',
        padding: 12
    },

    bodyContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    filterTitle: {
        color: '#000',
        padding: 12
    },
    filterPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        padding: 12
    },
    filterInPut: {
        flex: 1,
        textAlign: 'center',
        backgroundColor: 'white',
        padding: 0,
        borderWidth: 0.2,
        borderColor: '#969696'
    },
    categoriesContainer: {

    },

    buttonContainer: {
        // width: (SCREEN.WIDTH / 3) * 2,
        // position: 'absolute',
        // bottom: 0,
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderColor: '#f2f2f2',
        padding: 6
    },
    resetButton: {
        ...button,
        marginRight: 3,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: COLORS.primary
    },
    applyButton: {
        ...button,
        marginLeft: 3,
        backgroundColor: COLORS.primary
    },
    resetText: {
        color: COLORS.primary,
    },
    applyText: {
        color: 'white'
    }
})

export default DrawerFilter