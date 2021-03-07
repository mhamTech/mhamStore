import {
    FETCH_CATEGORIES,
    CATEGORIES_LOADING,
    CATEGORIES_FAILURE,
  } from "./categoryActions";
//   import { FIRST_OPEN } from "./checkFirstTimeActions";
  
  const initialState = {
    categories: [],
    isLoading: false,
  };
  export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case CATEGORIES_LOADING:
        return {
          ...state,
          isLoading: true,
        };
      case CATEGORIES_FAILURE:
        return {
          ...state,
          isLoading: false,
        };
      case FETCH_CATEGORIES:
        return {
          ...state,
          categories: [...action.categories],
          isLoading: false,
        };
      default:
        return state;
    }
  };
  