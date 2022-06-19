import { HANDLE_SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../actions/types'
import { signUpSuccess, signUpFailure } from '../actions/signUpAction'
import { put, takeLatest, takeEvery, select } from 'redux-saga/effects'
import { signUpApi } from '../../api/authApi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as RootNavigation from '../../navigation/RootNavigation'



function* postSignUpAction(action) {
    try {
        const payload = action.payload
        const res = yield signUpApi(payload.fullName, payload.email, payload.password, payload.tokenDevice)

        if(res?.data?.success) {
            yield AsyncStorage.setItem('userToken', res.headers.authorization)
            yield put(signUpSuccess(res.headers.authorization, res.data.data?.fullName, res.data.data?.email, res.data.data?.coin))
            // RootNavigation.reset('SignIn')
        }
    }
    catch(error) {
        yield put(signUpFailure(error.response?.data?.message))
    }
}

export function* watchPostSignUp() {
    yield takeLatest(HANDLE_SIGNUP, postSignUpAction)
}