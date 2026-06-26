import React, { useState, useEffect } from 'react';
import { FiSearch, FiUser, FiShoppingBag } from 'react-icons/fi';
import './Header.css';
import { GraphQLClient, gql } from 'graphql-request';
import { useCart } from '../../context/CartContext';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useNavigate, NavLink } from 'react-router-dom';
import SearchDrawer from '../SearchDrawer/SearchDrawer';

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:2000/graphql';

const GET_PRODUCT_CATEGORIES = gql`
  query GetProductCategories($search: String) {
    getProductCategories(search: $search) {
      id
      name
      code
      description
      imageUrl
      status
      parentCategoryId
      subCategories {
        id
        name
        code
        productCategoryId
        description
        imageUrl
        status
        createdTime
      }
      createdTime
    }
  }
`;

const Header = () => {
  const [categories, setCategories] = useState([]);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const client = new GraphQLClient(GRAPHQL_ENDPOINT);
        const data = await client.request(GET_PRODUCT_CATEGORIES);
       
        const parentCategories = (data.getProductCategories || []).filter(
          cat => !cat.parentCategoryId
        );
        setCategories(parentCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <header className="site-header">
      <div className="header-container">
     
        <div className="header-logo">
          <img src="/images/log1.png" alt="Prince 'N' Princess" className="logo-image" />
        </div>

        <nav className="header-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/" end>Home</NavLink>
            </li>
            {categories.map((category) => (
              <li className="nav-item" key={category.id}>
                <NavLink to={`/categories/${category.code}`}>
                  {category.name}
                  {category.subCategories && category.subCategories.length > 0 && (
                    <MdKeyboardArrowDown className="nav-arrow" />
                  )}
                </NavLink>
              </li>
            ))}
            <li className="nav-item">
              <NavLink to="/stores">Our Stores</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/blog">Blog</NavLink>
            </li>
          </ul>
        </nav>

      
        <div className="header-icons">
          <button className="icon-btn" aria-label="Search" onClick={() => setIsSearchOpen(true)}>
            <FiSearch />
          </button>
          <button className="icon-btn" aria-label="User Profile" onClick={() => {
            const token = localStorage.getItem('token');
            if (token) {
              navigate('/profile', { state: { activeTab: 'profile' } });
            } else {
              navigate('/login');
            }
          }}>
            <FiUser />
          </button>
          <button className="icon-btn cart-btn" aria-label="Shopping Cart" onClick={() => navigate('/cart')}>
            <FiShoppingBag className="header-icon" />
            <span className="cart-badge">{cartCount}</span>
          </button>
        </div>
      </div>
      <SearchDrawer isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;
