// src/context/CartContext.jsx
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // 1. AGREGAR AL CARRITO
  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(item => item._id === product._id);
      if (exist) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // 2. REMOVER DEL CARRITO
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  // 3. CAMBIAR CANTIDAD
  const updateQty = (id, qty) => {
    setCart(prev => prev.map(item =>
      item._id === id
        ? { ...item, qty: qty > 0 ? qty : 1 }
        : item
    ));
  };

  // 4. TOTAL DEL CARRITO
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // 5. VACÍAR CARRITO
  const clearCart = () => setCart([]);

  // 6. MENSAJE PARA WHATSAPP
  const getWhatsAppMessage = () => {
    const items = cart.map(item => 
      `- ${item.qty}x ${item.name} - $${item.price * item.qty}`
    ).join('\n');
    const message = `Hola! Quiero comprar:\n\n${items}\n\nTotal: $${totalPrice.toFixed(2)}\n\n¡Confirmar pedido!`;
    return encodeURIComponent(message);
  };

  // 7. URL DE WHATSAPP
 const phone = "593987451408"; // ← número del negocio
const whatsappUrl = `https://wa.me/${phone}?text=${getWhatsAppMessage()}`;

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQty, 
      totalItems, totalPrice, clearCart, whatsappUrl 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);