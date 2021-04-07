import { API_URL } from "../../utils/Config";
import { timeoutPromise } from "../../utils/Tools";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const PRODUCT_LOADING = "PRODUCT_LOADING";
export const PRODUCT_FAILURE = "PRODUCT_FAILURE";
export const RECENTLY_SUCCESS = "RECENTLY_SUCCESS";

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({
      type: PRODUCT_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/product`, {
          method: "GET",
        })
      );

      if (!response.ok) {
        dispatch({
          type: PRODUCT_FAILURE,
        });
        throw new Error("Something went wrong!, can't get the products");
      }
      const resData = await response.json();
      dispatch({
        type: FETCH_PRODUCTS,
        products: resData.content,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const clearRecently = () => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/product/clear-recently`, {
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