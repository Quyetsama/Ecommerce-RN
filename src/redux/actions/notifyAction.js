import { 
    SET_COUNT_NOTIFY,
    DECREASE_COUNT_NOTIFY,
    INCREASE_COUNT_NOTIFY
} from "./types"



export const setCountNotify = (count) => (
    {
        type: SET_COUNT_NOTIFY,
        count: count
    }
)

export const decreaseNotify = () => (
    {
        type: DECREASE_COUNT_NOTIFY
    }
)

export const increaseNotify = () => (
    {
        type: INCREASE_COUNT_NOTIFY
    }
)