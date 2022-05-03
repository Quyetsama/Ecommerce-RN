import axiosClient from "./axiosClient"


const getAllUser = () => {
    const url = '/user'
    return axiosClient.get(url)
}

const signInApi = (data, tokenDevice) => {
    const url = '/user/signin'
    return axiosClient.post(url, {
        email: data.email,
        password: data.password,
        tokenDevice: tokenDevice
    })
}

const signUpApi = (data) => {
    const url = '/user/signup'
    return axiosClient.post(url, {
        fullName: data.fullName,
        email: data.email,
        password: data.password
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

const secretApi = (token) => {
    const url = '/user/secret'
    return axiosClient.get(url, {
        headers: {
            Authorization: token
        }
    })
}


export { getAllUser, signInApi, signUpApi, logoutApi, getCurrentUser, secretApi }