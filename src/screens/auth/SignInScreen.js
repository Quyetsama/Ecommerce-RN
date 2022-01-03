import React, { useEffect, useState } from "react"
import { 
    Dimensions, 
    Image, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View, ScrollView, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback, 
    Keyboard,
    Alert
} from "react-native"
import fb from '../../assets/img/facebook.png'
import gg from '../../assets/img/google.png'
import Fontisto from 'react-native-vector-icons/Fontisto'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StatusBar } from 'react-native'
import { Formik } from 'formik'
import { SignInSchema } from "../../helpers/validation"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { login } from "../../redux/actions/authAction"
import { getAllUser, signInApi } from "../../api/authApi"
import axiosClient from "../../api/axiosClient"



const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height

const SignInScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const [hidePass, setHidePass] = useState(true)

    const handleSignIn = async (values) => {
        // fetch api => token
        let token = 'TokenQ'
        try{
            const res = await signInApi(values)
            // console.log(res.data)
            token = res.data.token
            await AsyncStorage.setItem('userToken', token)
            dispatch(login(values.email, token))
        }
        catch(error) {
            console.log(error.response.data)
            if(error.response.data === 'Unauthorized'){
                Alert.alert('Thất bại!', 'Tài khoản hoặc mật khẩu không chính xác')
            }
        }
    }

    const isFormValid = (isValid, touched) => {
        return isValid && Object.keys(touched).length != 0
    }

    return (
        // <KeyboardAvoidingView
        //     behavior="height"
        //     style={{ flex: 1, backgroundColor: 'red' }}
        // >
            // {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
            // <ScrollView contentContainerStyle={{ flexGrow: 1 }}  keyboardShouldPersistTaps='handled'>
            <>
            <TouchableOpacity style={{ position: 'absolute', top: 10, left: 5, zIndex: 10 }} onPress={() => navigation.goBack()}>
                <View style={{ position: 'absolute', width: 35, height: 35, backgroundColor: 'gray', borderRadius: 30, opacity: 0.4 }}></View>
                <MaterialCommunityIcons style={{ padding: 5 }} name="keyboard-backspace" size={25} color={'#fff'} />
            </TouchableOpacity>
            <ScrollView style={{ backgroundColor: '#fff' }}  keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}>
                <View style={ styles.container }>
                    <View style={ styles.headerContainer } >
                        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons style={{ position: 'relative' }} name="keyboard-backspace" size={30} color={'#fff'} />  
                        </TouchableOpacity> */}
                        {/* <View style={{ flex: 1, justifyContent: 'center' }}> */}
                            <Text style={{ color: '#fff', fontSize: 50, fontWeight: 'bold', textAlign: 'center' }}>Grabee</Text>
                        {/* </View> */}
                        {/* <View style={{ width: 30 }}></View> */}
                    </View>
                    {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}
                    <View style={ styles.bodyContainer } >
                        <View style={ styles.titleSignIn }>
                            <Text style={ styles.signIn }>Đăng Nhập</Text>
                            <View style={ styles.notAccount }>
                                <Text style={ styles.youNotAccount }>Bạn chưa có tài khoản? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                    <Text style={ styles.signUp }>Đăng ký</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={ SignInSchema }
                            onSubmit={values => handleSignIn(values)}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                                <>
                                    <View style={ styles.inputContainer }>
                                        <View style={ styles.fieldContainer }>
                                            <Text style={ styles.titleField }>Email</Text>
                                            <View style={ styles.inputField }>
                                                <MaterialCommunityIcons style={ styles.iconField } name={ 'email-outline' } size={21} color={color} />
                                                <TextInput 
                                                    onChangeText={handleChange('email')}
                                                    onBlur={handleBlur('email')}
                                                    value={values.email}
                                                    style={ styles.input } 
                                                    placeholder={ 'quyetsama@gmai.com' }
                                                />
                                                <Ionicons style={ styles.iconField } name={ !errors.email && touched.email ? 'checkmark' : null } size={21} color={color} />
                                            </View>
                                            {errors.email && touched.email ? (
                                                <Text style={{ color: 'red' }}>{errors.email}</Text>
                                            ) : null}
                                        </View>
                                        <View style={ styles.fieldContainer }>
                                            <Text style={ styles.titleField }>Mật khẩu</Text>
                                            <View style={ styles.inputField }>
                                                <MaterialCommunityIcons style={ styles.iconField } name={ 'shield-lock-outline' } size={21} color={color} />
                                                <TextInput
                                                    onChangeText={handleChange('password')}
                                                    onBlur={handleBlur('password')}
                                                    value={values.password}
                                                    secureTextEntry={ hidePass }
                                                    style={ styles.input } 
                                                    placeholder={ '******' }
                                                />
                                                <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
                                                    <Ionicons style={ styles.iconField } name={ hidePass ? 'eye' : 'eye-off' } size={21} color={color} />
                                                </TouchableOpacity>
                                            </View>
                                            {errors.password && touched.password ? (
                                                <Text style={{ color: 'red' }}>{errors.password}</Text>
                                            ) : null}
                                        </View>
                                    </View>

                                    <View style={{ alignItems: 'flex-end' }}>
                                        <TouchableOpacity>
                                            <Text>Quên mật khẩu?</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={ styles.buttonContainer }>
                                        <TouchableOpacity
                                            disabled={ !isFormValid(isValid, touched) }
                                            onPress={ handleSubmit }
                                            style={[ styles.buttonSignIn, { opacity: isFormValid(isValid, touched) ? 1 : 0.5 } ]}
                                        >
                                            <Text style={ styles.textButtonSignIn }>Đăng Nhập</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </Formik>

                        <View style={ styles.or }>
                            <Text style={{ textAlign: 'center'}}> Hoặc </Text>
                        </View>

                        <View style={ styles.loginWith }>
                            <TouchableOpacity style={{ marginHorizontal: 10, borderRadius: 30, elevation: 0 }}>
                                <Image style={{ width: 30, height: 30 }} source={fb}/>
                            </TouchableOpacity>
                            <TouchableOpacity  style={{ marginHorizontal: 10, borderRadius: 30, elevation: 0 }}>
                                <Image style={{ width: 30, height: 30 }} source={gg}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* </ScrollView> */}
                </View>
            </ScrollView>
            </>
            // {/* </TouchableWithoutFeedback> */}
        // {/* </KeyboardAvoidingView> */}
    )
}

const color = '#34A853'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: widthScreen,
        // height: heightScreen - StatusBar.currentHeight,
        justifyContent: 'center',
        backgroundColor: color
    },
    headerContainer: {
        paddingVertical: 25
    },
    bodyContainer: {
        // flex: 8,
        backgroundColor: '#fff',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingHorizontal: 30
    },
    titleSignIn: {
        marginTop: 40,
        // marginLeft: 30
    },
    signIn: {
        fontSize: 30,
        fontWeight: 'bold',
        color: color
    },
    notAccount: {
        flexDirection: 'row',
        marginTop: 5
    },
    youNotAccount: {
        fontSize: 15,
        fontWeight: '400'
    },
    signUp: {
        fontSize: 15,
        fontWeight: '400',
        color: color
    },
    inputContainer: {
        marginTop: 50
    },
    fieldContainer: {
        marginBottom: 20
    },
    inputField: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: color
    },
    iconField: {
        marginRight: 5
    },
    input: {
        flex: 1,
        paddingHorizontal: 10
    },

    buttonContainer: {
        alignItems: 'center',
        marginTop: 30
    },
    buttonSignIn: {
        width: widthScreen / 2,
        backgroundColor: color,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        elevation: 8
    },
    textButtonSignIn: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },

    loginWith: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10
    },
    or: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    }
})

export default SignInScreen