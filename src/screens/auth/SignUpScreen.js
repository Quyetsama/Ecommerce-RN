import React, { useState } from 'react'
import { 
    View, 
    TouchableOpacity, 
    Text, 
    StyleSheet, 
    ImageBackground,
    StatusBar,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    ScrollView,
    Alert,
    Modal,
    Keyboard
} from 'react-native'
import loginBG from '../../assets/img/login.png'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { violet } from '../../helpers/configs'
import LinearGradient from 'react-native-linear-gradient'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Formik } from 'formik'
import { SignUpSchema } from '../../helpers/validation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/actions/authAction'
import { signUpApi } from '../../api/authApi'
import LoadingModal from '../../components/modal/LoadingModal'
import AlertModal from '../../components/modal/AlertModal'




const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


const FieldAuth = ({ iconRight, iconLeft, children, onShowPassword }) => {
    return (
        <View style={ styles.fieldContainer }>
            <MaterialCommunityIcons name={ iconLeft } size={ 22 } color={ '#969696' } />
            {children}
            <Ionicons onPress={ onShowPassword } name={ iconRight } size={ 22 } color={ violet } />
        </View>
    )
}

const SignUpScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const [hidePass, setHidePass] = useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [signUpFailed, setSignUpFailed] = useState(false)

    const handleSignUp = async (values) => {

        console.log(values)
        // fetch api => token
        try{
            setIsModalVisible(true)
            const res = await signUpApi(values)
            if(res.data.success) {
                setIsModalVisible(false)
                navigation.reset({
                    index: 0,
                    routes: [{name: 'SignIn'}]
                })
            }
        }
        catch(error) {
            setIsModalVisible(false)
            if(error.response.status === 403){
                setSignUpFailed(true)
            }
        }
    }

    const isFormValid = (isValid, touched) => {
        return isValid && Object.keys(touched).length != 0
    }

    return (
        <ImageBackground
            style={ styles.loginScreen }
            source={ loginBG }
        >
            <StatusBar translucent barStyle='dark-content' />
            <Feather style={ styles.iconBack } name={'corner-down-left'} size={28} color={'#000'} onPress={() => navigation.goBack()} />
            <KeyboardAwareScrollView
                scrollEnabled={false}
                showsVerticalScrollIndicator={ false }
                contentContainerStyle={{ height: HEIGHT }}
            >
                <View style={ styles.container }>
                    <View style={ styles.topContainer }>
                        <Text style={ styles.loginText }>Sign Up</Text>
                    </View>
                    <Formik
                        initialValues={{ email: '', password: '', fullName: '' }}
                        validationSchema={ SignUpSchema }
                        onSubmit={values => handleSignUp(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                            <>
                                <View style={ styles.authContainer }>
                                    <View style={{ marginTop: 24 }}>
                                        {/* {
                                            errors.fullName && touched.fullName && 
                                            <Text style={{ color: 'red', marginBottom: 6 }}>{errors.fullName}</Text>
                                        } */}
                                        <FieldAuth 
                                            iconLeft={'account-edit-outline'}
                                            iconRight={ !errors.fullName && touched.fullName ? 'checkmark' : null }
                                        >
                                            <TextInput
                                                onChangeText={handleChange('fullName')}
                                                onBlur={handleBlur('fullName')}
                                                value={values.fullName}
                                                style={ styles.input }
                                                placeholder='Full name'
                                            />
                                        </FieldAuth>
                                    </View>

                                    
                                    <View style={{ marginTop: 24 }}>
                                        {/* {
                                            errors.email && touched.email && 
                                            <Text style={{ color: 'red', marginBottom: 6 }}>{errors.email}</Text>
                                        } */}
                                        <FieldAuth 
                                            iconLeft={'email-outline'}
                                            iconRight={ !errors.email && touched.email ? 'checkmark' : null }
                                        >
                                            <TextInput
                                                onChangeText={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                                value={values.email}
                                                style={ styles.input }
                                                placeholder='Email'
                                            />
                                        </FieldAuth>
                                    </View>
                                    
                                    <View style={{ marginTop: 24 }}>
                                        {/* {
                                            errors.password && touched.password && 
                                            <Text style={{ color: 'red', marginBottom: 6 }}>{errors.password}</Text>
                                        } */}
                                        <FieldAuth 
                                            iconLeft={'lock-outline'}
                                            iconRight={ hidePass ? 'eye' : 'eye-off' }
                                            onShowPassword={() => setHidePass(!hidePass)}
                                        >
                                            <TextInput
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                value={values.password}
                                                style={ styles.input }
                                                placeholder='Password'
                                                secureTextEntry={ hidePass }
                                            />
                                        </FieldAuth>
                                    </View>
                                    
                                </View>

                                <View style={ styles.loginBtnContainer }>
                                    <TouchableOpacity
                                        disabled={ !isFormValid(isValid, touched) }
                                        style={[ styles.loginBtn, { opacity: isFormValid(isValid, touched) ? 1 : 0.8 } ]} 
                                        activeOpacity={0.8}
                                        onPress={ handleSubmit }
                                    >
                                        <LinearGradient
                                            style={ styles.gradientBtn }
                                            colors={['#d57dff', '#8240ff']}
                                            start={{ x: 0, y: 1 }}
                                            end={{ x: 1, y: 1 }}
                                        >
                                            
                                                    <Text style={ styles.loginTxtBtn }>SIGN UP</Text>
                                                    <Feather name='corner-down-right' size={20} color={'white'} />
                                            
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </Formik>
                </View>
            <Text style={ styles.registerText }>
                Already have a account?
                <Text style={{ color: violet }} onPress={() => navigation.navigate('SignIn')}> Sign In</Text>
            </Text>
            </KeyboardAwareScrollView>

            <Modal
                transparent={ true }
                animationType='fade'
                visible={ isModalVisible }
                onRequestClose={() => setIsModalVisible(false) }
            >
                <LoadingModal />
            </Modal>
            <Modal
                statusBarTranslucent
                transparent={ true }
                animationType='fade'
                visible={ signUpFailed }
                onRequestClose={() => setSignUpFailed(false)}
            >
                <AlertModal 
                    title={'SignUp Failed'} 
                    content={'Email is already in use. Please try again.'}
                    changeModalVisible={(bool) => setSignUpFailed(bool)}
                />
            </Modal>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    loginScreen: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        height: HEIGHT + StatusBar.currentHeight
    },
    iconBack: {
        position: 'absolute',
        top: 32,
        left: 24,
        zIndex: 100
    },
    container: {
        flex: 1,
        // height: HEIGHT,
        justifyContent: 'center',
        paddingHorizontal: 24,
        marginBottom: 24
    },
    topContainer: {
        marginBottom: 24
    },
    loginText: {
        color: '#000',
        fontWeight: '800',
        fontSize: 40
    },
    registerText: {
        color: '#969696',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 18
    },
    authContainer: {
        marginBottom: 24
    },
    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 12,
        borderRadius: 3,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
        // elevation: 2
    },
    input: {
        flex: 1,
        paddingHorizontal: 12
    },
    loginBtnContainer: {
        alignItems: 'flex-end'
    },
    loginBtn: {

    },
    gradientBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 24
    },
    loginTxtBtn: {
        fontSize: 18,
        fontWeight: '800',
        color: 'white',
        marginRight: 12
    }
})

export default SignUpScreen