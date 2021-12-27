import axiosClient from "./axiosClient"


const getAllUser = () => {
    const url = '/user'
    return axiosClient.get(url)
}

const signInApi = (data) => {
    const url = '/user/signin'
    return axiosClient.post(url, {
        email: data.email,
        password: data.password
    })
}

const secretApi = (token) => {
    const url = '/user/secret'
    return axiosClient.get(url, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export { getAllUser, signInApi, secretApi }