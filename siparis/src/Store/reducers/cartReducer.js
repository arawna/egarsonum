import { CART_ADD, CART_DELL } from "../actions/cartActions";
import { cartItem } from "../initialValues/cartItem";

const initialState = {
  cartItem: cartItem,
};

export default function cartReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CART_ADD:
      return {
        ...state,
        cartItem: [...state.cartItem, payload],
      };
    // let user = state.authItem.find(u=>u.user.id===payload.id)
    // if(user){
    //     return{
    //         ...state
    //     };
    // }else {
    //     return{
    //         ...state,
    //         authItem:[{loggedIn:true,user:{payload}}]
    //     };
    // }
    case CART_DELL:
      let tempArr = [];
      for (let i = 0; i < state.cartItem.length; i++) {
        if (state.cartItem[i].productId !== payload) {
          tempArr.push(state.cartItem[i]);
        }
      }
      return {
        ...state,
        cartItem: [...tempArr],
      };

    default:
      return state;
  }
}
