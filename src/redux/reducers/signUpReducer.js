import {
    HANDLE_SIGNUP,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    CLEAR_ERROR_SIGNUP
} from "../actions/types"


const initialState = {
    isLoading: false,
    error: null
}

const signUpReducer = (state = initialState, action) => {
    switch(action.type) {
        case HANDLE_SIGNUP:
            return {
                ...state,
                isLoading: true
            }            
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false
            }            
        case SIGNUP_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            }            
        case CLEAR_ERROR_SIGNUP:
            return {
                ...state,
                error: null,
            }            
        default:
            return {
                ...state
            }
    }
}

export default signUpReducer