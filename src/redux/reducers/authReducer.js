import { RETRIEVE_TOKEN, LOGIN, LOGOUT, REGISTER } from "../actions/types"


const initialStateAuth = {
    fullName: null,
    userToken: null,
    coin: 0,
    email: null
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
        default:
            return {
                ...state
            }
    }
}

export default authReducer