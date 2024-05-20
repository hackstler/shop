// contexts/CartContext.jsx

import { createContext, useContext, useReducer } from "react";

// Definimos el contexto del carrito
const CartContext = createContext({
  cart: [],
  dispatch: () => null, // Función de relleno
});

// Reducer para manejar las acciones en el carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      // eslint-disable-next-line no-case-declarations
      const itemIndex = state.findIndex((item) => item.id === action.item.id);
      if (itemIndex !== -1) {
        // Si el ítem ya está en el carrito, incrementamos su cantidad
        const newState = [...state];
        newState[itemIndex] = {
          ...newState[itemIndex],
          quantity: newState[itemIndex].quantity + 1,
        };
        return newState;
      } else {
        // Si el ítem no está en el carrito, lo agregamos con cantidad 1
        return [...state, { ...action.item, quantity: 1 }];
      }
    case "REMOVE_ITEM":
      // Eliminamos el ítem del carrito
      return state.filter((item) => item.id !== action.id);
    case "UPDATE_QUANTITY":
      // Actualizamos la cantidad del ítem en el carrito
      return state.map((item) =>
        item.id === action.id ? { ...item, quantity: action.quantity } : item
      );
    default:
      return state;
  }
};

// Proveedor del contexto del carrito
// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto del carrito
export const useCart = () => useContext(CartContext);
