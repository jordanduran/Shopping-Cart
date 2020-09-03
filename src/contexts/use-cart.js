import React, { createContext, useContext, useReducer } from 'react';
import products from '../products';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Reducer -> (Store and update our state)
const initialState = { cart: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      // action.payload = sku
      return {
        ...state,
        cart: [
          ...state.cart,
          products.find((product) => product.sku === action.payload),
        ],
      };
    case 'REMOVE':
      const indexInCart = state.cart.findIndex(
        (product) => product.sku === action.payload
      );
      const newCart = [...state.cart];
      newCart.splice(indexInCart, 1);
      return { ...state, cart: newCart };

    case 'EMPTY':

    default:
      return state;
  }
};

// Cart context for the provider

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = (sku) => dispatch({ type: 'ADD', payload: sku });

  const removeItem = (sku) => dispatch({ type: 'REMOVE', payload: sku });

  const countItemsInCart = (sku) => {
    const itemsInCart =
      state.cart.filter((product) => product.sku === sku) ?? [];

    return itemsInCart.length;
  };

  const totalPrice = () => {};

  return (
    <CartContext.Provider
      value={{
        addItem,
        removeItem,
        cart: state.cart,
        countItemsInCart,
        totalPrice: totalPrice(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
