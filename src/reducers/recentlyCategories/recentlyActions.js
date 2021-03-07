import { API_URL } from "../../utils/Config";
import { timeoutPromise } from "../../utils/Tools";
export const FETCH_RECENTLY = 'FETCH_RECENTLY';
export const RECENTLY_LOADING = 'RECENTLY_LOADING';
export const RECENTLY_FAILURE = 'RECENTLY_FAILURE';

export const fetchRecentlyCategories = () => {
    return async (dispatch) => {
        dispatch({
            type: RECENTLY_LOADING,
        });
        try {
            const response = await timeoutPromise(
                fetch(`${API_URL}/category/recently`)
            );
            if(!response.ok) {
                dispatch({
                    type: RECENTLY_FAILURE
                });
                throw new Error("Something went wrong!, can't get the recently categories");
            }
            const resData = await response.json();
            dispatch({
                type: FETCH_RECENTLY,
                recently: resData.slides,
            });
        } catch (err) {
            throw(err);
        }
    }
}