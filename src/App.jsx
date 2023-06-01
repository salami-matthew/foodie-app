import React, { useState } from 'react'
import Header from './components/layout/Header'
import Meals from './components/meals/Meals'
import Cart from './components/cart/Cart'
import { CartProvider } from './contexts/CartContext';

function App() {
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const showCart = () => {
    setCartIsOpen(true);
  };

  const closeCart = () => {
    setCartIsOpen(false);
  };

  return (
    <CartProvider>
      {cartIsOpen &&
        <Cart
          onCloseCart={closeCart}
        />}
      <Header onShowCart={showCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  )
}

export default App
