import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  // State value to get back to default all products
  all_products: [],
  // State value for filtered products
  filtered_products: [],
  grid_view: true,
};

//---------------------
// Context Create
const FilterContext = React.createContext();

//---------------------------
// Context Provider Function
const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  return (
    <FilterContext.Provider value={{ ...state }}>
      {children}
    </FilterContext.Provider>
  );
};

//---------------------------
// useContext Function
const useFilterContext = () => {
  return useContext(FilterContext);
};

//---------
// Exports
export { FilterProvider, useFilterContext };
