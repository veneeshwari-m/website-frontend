import React, { useState, useEffect } from 'react';
import './Header.css';
import { FiSearch, FiUser, FiShoppingBag } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { GraphQLClient, gql } from 'graphql-request';

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
              <a href="/">Home</a>
            </li>
            {categories.map((category) => (
              <li className="nav-item" key={category.id}>
                <a href={`/categories/${category.code}`}>
                  {category.name}
                  {category.subCategories && category.subCategories.length > 0 && (
                    <MdKeyboardArrowDown className="nav-arrow" />
                  )}
                </a>
              </li>
            ))}
            <li className="nav-item">
              <a href="/clearance">Clearance Sale Live Now!</a>
            </li>
            <li className="nav-item">
              <a href="/stores">Our Stores</a>
            </li>
            <li className="nav-item">
              <a href="/blog">Blog</a>
            </li>
          </ul>
        </nav>

      
        <div className="header-icons">
          <button className="icon-btn" aria-label="Search">
            <FiSearch />
          </button>
          <button className="icon-btn" aria-label="User Profile">
            <FiUser />
          </button>
          <button className="icon-btn cart-btn" aria-label="Shopping Cart">
            <FiShoppingBag />
            <span className="cart-badge">4</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
