import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItem: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      // console.log(item);
      const existItem = state.cartItems.find((x) => x.product === item.product); // ye jo hum .product use kr rhe h vo product ki id ko designate kr rha h

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(
            (x) => (x.product === existItem.product ? item : x) // ye jo humne logic lagaya h cartItem mei vo ek naya array return krega jismei humare saare items hone ... lets explain.... suppose initially mei item1 add kra toh vo exist nhi krega toh direct else mei jaakr vo cartItem mei add ho jaayega.... fir suppose mene item2 add kra toh uske ssath bhi same hoga ..else mei jaayega aur cartItem mei add ho jaayega ...fir suppose mene item1 wapis add kra toh vo exist krega toh cartItem pr hum map lagayenge aur ek naya list or array return krenge ...jismei logic ye h ki agar x ki id existItem ki id ke barabr ho gyi toh seedha item ho jaayega naye array mei aur agar id same nhi hoti dono ki toh x add hoga nayi array mei kyuki vo naya item h .. toh iss logic sd nayi carItem ki list return ho jaayegi.....
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload), // ismei filter iss logic se hoga ki agar x ki id delete hone wale ki id(ye id humei payload se aa rhi h action ke through) ke barabar ho gyi toh usey filter kr denge warna array ko same rehne denge....basic vo id wala product chai mei jese chaipatti chaante h vese chan jaayega........
      };

    default:
      return state;
  }
};
