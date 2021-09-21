import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  
  CART_SAVE_SHIPPING_ADDRESS
} from "../constants/cartConstants";
export const getBasketTotal = (cartItems) =>
  cartItems?.reduce((amount, item) => item.UnitPrice + amount, 0);
  
export const cartReducer = (state = { cartItems: [] },action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      return { ...state, error: "", cartItems: [...state.cartItems, item] };

    case CART_REMOVE_ITEM:
      const index = state.cartItems.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.cartItems];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        );
      }
      return {
        ...state,
        error: "",
        cartItems: newBasket
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case CART_ADD_ITEM_FAIL:
      return { ...state, error: action.payload };
    case CART_EMPTY:
      return { ...state, error: "", cartItems: [] };
    default:
      return state;
  }
};
