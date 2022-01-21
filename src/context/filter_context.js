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
  // Sorting Functionality
  sort: "price-lowest",
  // Filters
  filters: {
    text: "",
    category: "all",
    company: "all",
    color: "all",
    price: 0,
    min_price: 0,
    max_price: 0,
    shipping: false,
  },
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

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort = (e) => {
    // For Demonstration
    // const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.filters, state.sort]);

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // As we want ot access value from  a "BUTTON", we need to get the text out of it using Vanilla JS
    if (name === "category") {
      value = e.target.textContent;
    }
    if (name === "color") {
      value = e.target.dataset.color;
    }
    // When we change the price, the state value is a "String", which indeed should be a Number: Hence FIXED
    if (name === "price") {
      value = +value;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name: name, value: value } });
  };

  const clearFilters = () => {};

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
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
