import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

// toh basic logic ye h ki humne HomeScreen.js mei usedispatch() ki madad se dispatch kra listProducts wale action ko fir usne dispatch kra particular reducer ko requirement ke hissab se .... jese pehle PRODUCT_LIST_REQUEST ko kra jismei loading true rkhi kyuki abhi products load ho rhe h aur product ki list ko empty rkha kyuki abhi saare product load nhi hue....fir humne axios ki help se data(data matlab products) access kra fir humne dispatch kra PRODUCT_LIST_SUCCESS ko aur humne payload mei data de dia toh ab state mei data aur loading false return hoga..fir useSelector ki madad se hum kisi particular state ko access krke loading , data,error ki value nikaal skte h .... toh ye h basic flow
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      //   console.log(state);
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
