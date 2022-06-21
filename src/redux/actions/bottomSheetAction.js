import { 
    HANDLE_OPEN_BOTTOM_SHEET, 
    SET_LOADING_BOTTOM_SHEET, 
    CLEAR_BOTTOM_SHEET 
} from "./types"


export const actionOpenBottomSheet = (_id) => (
    {
        type: HANDLE_OPEN_BOTTOM_SHEET,
        payload: {
            _id
        }
    }
)

export const actionSetLoadingBottomSheet = () => (
    {
        type: SET_LOADING_BOTTOM_SHEET,
        payload: {

        }
    }
)

export const clearBottomSheet = () => (
    {
        type: CLEAR_BOTTOM_SHEET,
        payload: {

        }
    }
)