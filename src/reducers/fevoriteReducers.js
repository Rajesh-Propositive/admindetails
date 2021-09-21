import {
  FEV_ADD_ITEM,
  FEV_REMOVE_ITEM,
  FEV_ADD_ITEM_FAIL
} from "../constants/fevConstants";

export const fevoriteReducer = (state = { wishItems: [] }, action) => {
  switch (action.type) {
    case FEV_ADD_ITEM:
      const fevItem = action.payload;
      const existItem = state.wishItems.find(
        (x) => x.product === fevItem.product
      );
      if (existItem) {
        return {
          ...state,
          error: "",
          wishItems: state.wishItems.map((x) =>
            x.product === existItem.product ? fevItem : x
          )
        };
      } else {
        return {
          ...state,
          error: "",
          wishItems: [...state.wishItems, fevItem]
        };
      }
    case FEV_REMOVE_ITEM:
      return {
        ...state,
        error: "",
        wishItems: state.wishItems.filter((x) => x.product !== action.payload)
      };
case FEV_ADD_ITEM_FAIL:
  return {...state, error: action.payload}
    default:
      return state;
  }
};
