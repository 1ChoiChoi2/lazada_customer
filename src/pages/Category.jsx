import React, { useState } from 'react';
import '../styles/Home.css';
import Item from '../components/ui/Item';
import { useParams } from 'react-router-dom';

const Category = ({ items: initialItems, searchTerm, searchResult }) => {
  const { category } = useParams();
  const sortedItems = initialItems.filter((item) => item.category === category);
  
  const [items, setItems] = useState(sortedItems);
  const [sortedSubcate, setSortedSubCate] = useState(sortedItems);

  // console.log(items);

  // Uppercase the first letter
  function firstLetterUpperCase(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  // Array of Subcategory
  function arrOfSubCategory () {
    const subcategoryArr = sortedItems.map(item => item.subcategory);
    const uniqueArr = [...new Set(subcategoryArr)];

    return uniqueArr;
  
  }

  // Filter Items by SubCategory
  function filterSubcategory(filter) {
    const filteredItems = items.filter(item => item.subcategory.toLowerCase() === filter.toLowerCase());
    setSortedSubCate(filteredItems);
  };

  // Filer Item By Price 
  function filterPrice(filter) {
    if (filter === "LOW_TO_HIGH") {
      if (sortedSubcate.length > 0) {
        setSortedSubCate(sortedSubcate.slice().sort((a, b) => a.price - b.price));
      } else {
        setItems(items.slice().sort((a, b) => a.price - b.price));
      }
    } else if (filter === "HIGH_TO_LOW") {
      if (sortedSubcate.length > 0) {
        setSortedSubCate(sortedSubcate.slice().sort((a, b) => b.price - a.price));
      } else {
        setItems(items.slice().sort((a, b) => b.price - a.price));
      }
    }
  }


  return (
    <div id='item__container'>
      <div className='row'>
        <div className='item__header'>
          <h2>{firstLetterUpperCase(category)} Items</h2>
          <div className='filter-container'>
            <select id='filter' defaultValue={"DEFAULT"}
            onChange={(event => filterSubcategory(event.target.value))}>
              <option value="DEFAULT" disabled>Select Subcategory</option>
              {
                arrOfSubCategory().map((category, i) => <option key={i} value={category.toUpperCase()}>{category}</option>)
              }
            </select>
            <select id='filter' defaultValue={"DEFAULT"}
            onChange={(event => filterPrice(event.target.value))}>
              <option value="DEFAULT" disabled>Price</option>
              <option value="LOW_TO_HIGH">Low to High</option>
              <option value="HIGH_TO_LOW">High to Low</option>
            </select>  
          </div>
        </div>
        <div className='item__body'>
        {
          searchTerm === ""
          ? (
            sortedSubcate &&
            sortedSubcate.map(item => <Item item={item} key={item.id}/>)
          ) : (
            searchResult
            .filter(item => item.category === category)
            .map(item => <Item item={item} key={item.id}/>)
          )
        }
        </div>
      </div>
    </div>
  )
}

export default Category