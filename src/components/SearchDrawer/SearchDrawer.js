import React from 'react';
import './SearchDrawer.css';

const SearchDrawer = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`search-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`search-drawer ${isOpen ? 'open' : ''}`}>
        <div className="search-header">
          <h2>Search Our Site</h2>
          <button className="close-btn" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div className="search-body">
          <div className="search-input-wrapper">
            <input type="text" placeholder="I'm looking for..." autoFocus={isOpen} />
            <button className="search-submit-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </div>

          <div className="trending-search">
            <h3>Trending Search</h3>
            <div className="trending-tags">
              <button>Newborn Pattu Frock</button>
              <button>Girls Pattu Pavadai</button>
              <button>Chettinad Cotton Pattupavadai</button>
              <button>Pattu Frock</button>
              <button>Tamil Newyear collection</button>
              <button>Best selling products</button>
            </div>
          </div>

          <div className="popular-products">
            <h3>Popular Products</h3>
            <div className="product-item">
              <img src="/images/hero_banner.png" alt="Product" />
              <div className="product-info">
                <h4>Newborn Baby Girl Green Banarasi Silk Frock - Bow Shoulder Zari Border Naming Dress...</h4>
                <p className="price">Rs. 850.00</p>
              </div>
            </div>
            <div className="product-item">
              <img src="/images/hero_banner.png" alt="Product" />
              <div className="product-info">
                <h4>Kerala Pattu Frock for Baby Girls Green Kasavu Traditional Dress LE1904</h4>
                <p className="price">Rs. 950.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchDrawer;
