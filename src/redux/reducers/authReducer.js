import { RETRIEVE_TOKEN, LOGIN, LOGOUT, REGISTER } from "../actions/types"


const initialStateAuth = {
    isLoading: true,
    userName: null,
    userToken: null
}

const authReducer = (state = initialStateAuth, action) => {
    console.log(action)
    switch(action.type) {
        case RETRIEVE_TOKEN:
            return {
                ...state,
                isLoading: false,
                userToken: action.token
            }
        case LOGIN:
            return {
                ...state,
                isLoading: false,
                userName: action.username,
                userToken: action.token
            }
        case LOGOUT:
            return {
                ...state,
                isLoading: false,
                userName: null,
                userToken: null
            }
        case REGISTER:
            return {
                ...state,
                isLoading: false,
                userName: action.username,
                userToken: action.token
            }
        default:
            return {
                ...state
            }
    }
}

export default authReducer