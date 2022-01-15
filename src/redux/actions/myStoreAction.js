import { POST_PRODUCT, CLEAR_PRODUCT, SET_NAME_PRODUCT, SET_DES_PRODUCT, SET_CATEGORY_PRODUCT } from "./types"



export const postProduct = () => (
    {
        type: POST_PRODUCT
    }
)

export const clearProduct = () => (
    {
        type: CLEAR_PRODUCT
    }
)

export const setNameProduct = (name) => (
    {
        type: SET_NAME_PRODUCT,
        name: name
    }
)

export const setDesProduct = (des) => (
    {
        type: SET_DES_PRODUCT,
        des: des
    }
)

export const setCategoryProduct = (category) => (
    {
        type: SET_CATEGORY_PRODUCT,
        category: category
    }
)