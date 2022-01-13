import React, { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useSelector } from 'react-redux'
import { secretApi } from "../api/authApi"
import HeaderProfile from "../components/profilescreen/HeaderProfileComponent"
import Information from "../components/profilescreen/InformationComponent"
import CoinVoucher from "../components/profilescreen/CoinVoucherComponent"
import OrderComponent from "../components/profilescreen/OrderComponent"
import ItemProfile from "../components/profilescreen/ItemProfileComponent"



const ProfileScreen = ({ navigation }) => {

    const [name, setName] = useState('')

    const userToken = useSelector(state => state.authReducer.userToken)

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

    return (
        <View style={ styles.container }>
            {/*  */}
            <HeaderProfile />


            {/*  */}
            <ScrollView
                showsVerticalScrollIndicator={ false }
            >
                {/*  */}
                <Information />
                
                {/*  */}
                <CoinVoucher />

                {/*  */}
                <OrderComponent />

                {/*  */}
                <ItemProfile icon={'storefront-outline'} label={'Cửa hàng'} txtDetail={'Đăng kí miễn phí'} onPress={() => navigation.navigate('stackStore')} />
                <ItemProfile icon={'heart-outline'} label={'Yêu thích'} txtDetail={'21 Likes'} />
                <ItemProfile icon={'storefront-outline'} label={'Cửa hàng'} txtDetail={'Đăng kí miễn phí'} onPress={() => navigation.navigate('stackStore')} />
                <ItemProfile icon={'heart-outline'} label={'Yêu thích'} txtDetail={'21 Likes'} />
                <ItemProfile icon={'storefront-outline'} label={'Cửa hàng'} txtDetail={'Đăng kí miễn phí'} onPress={() => navigation.navigate('stackStore')} />
                <ItemProfile icon={'heart-outline'} label={'Yêu thích'} txtDetail={'21 Likes'} />
                <ItemProfile icon={'storefront-outline'} label={'Cửa hàng'} txtDetail={'Đăng kí miễn phí'} onPress={() => navigation.navigate('stackStore')} />
                <ItemProfile icon={'heart-outline'} label={'Yêu thích'} txtDetail={'21 Likes'} />
                <ItemProfile icon={'storefront-outline'} label={'Cửa hàng'} txtDetail={'Đăng kí miễn phí'} onPress={() => navigation.navigate('stackStore')} />
                <ItemProfile icon={'heart-outline'} label={'Yêu thích'} txtDetail={'21 Likes'} />
                
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})

export default ProfileScreen