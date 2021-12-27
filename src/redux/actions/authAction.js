import { RETRIEVE_TOKEN, LOGIN, LOGOUT, REGISTER } from "./types"


export const retrieveToken = (token) => (
    {
        type: RETRIEVE_TOKEN,
        token: token
    }
)

export const login = (username, token) => (
    {
        type: LOGIN,
        token: token,
        username: username
    }
)

export const logout = () => (
    {
        type: LOGOUT
    }
)