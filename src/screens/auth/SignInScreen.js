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
    Modal,
} from 'react-native'
import loginBG from '../../assets/images/login.png'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Formik } from 'formik'
import { SignInSchema } from '../../utils/validation'
import { useSelector, useDispatch } from 'react-redux'
import LoadingModal from '../../components/modal/LoadingModal'
import AlertModal from '../../components/modal/AlertModal'
import { getTokenDevice } from '../../utils/notification'

import { actionLogin } from '../../redux/actions/loginAction'
import { CLEAR_ERROR_AUTH } from '../../redux/actions/types'
import { COLORS, SIZE } from '../../utils'







const FieldAuth = ({ iconRight, iconLeft, children, onShowPassword }) => {
    return (
        <View style={ styles.fieldContainer }>
            <MaterialCommunityIcons name={ iconLeft } size={ 22 } color={ COLORS.gray } />
            {children}
            <Ionicons onPress={ onShowPassword } name={ iconRight } size={ 22 } color={ COLORS.primary } />
        </View>
    )
}

const SignInScreen = ({ navigation }) => {

    const { isLoading, error } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const [hidePass, setHidePass] = useState(true)

    const handleSignIn = async (values) => {
        try{
            const tokenDevice = await getTokenDevice()
            dispatch(actionLogin(values.email, values.password, tokenDevice))
        }
        catch(error) {
            console.log(error)
        }
    }

    const isFormValid = (isValid, touched) => {
        return isValid && Object.keys(touched).length != 0
    }

    return (
        <ImageBackground
            style={ styles.loginScreen }
            // source={ loginBG }
        >
            <Feather style={ styles.iconBack } name={'corner-down-left'} size={28} color={'#000'} onPress={() => navigation.goBack()} />
            <KeyboardAwareScrollView
                scrollEnabled={false}
                showsVerticalScrollIndicator={ false }
                contentContainerStyle={{ flex: 1 }}
            >
                <View style={ styles.container }>
                    <View style={ styles.topContainer }>
                        <Text style={ styles.loginText }>Login</Text>
                        <Text style={ styles.pleaseText }>Please sign in to continue</Text>
                    </View>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={ SignInSchema }
                        onSubmit={values => handleSignIn(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                            <>
                                <View style={ styles.authContainer }>
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

                                <Text style={{ color: '#969696', marginVertical: 24 }}>Forgot your password?</Text>

                                <View style={ styles.loginBtnContainer }>
                                    <TouchableOpacity
                                        disabled={ !isFormValid(isValid, touched) }
                                        style={[ styles.loginBtn, { opacity: isFormValid(isValid, touched) ? 1 : 0.8 } ]} 
                                        activeOpacity={0.8}
                                        onPress={ handleSubmit }
                                    >
                                        <LinearGradient
                                            style={ styles.gradientBtn }
                                            colors={[COLORS.primary, COLORS.primary]}
                                            start={{ x: 0, y: 1 }}
                                            end={{ x: 1, y: 1 }}
                                        >
                                            <Text style={ styles.loginTxtBtn }>LOGIN</Text>
                                            <Feather name='corner-down-right' size={20} color={'white'} />
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </Formik>
                </View>
            </KeyboardAwareScrollView>
            
            <Text style={ styles.registerText }>
                Don't have an account?
                <Text style={{ color: COLORS.primary }} onPress={() => navigation.navigate('SignUp')}> Sign Up</Text>
            </Text>

            <Modal
                transparent={ true }
                animationType='fade'
                visible={ isLoading }
            >
                <LoadingModal />
            </Modal>
            <Modal
                statusBarTranslucent
                transparent={ true }
                animationType='fade'
                visible={ error ? true : false }
                onDismiss
            >
                <AlertModal 
                    title={'Login Failed'} 
                    content={`${ error }\nPlease try again.`}
                    changeModalVisible={() => dispatch({ type: CLEAR_ERROR_AUTH })}
                />
            </Modal>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    loginScreen: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 24
    },
    iconBack: {
        paddingVertical: 24
    },
    container: {
        flex: 1,
        marginTop: 100,
    },
    topContainer: {
        marginBottom: 24
    },
    loginText: {
        color: '#000',
        fontWeight: '800',
        fontSize: 50
    },
    pleaseText: {
        color: '#969696',
        fontWeight: 'bold'
    },
    registerText: {
        color: '#969696',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 18
    },
    authContainer: {
        // marginBottom: 24
    },
    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 12,
        borderRadius: 3,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
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

export default SignInScreen