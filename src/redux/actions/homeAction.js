import { SET_REFRESHING, SET_CATEGORY, INCREASE_PAGE } from "./types"


export const setRefreshing = () => (
    {
        type: SET_REFRESHING,
        payload: {

        }
    }
)

export const setCategory = (id, page) => (
    {
        type: SET_CATEGORY,
        payload: {
            id,
            page
        }
    }
)

export const inceasePage = () => (
    {
        type: INCREASE_PAGE,
        payload: {

        }
    }
)