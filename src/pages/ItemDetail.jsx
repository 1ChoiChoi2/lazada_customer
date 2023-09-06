import React from 'react';
import '../styles/ItemDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import Item from '../components/ui/Item';

const ItemDetail = ({ items, addToCart }) => {
  const { id } = useParams();
  const item = items.find(item => +item.id === +id);
  const relatedItem = items.filter(product => product.category === item.category && +product.id !== +item.id) 


  return (
    <div className='item__container'>
        <div className='row'>
            <div className='item__previous'>
                <Link to={`/${item.category}`} className='item__link'>
                    <FontAwesomeIcon icon="arrow-left"/>
                </Link>
                <Link to={`/${item.category}`}>
                    <h2>{item.category.toUpperCase()} ITEMS</h2>
                </Link>
            </div>
            <div className='item__selected'>
                <figure className='item__selected--figure'>
                    <img src={item.url} className='item__selected--img'/>
                </figure>
                <div className='item__selected--detail'>
                    <h2 className='item__selected--title'>
                        {item.title}
                    </h2>
                    <div className='item__selected--description'>
                        <h3 className='item__selected--description-title'>
                            Item's Description
                        </h3>
                        <p>{item.description}</p>
                    </div>
                    <p className='item__selected--price'>
                        ${item.price.toFixed(2)}
                    </p>
                    <button className='item__selected--cart'
                    onClick={() => addToCart(item)}>
                        Add To Cart
                    </button>
                </div>
            </div>
            <div className='item__recommended'>
                <h2>Item Recommendation</h2>
                <div className='item__recommended--container'>
                {
                    relatedItem
                    .slice(0, 4).map(item => <Item key={item.id} item={item}/>)
                }
                </div>
            </div>  
        </div>
    </div>
  )
}

export default ItemDetail