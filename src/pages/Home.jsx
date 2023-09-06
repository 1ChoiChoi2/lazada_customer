import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import Item from '../components/ui/Item';

const Home = ({ items: initialItems, searchTerm, searchResult }) => {
  const [items, setItems] = useState(initialItems);
  const navigate = useNavigate();  
  
  // Display Item on the First Load
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  // Filter Category
  function filterItems(filter) {
    navigate(`/${filter.toLowerCase()}`);
  }

  return (
    <div id='item__container'>
        <div className='row'>
            <div className='item__header'>
                <h2 className='item__header__title'>All Item</h2>
                <select 
                id='filter' defaultValue={"DEFAULT"}
                onChange={(event) => filterItems(event.target.value)}>
                    <option value="DEFAULT" disabled>Select Category</option>
                    <option value="ELECTRONIC">Electronic</option>
                    <option value="VEHICLE">Vehicle</option>
                </select>
            </div>
            <div className='item__body'>
                {
                  searchTerm === ""
                  ? (
                    items &&
                    items.map(item => <Item item={item} key={item.id}/>)
                  ) : (
                    searchResult.map(item => <Item key={item.id} item={item}/>)
                  ) 
                }
            </div>
        </div>
    </div>
  )
}

export default Home