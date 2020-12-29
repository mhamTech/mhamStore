export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const CART_REST = "CART_REST";

export const addToCart = (product) => {
  return { type: ADD_TO_CART, product: product };
};

export const removeFromCart = (productId) => {
  return { type: REMOVE_FROM_CART, pid: productId };
};
export const deleteFromCart = (productId) => {
  return { type: DELETE_FROM_CART, pid: productId };
};
export const cartRest = () => {
  return { type: CART_REST };
};
