import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Modal
} from 'react-native'
import { getAllCity, getAllDistrict, getAllWard } from '../api/addressApi'
import CartHeader from '../components/cartscreen/CartHeader'
import { COLORS } from '../utils'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import LoadingModal from '../components/modal/LoadingModal'
import { useDispatch, useSelector } from 'react-redux'
import { addAddress, clearAddress } from '../redux/actions/cartAction'


const SelectedArea = React.memo(({ address, onChange, onReset }) => {
    return (
        <View style={ styles.selectedArea }>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={ styles.title }>Selected area</Text>
                <Text onPress={ onReset } style={[ styles.title, { color: COLORS.primary } ]}>Reset</Text>
            </View>
            <View style={{ paddingVertical: 12 }}>
                <TouchableOpacity 
                    disabled={ !address.province }
                    style={{ flexDirection: 'row', alignItems: 'center' }} 
                    onPress={() => onChange(1)}
                >
                    <Entypo name='dot-single' size={32} color={ address.selected === 1 ? COLORS.primary : COLORS.gray } />
                    <Text style={{ color: address.selected === 1 ? COLORS.primary : COLORS.gray }}>{ address.province ? address.province.name : 'Province/ City' }</Text>
                </TouchableOpacity>
                <View style={{ borderLeftWidth: 1, borderLeftColor: COLORS.gray, height: 24, marginLeft: 16 }} />
                <TouchableOpacity
                    disabled={ !address.province }
                    style={{ flexDirection: 'row', alignItems: 'center' }} 
                    onPress={() => onChange(2)}
                >
                    <Entypo name='dot-single' size={32} color={ address.selected === 2 ? COLORS.primary : COLORS.gray } />
                    <Text style={{ color: address.selected === 2 ? COLORS.primary : COLORS.gray }}>{ address.district ? address.district.name : 'Country/ District' }</Text>
                </TouchableOpacity>
                <View style={{ borderLeftWidth: 1, borderLeftColor: COLORS.gray, height: 24, marginLeft: 16 }} />
                <TouchableOpacity 
                    disabled={ !address.district }
                    style={{ flexDirection: 'row', alignItems: 'center' }} 
                    onPress={() => onChange(3)}
                >
                    <Entypo name='dot-single' size={32} color={ address.selected >= 3 ? COLORS.primary : COLORS.gray } />
                    <Text style={{ color: address.selected === 3 ? COLORS.primary : COLORS.gray }}>{ address.ward ? address.ward.name : 'Ward/ Commune' }</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
})

const Item = React.memo(({ item, handleSelect, selected }) => {
    return (
        <TouchableOpacity style={ styles.itemButton } activeOpacity={ 0.8 } onPress={() => handleSelect(item)}>
            <Text style={ styles.itemText }>{ item.name }</Text>
            {
                selected &&
                <Feather name='check' size={24} color={ COLORS.primary } />
            }
        </TouchableOpacity>
    )
})

const SelectAddress = ({ navigation }) => {

    const { address } = useSelector(state => state.cartReducer.deliveryAddress)
    const dispatch = useDispatch()

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // setIsLoading(true)
        if(address.selected === 1) {
            fetchCity()
        }
        else if(address.selected === 2 && address.province) {
            fetchDistrict()
        }
        else if(address.selected === 3 && address.province && address.district ) {
            fetchWard()
        }
    }, [address.selected])

    const fetchCity = async () => {
        try{
            setIsLoading(true)
            const cities = await getAllCity()
            // console.log(cities.data)
            setData(cities.data)
            setIsLoading(false)
        }
        catch(error) {
            console.log(error.response.data)
            setIsLoading(false)
        }
    }

    const fetchDistrict= async () => {
        try{
            setIsLoading(true)
            const districts = await getAllDistrict(address.province.code)
            // console.log(districts.data)
            setData(districts.data.districts)
            setIsLoading(false)
        }
        catch(error) {
            console.log(error.response.data)
            setIsLoading(false)
        }
    }

    const fetchWard = async () => {
        try{
            setIsLoading(true)
            const wards = await getAllWard(address.district.code)
            // console.log(wards.data)
            setData(wards.data.wards)
            setIsLoading(false)
        }
        catch(error) {
            console.log(error.response.data)
            setIsLoading(false)
        }
    }

    const changeData = React.useCallback((index) => {
        dispatch(addAddress({
            ...address,
            selected: index
        }))
    }, [address])

    const handleSelect = React.useCallback((item) => {
        // setIsLoading(true)
        if(address.selected === 1) {
            dispatch(addAddress({
                province: item,
                district: null,
                ward: null,
                selected: address.selected + 1
            }))
        }
        else if(address.selected === 2) {
            dispatch(addAddress({
                ...address,
                district: item,
                ward: null,
                selected: address.selected + 1
            }))
        }
        else {
            // setAddress({
            //     ...address,
            //     ward: item
            // })
            setIsLoading(false)
            dispatch(addAddress({...address, ward: item}))
            navigation.goBack()
        }
    }, [address])

    const handleReset = React.useCallback(() => {
        dispatch(clearAddress())
    }, [])

    // console.log('render')
    return (
        <View style={ styles.container }>
            <CartHeader 
                label={'Select Address'} 
                goBack={() => {
                        if(Object.values(address).some(item => item === null)) {
                            handleReset()
                        }
                        navigation.goBack()
                    }
                }
            />
            <SelectedArea address={ address } onChange={ changeData } onReset={ handleReset } />
            <Text style={ styles.title }>Province/ City</Text>
            <FlatList
                removeClippedSubviews
                data={ data }
                keyExtractor={item => item.codename}
                renderItem={({ item }) => 
                    (
                        <Item 
                            item={ item } 
                            selected={
                                item.codename === address.province?.codename ? true : 
                                item.codename === address.district?.codename ? true : 
                                item.codename === address.ward?.codename ? true : 
                                false 
                            }  
                            handleSelect={ handleSelect }
                        />
                    )
                }
            />

            <Modal
                transparent={ true }
                animationType='fade'
                visible={ isLoading }
            >
                <LoadingModal />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    selectedArea: {
        backgroundColor: 'white'
    },
    title: {
        fontSize: 13,
        padding: 12
    },
    itemButton: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        padding: 12
    },
    itemText: {
        flex: 1,
        color: '#000'
    }
})

export default SelectAddress