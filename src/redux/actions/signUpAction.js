import { HANDLE_SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./types"


export const actionSignUp = (fullName, email, password, tokenDevice) => (
    {
        type: HANDLE_SIGNUP,
        payload: {
            fullName,
            email,
            password,
            tokenDevice
        }
    }
)

export const signUpSuccess = (token, fullName, email, coin) => (
    {
        type: SIGNUP_SUCCESS,
        payload: {
            token,
            fullName,
            email,
            coin
        }
    }
)

export const signUpFailure = (error) => (
    {
        type: SIGNUP_FAILURE,
        payload: {
            error
        }
    }
)