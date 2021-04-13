import { API_URL } from "../../utils/Config";
import { timeoutPromise } from "../../utils/Tools";
export const FETCH_RECENTLY = 'FETCH_RECENTLY';
export const RECENTLY_LOADING = 'RECENTLY_LOADING';
export const RECENTLY_FAILURE = 'RECENTLY_FAILURE';
export const RECENTLY_SUCCESS = "RECENTLY_SUCCESS";

export const fetchRecentlyCategories = () => {
    return async (dispatch, getState) => {
        dispatch({
            type: RECENTLY_LOADING,
        });
        const user = getState().auth.user;
        if(!user.userid) return;
        try {
            const response = await timeoutPromise(
                // fetch(`${API_URL}/category/recently`, {
                fetch(`${API_URL}/product/recently`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "userid": user.userid
                    }
                })
            );
            if(!response.ok) {
                dispatch({
                    type: RECENTLY_FAILURE
                });
                console.log(`response - fetchRecently`, await response.json())
                throw new Error(await response.json());
            }
            const resData = await response.json();
            // console.log('resData', resData)
            dispatch({
                type: FETCH_RECENTLY,
                recently: resData.content,
            });
        } catch (err) {
            throw(err);
        }
    }
}

export const clearRecently = () => {
    return async (dispatch, getState) => {
      const user = getState().auth.user;
      try {
        const response = await timeoutPromise(
          fetch(`${API_URL}/product/recently/clear`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              userid: user.userid
            },
            method: 'DELETE'
          })
        );
        if(response.ok){
          dispatch({
            type: RECENTLY_SUCCESS,
          })
        }
      } catch (error) {
        throw error;
      }
    }
}