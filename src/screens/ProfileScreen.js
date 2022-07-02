import React, { useEffect, useState, useCallback } from "react"
import { 
    ScrollView, 
    StyleSheet, 
    Text,
    TouchableOpacity, 
    View, 
    Modal, 
    RefreshControl 
} from "react-native"
import { useSelector, useDispatch } from 'react-redux'
import { logout, setCoin } from '../redux/actions/authAction'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Information from "../components/profilescreen/InformationComponent"
import CoinVoucher from "../components/profilescreen/CoinVoucherComponent"
import OrderComponent from "../components/profilescreen/OrderComponent"
import ItemProfile from "../components/profilescreen/ItemProfileComponent"
import LoadingModal from '../components/modal/LoadingModal'
import { logoutApi, getCoin } from "../api/authApi"
import { getTokenDevice } from "../utils/notification"
import TabHeader from "../components/headers/TabHeader"



const ProfileScreen = ({ navigation }) => {
    
    const { userToken, fullName, coin, email } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const fetchCoin = useCallback(async () => {
        try {
            setRefreshing(true)
            const res = await getCoin(userToken)
            if(res?.data?.success) {
                dispatch(setCoin(+res.data.data))
                setRefreshing(false)
            }
        }
        catch(error) {
            console.log(error)
            setRefreshing(false)
        }       
    }, [userToken])

    const handleSignIn = useCallback(() => {
        navigation.navigate('stackAuth', { screen: 'SignIn' })
    }, [])

    const handleSignUp = useCallback(() => {
        navigation.navigate('stackAuth', { screen: 'SignUp' })
    }, [])

    const handleLogout = useCallback(async () => {
        try {
            setIsLoading(true)
            const tokenDevice = await getTokenDevice()
            const res = await logoutApi(userToken, tokenDevice)
            if(res.data.success) {
                await AsyncStorage.removeItem('userToken')
                dispatch(logout())
                setIsLoading(false)
            }
        }
        catch(error) {
            console.log(error.response.data)
            setIsLoading(false)
        }
    }, [userToken, isLoading])

    const goToStore = useCallback(() => {
        navigation.navigate('myStore')
    }, [])

    const goToStoreVoucher = useCallback(() => {
        navigation.navigate('Voucher')
    }, [])

    const goToHistory = useCallback(() => {
        userToken ? navigation.navigate('HistoryStack') : handleSignIn()
    }, [userToken])

    const goToFavorite = useCallback(() => {
        userToken ? navigation.navigate('Favorite') : handleSignIn()
    }, [userToken])

    return (
        <View style={ styles.container }>
            <TabHeader title={ 'Account' } />

            <ScrollView
                contentContainerStyle={{ justifyContent: 'center', paddingBottom: 100 }}
                showsVerticalScrollIndicator={ false }
                refreshControl={
                    <RefreshControl
                        refreshing={ refreshing }
                        onRefresh={ fetchCoin }
                    />
                }
            >

                <Information 
                    isLogin={ userToken ? true : false } 
                    fullName={ fullName }
                    email={ email }
                    onSignIn={ handleSignIn } 
                    onSignUp={ handleSignUp } 
                />
        

                {/* <OrderComponent onHistory={ goToHistory } /> */}

                {userToken &&
                    <>
                        <CoinVoucher coin={ coin } onCLickVoucher={ goToStoreVoucher } />
                        <ItemProfile icon={'history'} label={'Order history'} txtDetail={'See more'} onPress={ goToHistory } chevron />
                        {/* <ItemProfile icon={'storefront-outline'} label={'Cửa hàng'} txtDetail={'Đăng kí miễn phí'} chevron onPress={goToStore} /> */}
                        <ItemProfile icon={'heart-outline'} label={'Favorites'} onPress={ goToFavorite } chevron />
                        <TouchableOpacity style={ styles.logoutBtn }>
                            <ItemProfile icon={'logout'} color={'red'} label={'Log out'} onPress={handleLogout} />
                        </TouchableOpacity>
                    </>
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