import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

// Function to Check if I have items in local storage by the name of "cart": If I do, I would want to setup my cart equal to that. If not, its still going to be an empty array.
const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 15000,
};

const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Add to cart
  const addToCart = (id, color, amount, product) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { id, color, amount, product },
    });
  };

  // Remove Item
  const removeItem = (id) => {};

  // Toggle Amount
  const toggleAmount = (id, value) => {};

  // Clear Cart
  const clearCart = () => {};

  // Persist Cart Amount to Local Storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
