import { 
    RETRIEVE_TOKEN, LOGIN, LOGOUT, REGISTER, SETCOIN,
    HANDLE_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE,
    HANDLE_SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    CLEAR_ERROR_AUTH
} from "../actions/types"


const initialStateAuth = {
    userToken: null,
    fullName: null,
    email: null,
    coin: 0,
    isLoading: false,
    error: null
}

const authReducer = (state = initialStateAuth, action) => {
    // console.log(action)
    switch(action.type) {
        case RETRIEVE_TOKEN:
            return {
                ...state,
                userToken: action.token
            }
        case LOGIN:
            return {
                ...state,
                fullName: action.fullName,
                userToken: action.token,
                coin: action.coin,
                email: action.email
            }
        case LOGOUT:
            return {
                ...state,
                fullName: null,
                userToken: null,
                coin: 0,
                email: null
            }
        case REGISTER:
            return {
                ...state,
                fullName: action.fullName,
                userToken: action.token,
                coin: action.coin,
                email: action.email
            }
        case SETCOIN:
            return {
                ...state,
                coin: action.coin
            }

        case HANDLE_LOGIN:
            return {
                ...state,
                isLoading: true
            }            
        case LOGIN_SUCCESS:
            return {
                ...state,
                userToken: action.payload.token,
                fullName: action.payload.fullName,
                email: action.payload.email,
                coin: action.payload.coin,
                isLoading: false,
                error: null
            }            
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            }
        case HANDLE_SIGNUP:
            return {
                ...state,
                isLoading: true
            }            
        case SIGNUP_SUCCESS:
            return {
                ...state,
                userToken: action.payload.token,
                fullName: action.payload.fullName,
                email: action.payload.email,
                coin: action.payload.coin,
                isLoading: false,
                error: null
            }            
        case SIGNUP_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            }
        case CLEAR_ERROR_AUTH:
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

export default authReducer