import React from "react"
import { 
    Dimensions,
    Keyboard,
    ScrollView,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    View
} from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ItemFeature from "./ItemFeatureComponent"



const widthScreen = Dimensions.get('window').width

const FeaturesComponent = () => {

    console.log('Features render')

    return (
        <View style={ styles.featuresContainer }>
            <Text style={ styles.title }>Tiện ích</Text>
            <View style={ styles.listItemFeature }>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <ItemFeature color={'#9900ff'} icon={'cellphone-wireless'} text={'Mua mã thẻ'} />
                    <ItemFeature color={'#00aeff'} icon={'calendar-month'} text={'Điểm danh'} />
                    <ItemFeature color={'#00db04'} icon={'ticket-percent-outline'} text={'Săn Voucher'} />
                    <ItemFeature color={'red'} icon={'heart-multiple-outline'} text={'Sản phẩm yêu thích'} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                {/* receipt tag-multiple truck-check-outline */}
                    <ItemFeature color={'#00aeff'} icon={'script-text-outline'} text={'Đơn hàng'} />
                    <ItemFeature color={'#00db04'} icon={'monitor-cellphone'} text={'Siêu thị điện tử'} />
                    <ItemFeature color={'#fa4820'} icon={'food'} text={'Đồ ăn'} />
                    <ItemFeature color={'#9900ff'} icon={'dresser-outline'} text={'Nội thất'} />
                </View>
            </View>
        </View>
    )
}

const color = '#34A853'

const styles = StyleSheet.create({
    featuresContainer: {
        backgroundColor: '#fff',
        marginTop: 10
    },
    title: {
        // fontFamily: 'Entypo',
        fontSize: 18,
        fontWeight: '800',
        // color: '#000',
        marginLeft: 10
    },
    listItemFeature: {
        flex: 1,
        width: widthScreen, 
        height: 200, 
        paddingHorizontal: 30
    }
})

export default React.memo(FeaturesComponent)