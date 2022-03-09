export const CART_ADD = "CART_ADD";
export const CART_DELL = "CART_DELL";

export function cartAdd(cartItem) {
  return {
    type: CART_ADD,
    payload: cartItem,
  };
}

export function cartDell(cartItem) {
  return {
    type: CART_DELL,
    payload: cartItem,
  };
}
