import React from 'react';
import LazadaLogo from '../assets/lazada_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';

const Nav = ({ handleSearchTerm }) => {
  return (
    <nav>
        <div className='nav__container'>
            <Link to={'/'}>
                <figure className='logo'>
                    <img src={LazadaLogo} alt='lazada logo'/>
                </figure>
            </Link>
            <div className='nav__search-bar'>
                <input type='text' placeholder='Search..'
                onChange={handleSearchTerm}
                />
                {/* <button type='submit' className='nav__search-icon'>
                    <FontAwesomeIcon icon="magnifying-glass" />
                </button> */}
            </div>
            <Link to="/cart">
                <div className='cart'>
                    <FontAwesomeIcon icon="shopping-cart"/>
                </div>
            </Link>
        </div>
    </nav>
  )
}

export default Nav