import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Dimensions
} from 'react-native'
import { violet } from '../helpers/configs'
import CartHeader from '../components/cartscreen/CartHeader'
import Entypo from 'react-native-vector-icons/Entypo'
import { useDispatch, useSelector } from 'react-redux'
import { changeContact, clearDeliveryAddress } from '../redux/actions/cartAction'
import { COLORS } from '../theme'


const HEIGHT = Dimensions.get('window').height

const NewAddress = ({ navigation }) => {

    const { address, contact } = useSelector(state => state.cartReducer.deliveryAddress)
    // console.log(contact)
    const dispatch = useDispatch()
    const initial = useRef(JSON.stringify({...address, ...contact}))
    const [contactState, setContactSate] = useState(JSON.parse(JSON.stringify({...contact})))

    const checkChange = React.useCallback(() => {
        return initial.current !== JSON.stringify({...address, ...contact})
    }, [address, contact, initial, contactState])

    const isValid = React.useCallback(() => {
        return (
            ((initial.current !== JSON.stringify({...address, ...contact})) ||
            (JSON.stringify({...contact}) !== JSON.stringify({...contactState})))
            &&
            (contactState.name !== '' && contactState.phone !== '' && contactState.street !== '')
        )
    }, [address, contact, initial, contactState])

    const handleComplete = useCallback(() => {
        dispatch(changeContact({...contactState}))
        navigation.goBack()
    }, [address, contact, contactState])

    // checkChange()
    console.log(checkChange())
    return (
        <View style={ styles.container }>
            <CartHeader 
                label={'Address'} 
                goBack={() => {
                        if(checkChange()) {
                            dispatch(clearDeliveryAddress())
                        }
                        navigation.goBack()
                        // dispatch(deleteVoucher())
                    }
                }
            />
            <View style={{ flex: 1 }}>
                <View>
                    <Text style={ styles.title }>Contact</Text>
                    <TextInput
                        value={ contactState.name }
                        onChangeText={text => setContactSate({
                            ...contactState,
                            name: text
                        })}
                        style={ styles.input }
                        placeholder='Name'
                    />
                    <TextInput 
                        value={ contactState.phone }
                        onChangeText={text => setContactSate({
                            ...contactState,
                            phone: text
                        })}
                        style={ styles.input }
                        placeholder='Phone'
                        keyboardType='numeric'
                    />
                </View>
                <View>
                    <Text style={ styles.title }>Address</Text>
                    <TouchableOpacity 
                        style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}
                        onPress={() => navigation.navigate('SelectAddress')}
                    >
                        <TextInput
                            value={
                                Object.values(address).every(item => item !== null) ?
                                '- ' + address.province?.name + '\n'
                                + '- ' + address.district?.name + '\n' 
                                + '- ' + address.ward?.name 
                                : ''
                            }
                            style={[ styles.input, { flex: 1 } ]}
                            placeholder='Province/City, County/District, Ward/Commune'
                            editable={ false }
                            multiline
                        />
                        <Entypo style={{ marginRight: 12 }} name={ 'chevron-thin-right' } size={ 13 } color={ 'gray' } />
                    </TouchableOpacity>
                    <TextInput
                        value={ contactState.street }
                        onChangeText={text => setContactSate({
                            ...contactState,
                            street: text
                        })}
                        style={ styles.input }
                        placeholder='Street name, house number'
                    />
                </View>
            </View>
            <TouchableOpacity
                disabled={ isValid() === false }
                style={[ styles.completeBtn , { opacity: isValid() === false ? 0.5 : 1 }]}
                onPress={ handleComplete }
            >
                <Text style={{ color: COLORS.dark, fontWeight: 'bold', fontSize: 16 }}>Complete</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        color: '#000',
        padding: 12
    },
    input: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: '#f2f2f2',
        paddingHorizontal: 12,
        color: '#000'
    },
    completeBtn: {
        // position: 'absolute',
        // bottom: 0,
        width: '80%',
        // marginTop: 250,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        padding: 18,
        marginBottom: 8,
        borderRadius: 15,
        zIndex: 100
    }
})

export default NewAddress