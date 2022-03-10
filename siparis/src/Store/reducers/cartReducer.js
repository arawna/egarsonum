import { CART_ADD, CART_CLEAR, CART_DELL } from "../actions/cartActions";
import { cartItem } from "../initialValues/cartItem";

const initialState = {
  cartItem: cartItem,
};

let idGetter = 1;

export default function cartReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CART_ADD:
      let product = payload;
      product.reduxId = idGetter;
      idGetter += 1;
      return {
        ...state,
        cartItem: [...state.cartItem, product],
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
        if (state.cartItem[i].reduxId !== payload) {
          tempArr.push(state.cartItem[i]);
        }
      }
      return {
        ...state,
        cartItem: [...tempArr],
      };

    case CART_CLEAR:
      return {
        ...state,
        cartItem: [],
      };

    default:
      return state;
  }
}
