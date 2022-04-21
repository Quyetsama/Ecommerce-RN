import axiosClient from "./axiosClient"


const getAllCity = () => {
    const url = 'https://provinces.open-api.vn/api/?depth=1'
    return axiosClient.get(url)
}

const getAllDistrict = (code) => {
    const url = `https://provinces.open-api.vn/api/p/${ code }?depth=2`
    return axiosClient.get(url)
}

const getAllWard = (code) => {
    const url = `https://provinces.open-api.vn/api/d/${ code }/?depth=2`
    return axiosClient.get(url)
}

export { getAllCity, getAllDistrict, getAllWard }