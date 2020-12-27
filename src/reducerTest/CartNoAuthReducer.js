import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DELETE_FROM_CART,
} from "./CartNoAuthAction";
import CartItem from "../../src/modelTest/cart-item";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productId = addedProduct._id || addedProduct.productId;
      const prodPrice = addedProduct.price || addedProduct.productPrice;
      const prodTitle = addedProduct.filename || addedProduct.productTitle;
      const prodimg = addedProduct.thumb || addedProduct.productImg;

      let updatedOrNewCartItem;

      if (state.items[productId]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          productId,
          state.items[productId].quantity + 1,
          prodimg,
          prodPrice,
          prodTitle
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          productId,
          1,
          prodimg,
          prodPrice,
          prodTitle,
          prodPrice
        );
      }
      return {
        ...state,
        items: { ...state.items, [productId]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
      };

    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.productId,
          selectedCartItem.quantity - 1,
          selectedCartItem.image,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
    case DELETE_FROM_CART:
      console.log("DELETE_FROM_CART");
      const List = state.items;

      delete List[action.pid];
      return {
        ...state,
        items: List,
      };
  }
  return state;
};
