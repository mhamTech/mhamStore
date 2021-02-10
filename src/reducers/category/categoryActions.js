import { API_URL } from "../../utils/Config";
import { timeoutPromise } from "../../utils/Tools";
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const CATEGORIES_LOADING = "CATEGORIES_LOADING";
export const CATEGORIES_FAILURE = "CATEGORIES_FAILURE";

export const fetchCategories = () => {
    // console.log('fetchCategories')
  return async (dispatch) => {
    dispatch({type: CATEGORIES_LOADING});
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/category`, {
          method: "GET",
        })
      );

      if (!response.ok) {
        dispatch({type: CATEGORIES_FAILURE});
        throw new Error("Something went wrong!, can't get the categories");
      }
      const resData = await response.json();
    //   console.log('resData', resData)
      dispatch({type: FETCH_CATEGORIES, categories: resData.content});
    } catch (err) {
      throw err;
    }
  };
};
