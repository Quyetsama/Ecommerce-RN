import { HANDLE_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/types'
import { loginSuccess, loginFailure } from '../actions/loginAction'
import { put, takeLatest, takeEvery, select } from 'redux-saga/effects'
import { signInApi } from '../../api/authApi'
import AsyncStorage from '@react-native-async-storage/async-storage'



function* postLoginAction(action) {
    try {
        const payload = action.payload
        const res = yield signInApi(payload.email, payload.password, payload.tokenDevice)

        if(res?.data?.success) {
            yield AsyncStorage.setItem('userToken', res.headers.authorization)
            yield put(loginSuccess(res.headers.authorization, res.data.data?.fullName, res.data.data?.email, res.data.data?.coin))
        }
    }
    catch(error) {
        // console.log(error.response?.data?.message)
        yield put(loginFailure(error.response?.data?.message))
    }
}

export function* watchPostLogin() {
    yield takeLatest(HANDLE_LOGIN, postLoginAction)
}