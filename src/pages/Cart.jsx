import React from 'react';
import '../styles/Cart.css';

const Cart = ({ cart, updateQuantity, removeFromCart, removeAllItems }) => {
  
  // Calculate price of all the Item in the Cart
  const calculateTotalPrice = () => {
    let total = 0;

    for (const cartItem of cart) {
      total += cartItem.price * cartItem.quantity;
    };

    return total;
  }
  
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
              cart.map((cartItem) => (
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