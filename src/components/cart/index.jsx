/* eslint-disable react/prop-types */
// components/Cart.jsx
import { useCart } from "../../context/cartContext";

import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Componente funcional Cart
const Cart = ({ closeCart }) => {
  // Utilizamos el contexto del carrito
  const { cart, dispatch } = useCart();

  // Función para manejar la eliminación de un ítem del carrito
  const handleRemoveFromCart = (id) => {
    dispatch({ type: "REMOVE_ITEM", id });
  };

  return (
    <Box sx={{ width: 320, p: 2 }}>
      {/* Título del carrito */}
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Carrito de Compras
      </Typography>
      <List>
        {/* Mapeamos los ítems del carrito para mostrarlos */}
        {cart.map((item, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={item.name}
              secondary={`Cantidad: ${item.quantity}, Precio: $${item.price}`}
            />
          </ListItem>
        ))}
        {/* Mostramos el botón de "Proceder al Pago" si hay ítems en el carrito */}
        {cart.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={closeCart}
            sx={{ mt: 2 }}
          >
            Proceder al Pago
          </Button>
        )}
      </List>
    </Box>
  );
};

export default Cart;
