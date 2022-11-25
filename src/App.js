import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
import React, {useState} from 'react'
import Cart from './components/Cart/Cart'
import CartProvider from '../src/store/CartProvider'

function App() {
  const [showCart, setShowCart] = useState(false)
  
  const showCartHandler = (e) => {
    setShowCart(true)
  }
  
  const hideCartHandler = (e) => {
    setShowCart(false)
  }

  return (
    <CartProvider>
     {showCart && <Cart onClose={hideCartHandler}/>}
      <Header open={showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
