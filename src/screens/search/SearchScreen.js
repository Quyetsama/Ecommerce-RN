import React, { useState, useEffect } from "react"
import { 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View,
    Platform,
    StatusBar,
    TextInput
} from "react-native"
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SearchDebounce from "../../components/search/SearchDebounce"
import { searchProduct, suggestProduct } from "../../api/productApi"
import { COLOR } from '../../helpers/configs'
import { COLORS } from "../../theme"


let timeOut

const deBounce = (func, delay) => {
    return (...args) => {
        if(timeOut) clearTimeout(timeOut)
        timeOut = setTimeout(() => {
            func.apply(null, args)
        }, delay)
    }
}

const SearchBar = React.memo(({ query, handleChange, handleSubmit, goBack }) => {

    return (
        <View style={ styles.searchBar }>
            <View style={ styles.inputContainer }>
                <Ionicons name={'search'} size={21} color={'#969696'} />
                <TextInput
                    style={ styles.searchInput }
                    placeholder='Search...'
                    autoFocus
                    value={ query }
                    onChangeText={ handleChange }
                    onSubmitEditing={ handleSubmit }
                />
                {
                    query.length > 0 &&
                    <Ionicons onPress={() => handleChange('')} name={'close-circle'} size={18} color={'#969696'} />
                }
            </View>
            <TouchableOpacity
                onPress={ goBack }
            >
                <Text style={{ color: COLORS.dark, fontSize: 15, fontWeight: '500' }}>Cancel</Text>
            </TouchableOpacity>
        </View>
    )
})

const SearchScreen = ({ route, navigation }) => {

    const [query, setQuery] = useState(route.params?.query ? route.params?.query : '')
    const [suggest, setSuggest] = useState([])
    const [data, setData] = useState({
        type: query !== '' ? 1 : 0,
        data: []
    })
    const [notFound, setNotFound] = useState('')

    useEffect(() => {
        if(query !== '') {
            handleChange(query)
        }
        fetchSuggest()
    }, [])

    const fetchSuggest = async () => {
        const res = await suggestProduct()
        setSuggest([...res.data.data])
        setData({
            type: 0,
            data: [...res.data.data]
        })
    }

    const handleChange = (text) => {
        setQuery(text)
        deBounceSearch(text.trim())
    }

    const handleSearch = async (value) => {
        try {
            if(value.trim() === '') {
                setData({
                    type: 0,
                    data: [...suggest]
                })
                setNotFound('')
            }
            else {
                const res = await searchProduct(value)

                if(res.data.data.length > 0) {
                    setData({
                        type: 1,
                        data: [...res.data.data]
                    })
                    setNotFound('')
                }
                else {
                    setData({
                        type: 2,
                        data: []
                    })
                    setNotFound('Not Found')
                }
            }
        }
        catch(error) {
            console.log(error.response.data)
        }
    }

    const deBounceSearch = deBounce(handleSearch, 500)

    const handleSubmit = React.useCallback(() => {
        // navigation.goBack()
        if(query.trim() !== '') {
            navigation.push('SearchResult', {
                query: query
            })
        }
        
    }, [query])

    return (
        <View style={ styles.container }>
            <StatusBar translucent barStyle='dark-content' />
            <SearchBar
                query={ query }
                handleChange={ handleChange }
                handleSubmit={ handleSubmit }
                goBack={() => navigation.goBack()}
            />
            <SearchDebounce data={ data } notFound={ notFound } onSeeMore={ handleSubmit } />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    searchBar: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
        elevation: 3,
        paddingHorizontal: 18,
        paddingVertical: 8
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginRight: 12
    },
    searchInput: {
        flex: 1,
        paddingHorizontal: 8,
        padding: 6
    }
})

export default SearchScreen