import React, { useEffect, useState, useCallback } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Modal, StatusBar } from "react-native"
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/actions/authAction'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { secretApi } from "../api/authApi"
import HeaderProfile from "../components/profilescreen/HeaderProfileComponent"
import Information from "../components/profilescreen/InformationComponent"
import CoinVoucher from "../components/profilescreen/CoinVoucherComponent"
import OrderComponent from "../components/profilescreen/OrderComponent"
import ItemProfile from "../components/profilescreen/ItemProfileComponent"
import LoadingModal from '../components/modal/LoadingModal'



const ProfileScreen = ({ navigation }) => {

    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { userToken, fullName, coin, email } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     if(userToken) {
    //         secretApi(userToken).then(res => {
    //             setName(res.data.profile.firstName + '-' + res.data.profile.lastName)
    //             // console.log(res.data.profile.firstName)
    //         })
    //     }
    //     else {
    //         setName('')
    //     }
    // }, [userToken])

    const handleSignIn = useCallback(() => {
        navigation.navigate('stackAuth', { screen: 'SignIn' })
    }, [])

    const handleSignUp = useCallback(() => {
        navigation.navigate('stackAuth', { screen: 'SignUp' })
    }, [])

    const handleLogout = useCallback(async () => {
        setIsLoading(true)
        await AsyncStorage.removeItem('userToken')
        dispatch(logout())
        setIsLoading(false)
    }, [isLoading])

    const goToStore = useCallback(() => {
        navigation.navigate('myStore')
    }, [])

    const goToStoreVoucher = useCallback(() => {
        navigation.navigate('Voucher')
    }, [])

    const goToHistory = useCallback(() => {
        userToken ? navigation.navigate('History') : handleSignIn()
    }, [userToken])

    return (
        <View style={ styles.container }>
            {/*  */}
            <HeaderProfile navigation={ navigation } />

            {/*  */}
            <ScrollView
                contentContainerStyle={{ justifyContent: 'center', paddingBottom: 100 }}
                showsVerticalScrollIndicator={ false }
            >

                <Information 
                    isLogin={ userToken ? true : false } 
                    fullName={ fullName }
                    email={ email }
                    onSignIn={ handleSignIn } 
                    onSignUp={ handleSignUp } 
                />
        
                <CoinVoucher coin={ coin } onCLickVoucher={ goToStoreVoucher } />

                <OrderComponent onHistory={ goToHistory } />

                <ItemProfile icon={'storefront-outline'} label={'Cửa hàng'} txtDetail={'Đăng kí miễn phí'} chevron onPress={goToStore} />
                <ItemProfile icon={'heart-outline'} label={'Yêu thích'} txtDetail={'21 Likes'} chevron />

                {userToken &&
                    <TouchableOpacity style={ styles.logoutBtn }>
                        <ItemProfile icon={'logout'} color={'red'} label={'Log out'} onPress={handleLogout} />
                    </TouchableOpacity>
                }
            </ScrollView>
            
            <Modal
                transparent={ true }
                animationType='fade'
                visible={ isLoading }
                onRequestClose={() => setIsLoading(false) }
            >
                <LoadingModal />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    logoutBtn: {
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2'
    }
})

export default ProfileScreen