import React from 'react';
import '../../styles/Item.css';
import { Link } from 'react-router-dom';

const Item = ({ item }) => {
  return (
    <div className='item'>
        <Link to={`/${item.category}/${item.id}`}>
            <figure className='item__img--wrapper'>
                <img src={item.url} alt='item_img'/>
            </figure>
        </Link>
        <div className='item__title'>
            <Link to={`/${item.category}/${item.id}`} className='item__title--link'>
                {item.title}
            </Link>
        </div>
        <p className='item__description'>{item.description}</p>
        <p className='item__price'>${item.price.toFixed(2)}</p>
    </div>
  )
}

export default Item