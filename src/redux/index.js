import { actions } from "./actions";

const INITIAL_STATE = {
    products: [],
    isLoading: false,
    categories: [],
    cart: [],
    purchases: []
}
  
  const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case actions.setproducts: 
    return {
      ...state,
      products: action.payload
    }
    case actions.setloading: 
    return {
      ...state,
      isLoading: action.payload
    }
    case actions.setcategories: 
    return {
      ...state,
      categories: action.payload
    }
    case actions.setcart: 
    return {
      ...state,
      cart: action.payload
    }
    case actions.setpurchases: 
    return {
      ...state,
      purchases: action.payload
    }
      default:
        return state;
    }
  };
  
  export default reducer;
  