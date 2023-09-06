import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import { items } from './data.js';
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Category from "./pages/Category";
import ItemDetail from "./pages/ItemDetail.jsx";
import Cart from "./pages/Cart";


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [cart, setCart] = useState([]);

  // Handle Search Result based on "title" and "description"
  const handleSearchTerm = event => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    const result = items.filter(
       item => item.title.toLowerCase().includes(newSearchTerm.toLowerCase())
    || item.description.toLowerCase().includes(newSearchTerm.toLowerCase()))

    setSearchResult(result);
  }

  // Add to Cart Function
  function addToCart (item) {
    const existingItem = cart.find((cartItem) => +cartItem.id === +item.id);

    // Check if the item has exist in cart
    if (existingItem) {
      existingItem.quantity++;
      setCart([...cart])
    } else {
      setCart([...cart, {...item, quantity: 1 }])
    }

  }

  // Update Quanity of the Item
  function updateQuantity (itemId, newQuantity) {
    const updatedCart = cart.map((cartItem) => 
    cartItem.id === itemId ? {...cartItem, quantity: parseInt(newQuantity)} : cartItem);

    setCart(updatedCart);
  }

  // Remove Item from Cart
  function removeFromCart (itemId) {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== itemId);
    setCart(updatedCart);
  }

  // Remove All Item from the Cart
  function removeAllItems () {
    setCart([]);
  }


  return (
    <div className="App">
      <Nav handleSearchTerm={handleSearchTerm}/>
      <Routes>
        <Route path="/" element = {<Home items={items} searchTerm={searchTerm} searchResult={searchResult}/>}/>
        <Route path="/:category" element = {<Category items={items} searchTerm={searchTerm} searchResult={searchResult}/>}/>
        <Route path="/:category/:id" element = {<ItemDetail items={items} addToCart={addToCart}/>}/>
        <Route path="/cart" element = {<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} removeAllItems={removeAllItems}/>}/>
      </Routes>
    </div>
  );
}

export default App;
