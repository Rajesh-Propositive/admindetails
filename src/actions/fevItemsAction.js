import { FEV_ADD_ITEM, FEV_REMOVE_ITEM, FEV_ADD_ITEM_FAIL } from "../constants/fevConstants";

export const addtoFevorite = (id) => (dispatch, getState) => {
  const {
    wishList: { wishItems }
  } = getState();
  dispatch({ type: FEV_ADD_ITEM, payload: id });
};

export const removeFevorite = (id) => (dispatch, getState) => {
  dispatch({ type: FEV_REMOVE_ITEM, payload: id });
};
