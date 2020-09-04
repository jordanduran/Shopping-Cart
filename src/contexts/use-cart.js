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
      return { cart: [] };
    default:
      return state;
  }
};

// Cart context for the provider

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = (sku) => dispatch({ type: 'ADD', payload: sku });

  const removeItem = (sku) => dispatch({ type: 'REMOVE', payload: sku });

  const emptyCart = () => dispatch({ type: 'EMPTY' });

  const countItemsInCart = (sku) => {
    const itemsInCart =
      state.cart.filter((product) => product.sku === sku) ?? [];

    return itemsInCart.length;
  };

  const totalPrice = () => {
    return groupCartItems().reduce((totalPrice, product) => {
      return totalPrice + product.price * product.quantity;
    }, 0);
  };

  const groupCartItems = () => {
    return state.cart.reduce((newCart, product) => {
      // Check the newCart array for a product
      const indexInCart = newCart.findIndex((p) => p.sku === product.sku);
      const isInCart = indexInCart !== -1;

      // If it's in the array, increment the quantity
      if (isInCart) {
        newCart[indexInCart].quantity = newCart[indexInCart].quantity + 1;
        return newCart;
      }
      // If not in the array, add it to the array
      newCart.push({ ...product, quantity: 1 });
      return newCart;
    }, []);
  };

  return (
    <CartContext.Provider
      value={{
        addItem,
        removeItem,
        emptyCart,
        cart: state.cart,
        cartGroupedByItems: groupCartItems(),
        countItemsInCart,
        totalPrice: totalPrice(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
