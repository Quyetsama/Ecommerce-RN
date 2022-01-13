import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, Dimensions } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'


const WIDTH = Dimensions.get('window').width

const Information = () => {
    return (
        <View style={ styles.container }>
            <View style={ styles.topContainer }>
                <View style={ styles.avatarContainer }>
                    <Image 
                        style={ styles.avatar }
                        source={{ uri: 'https://static.vecteezy.com/system/resources/previews/004/815/058/non_2x/cute-astronaut-wearing-spacesuit-and-helmet-free-vector.jpg' }}
                    />
                </View>

                <View style={ styles.name_follow_Container }>
                    <View style={ styles.nameContainer }>
                        <Text style={ styles.txtName }>Quyết Sama</Text>
                    </View>
                    <View style={ styles.followContainer }>
                        <View style={ styles.followerContainer }>
                            <Text style={ styles.txtFollower }>Người theo dõi 21</Text>
                        </View>
                        <View style={ styles.followingContainer }>
                            <Text style={ styles.txtFollowing }>Đang theo dõi 28</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={ styles.botContainer }>
                <View style={ styles.itemBot }>
                    <MaterialCommunityIcons name={'phone-outline'} size={21} color={'#969696'} />
                    <Text style={ styles.txtItemBot }>(84)-867-985-106</Text>
                </View>
                <View style={ styles.itemBot }>
                    <MaterialCommunityIcons name={'email-outline'} size={21} color={'#969696'} />
                    <Text style={ styles.txtItemBot }>vanquyetc2vc@gmail.com</Text>
                </View>
            </View>
        </View>
    )
}

const color = '#021961'

const text = {
    color: '#969696',
    fontSize: 11
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20
    },
    topContainer: {
        flexDirection: 'row',
        marginVertical: 20
    },
    avatarContainer: {
        width: (WIDTH / 3) - 40,
        height: (WIDTH / 3) - 40,
        borderRadius: 90,
        overflow: 'hidden'
    },
    avatar: {
        flex: 1,
        width: null,
        height: null
    },
    name_follow_Container: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 20
    },
    nameContainer: {
        paddingBottom: 10
    },
    txtName: {
        color: color,
        fontSize: 18,
        fontWeight: 'bold'
    },
    followContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    followerContainer: {
        paddingRight: 15,
        borderRightWidth: 0.8,
        borderRightColor: color
    },
    txtFollower: {
        ...text
    },
    followingContainer: {
        paddingLeft: 15
    },
    txtFollowing: {
        ...text
    },
    botContainer: {
        marginBottom: 20
    },
    itemBot: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 3
    },
    txtItemBot: {
        color: '#969696',
        marginLeft: 20
    }
})

export default Information