import { RETRIEVE_TOKEN, LOGIN, LOGOUT, REGISTER, SETCOIN } from "./types"


export const retrieveToken = (token) => (
    {
        type: RETRIEVE_TOKEN,
        token: token
    }
)

export const login = (fullName, token, coin, email) => (
    {
        type: LOGIN,
        token: token,
        fullName: fullName,
        coin: coin,
        email: email
    }
)

export const logout = () => (
    {
        type: LOGOUT
    }
)

export const setCoin = (coin) => (
    {
        type: SETCOIN,
        coin
    }
)