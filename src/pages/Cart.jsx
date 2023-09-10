import React, { useState } from 'react';
import '../styles/Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// 4 items per cart page before active pagination
const itemsPerPage = 4;

const Cart = ({ cart, updateQuantity, removeFromCart, removeAllItems }) => {
  // Define CurrentPage + Calculate Total Number of Page
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(cart.length / itemsPerPage);

  // Calculate Index range for the each page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Calculate price of all the Item in the Cart
  const calculateTotalPrice = () => {
    let total = 0;

    for (const cartItem of cart) {
      total += cartItem.price * cartItem.quantity;
    };

    return total;
  };

  //
  console.log(cart)
  
  return (
    <div className='cart__container'>
      <div className='row'>
        <h2>Cart</h2>
        <div className='cart__section'>
          <div className='cart__header'>
            <span className='cart__item'>Item</span>
            <span className='cart__quantity'>Quanity</span>
            <span className='cart__total'>Total</span>
          </div>
          <div className='cart__body'>
            
            {
              cart
              .slice(startIndex, endIndex)
              .map((cartItem) => (
                <div className='cart__item--details' key={cartItem.id}>
                  <div className='cart__item'>
                    <img src={cartItem.url} alt='item-img' className='cart__item--img'/>
                    <div className='cart__item--info'>
                      <span className='cart__item--title'>{cartItem.title}</span>
                      <span className='cart__item--price'>${cartItem.price.toFixed(2)}</span>
                      <button className='cart__item--remove'
                      onClick={() => removeFromCart(cartItem.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className='cart__quantity'>
                    <input type='number' min={1} max={99}
                    value={cartItem.quantity}
                    onChange={(event) => updateQuantity(cartItem.id, event.target.value)}
                    />
                  </div>
                  <div className='cart__total'>
                    ${(cartItem.price * cartItem.quantity).toFixed(2)}
                  </div>
                </div>
              ))
            }
            {
              /** Pagination controls  */
              totalPages > 1 && (
                <div>
                  <button 
                  onClick={() => setCurrentPage(currentPage -1)}
                  disabled={currentPage === 1}>
                    <FontAwesomeIcon icon="arrow-left"/>
                  </button>
                  <span className='cart__page'>Page {currentPage} of {totalPages}</span>
                  <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}>
                    <FontAwesomeIcon icon="arrow-right"/>
                  </button>
                </div>
              )
            }
          </div>
        </div>
        {
          cart.length > 0 && (
            <div className='total'>
              <div className='total__price'>
                <span>Total</span>
                <span>${calculateTotalPrice().toFixed(2)}</span>
              </div>
              <div className='button__container'>
                <button className='button__remove-all' onClick={removeAllItems}>
                  Remove All
                </button>
                <button className='button__check-out'>
                  Place Order
                </button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Cart
