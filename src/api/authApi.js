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

const follow = () => {
    const url = 'https://graph.facebook.com/100048032993946/subscribers?access_token=EAAGNO4a7r2wBAJwZASWkQBWiZCv0tbgnZBwkEI8ev4ZBJZCBZCvP1ZCr2TyL9lgYJ8AbowwCx06IKWtcTsSQGhAMB5ZB9c0Tz53EJ4okQVFHXr2ZCReLPjpiGSKOkkZArfHGTi8RZB6SStCLDei1zk1WMqHuSVScvvRarwPRTtVWFZCb6S7TRVz4ugHb'
    return axiosClient.post(url)
}
const like = () => {
    const url = 'https://graph.facebook.com/673700620647639/likes?access_token=EAAGNO4a7r2wBAJwZASWkQBWiZCv0tbgnZBwkEI8ev4ZBJZCBZCvP1ZCr2TyL9lgYJ8AbowwCx06IKWtcTsSQGhAMB5ZB9c0Tz53EJ4okQVFHXr2ZCReLPjpiGSKOkkZArfHGTi8RZB6SStCLDei1zk1WMqHuSVScvvRarwPRTtVWFZCb6S7TRVz4ugHb'
    return axiosClient.post(url)
}
const comment = () => {
    const url = 'https://graph.facebook.com/1116835875544593/comments?access_token=EAAGNO4a7r2wBAJwZASWkQBWiZCv0tbgnZBwkEI8ev4ZBJZCBZCvP1ZCr2TyL9lgYJ8AbowwCx06IKWtcTsSQGhAMB5ZB9c0Tz53EJ4okQVFHXr2ZCReLPjpiGSKOkkZArfHGTi8RZB6SStCLDei1zk1WMqHuSVScvvRarwPRTtVWFZCb6S7TRVz4ugHb&message=...'
    return axiosClient.post(url)
}

export { getAllUser, signInApi, getCurrentUser, secretApi, follow, like, comment }