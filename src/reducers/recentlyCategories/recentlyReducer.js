import {
    FETCH_RECENTLY,
    RECENTLY_LOADING,
    RECENTLY_FAILURE,
} from "./recentlyActions";

const initialState = {
    recently: [],
    isLoading: false,
};

export const recentlyReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECENTLY_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case RECENTLY_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        case FETCH_RECENTLY:
            return {
                ...state,
                recently: [...action.recently],
                isLoading: false
            };
        default:
            return state;
    }
};