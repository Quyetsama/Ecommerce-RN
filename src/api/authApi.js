import axiosClient from "./axiosClient"


const getAllUser = () => {
    const url = '/user'
    return axiosClient.get(url)
}

const signInApi = (email, password, tokenDevice) => {
    const url = '/user/signin'
    return axiosClient.post(url, {
        email: email,
        password: password,
        tokenDevice: tokenDevice
    })
}

const signUpApi = (fullName, email, password, tokenDevice) => {
    const url = '/user/signup'
    return axiosClient.post(url, {
        fullName: fullName,
        email: email,
        password: password,
        tokenDevice: tokenDevice
    })
}

const logoutApi = (token, tokenDevice) => {
    const url = '/user/logout'
    return axiosClient.post(url,
        {
            tokenDevice: tokenDevice
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getCurrentUser = (token) => {
    const url = 'user/profile'
    return axiosClient.get(url, {
        headers: {
            Authorization: token
        }
    })
}

const getCoin = (token) => {
    const url = 'user/coin'
    return axiosClient.get(url, {
        headers: {
            Authorization: token
        }
    })
}

const secretApi = (token) => {
    const url = '/user/secret'
    return axiosClient.get(url, {
        headers: {
            Authorization: token
        }
    })
}


export { getAllUser, signInApi, signUpApi, logoutApi, getCurrentUser, getCoin, secretApi }