import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, Dimensions } from 'react-native'
import { COLORS, WINDOW_WIDTH , WINDOW_HEIGHT } from '../../utils'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { navigationRef } from '../../navigation/RootNavigation'




const Information = ({ isLogin, fullName, email, onSignIn, onSignUp }) => {

    return (
        <View style={ styles.container }>

                {isLogin
                    ?
                    <View style={ styles.topContainer }>
                        <View style={ styles.avatarContainer }>
                            <Image 
                                style={ styles.avatar }
                                source={{ uri: 'https://static.vecteezy.com/system/resources/previews/004/815/058/non_2x/cute-astronaut-wearing-spacesuit-and-helmet-free-vector.jpg' }}
                            />
                        </View>
                        <View style={ styles.name_follow_Container }>
                            <View style={ styles.nameContainer }>
                                <Text style={ styles.txtName }>{ fullName }</Text>
                                <MaterialCommunityIcons name='square-edit-outline' color={ COLORS.primary } size={ 20 } onPress={() => navigationRef.navigate('EditProfile')} />
                            </View>
                            <Text style={ styles.txtItemBot }>{ email }</Text>
                        </View>
                    </View>
                    :
                    <View style={ styles.authContainer }>
                        <TouchableOpacity 
                            style={[ styles.authButton, { backgroundColor: COLORS.primary, marginRight: 8 } ]}
                            activeOpacity={0.8}
                            onPress={ onSignIn }
                        >
                            <Text style={[ styles.authText, { color: 'white' } ]}>Sign In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[ styles.authButton, { backgroundColor: 'white' } ]}
                            activeOpacity={0.8}
                            onPress={ onSignUp }
                        >
                            <Text style={[ styles.authText, { color: COLORS.primary } ]}>Sign Up</Text>
                        </TouchableOpacity>
                    </View> 
                }
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
        width: (WINDOW_WIDTH / 3) - 40,
        height: (WINDOW_WIDTH / 3) - 40,
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10
    },
    txtName: {
        color: color,
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10
    },
    authContainer: {
        height: WINDOW_HEIGHT - 300,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    authButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: COLORS.primary
    },
    authText: {
        
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
        color: '#969696'
    }
})

export default React.memo(Information)