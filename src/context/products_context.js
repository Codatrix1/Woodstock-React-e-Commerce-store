import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { products_url as url } from "../utils/constants";

import reducer from "../reducers/products_reducer";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const initialState = {
  // State value for sidebar
  isSidebarOpen: false,
  // State values for All Products
  products_loading: false,
  products_error: false,
  products: [],
  // State value for featured products
  featured_products: [],
  // State values for Single Product
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};

//---------------------
// Context Create
const ProductsContext = React.createContext();

//---------------------------
// Context Provider Function
const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // For Responsive Sidebar
  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  // Fetch All Products and Featured[Handled in reducer]
  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(url);
      const products = response.data;
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  // Fetch Single Product
  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios.get(url);
      const singleProduct = response.data;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  useEffect(() => {
    fetchProducts(url);
  }, []);

  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

//---------------------------
// useContext Function
const useProductsContext = () => {
  return useContext(ProductsContext);
};

//---------
// Exports
export { ProductsProvider, useProductsContext };
