import { HANDLE_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from "./types"


export const actionLogin = (email, password, tokenDevice) => (
    {
        type: HANDLE_LOGIN,
        payload: {
            email,
            password,
            tokenDevice
        }
    }
)

export const loginSuccess = (token, fullName, email, coin) => (
    {
        type: LOGIN_SUCCESS,
        payload: {
            token,
            fullName,
            email,
            coin
        }
    }
)

export const loginFailure = (error) => (
    {
        type: LOGIN_FAILURE,
        payload: {
            error
        }
    }
)