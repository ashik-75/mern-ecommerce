import { createSlice } from "@reduxjs/toolkit";

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddress = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : [];
const addToCart = createSlice({
  name: "addToCart",
  initialState: {
    cartItems,
    shippingAddress,
  },
  reducers: {
    ADD_TO_CART: (state, action) => {
      const existsItems = state.cartItems.find(
        (prod) => prod.product === action.payload.product
      );
      if (existsItems) {
        state.cartItems = state.cartItems.map((prod) =>
          prod.product === action.payload.product ? action.payload : prod
        );
      } else {
        state.cartItems.push(action.payload);
      }
    },
    REMOVE_FROM_CART: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload
      );
    },
    CLEAR_CART_ITEMS: (state, action) => {
      state.cartItems = [];
    },
    ADD_SHIPPING_ADDRESS: (state, action) => {
      state.shippingAddress.push(action.payload);
    },
    REMOVE_SHIPPING_ADDRESS: (state, action) => {
      state.shippingAddress = state.shippingAddress.filter(
        (address) => address.id !== action.payload
      );
    },
    EDIT_SHIPPING_ADDRESS: (state, action) => {
      state.shippingAddress = state.shippingAddress.map((address) =>
        address.id === action.payload.id ? action.payload : address
      );
    },
  },
});

export const addToCartReducer = addToCart.reducer;
export const {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_SHIPPING_ADDRESS,
  REMOVE_SHIPPING_ADDRESS,
  EDIT_SHIPPING_ADDRESS,
  CLEAR_CART_ITEMS,
} = addToCart.actions;

export const addItemToCart = (product) => (dispatch, getState) => {
  dispatch(ADD_TO_CART(product));
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().addToCart.cartItems)
  );
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch(REMOVE_FROM_CART(id));

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().addToCart.cartItems)
  );
};

export const addShippingAddress = (address) => (dispatch, getState) => {
  dispatch(ADD_SHIPPING_ADDRESS(address));

  localStorage.setItem(
    "shippingAddress",
    JSON.stringify(getState().addToCart?.shippingAddress)
  );
};

export const removeShippingAddress = (id) => (dispatch, getState) => {
  dispatch(REMOVE_SHIPPING_ADDRESS(id));

  localStorage.setItem(
    "shippingAddress",
    JSON.stringify(getState().addToCart.shippingAddress)
  );
};

export const editShippingAddress = (address) => (dispatch, getState) => {
  dispatch(EDIT_SHIPPING_ADDRESS(address));

  localStorage.setItem(
    "shippingAddress",
    JSON.stringify(getState().addToCart.shippingAddress)
  );
};
