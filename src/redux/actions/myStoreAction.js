import { SET_NAME_PRODUCT, SET_DES_PRODUCT } from "./types"

export const setNameProduct = (name) => (
    {
        type: SET_NAME_PRODUCT,
        name: name
    }
)
