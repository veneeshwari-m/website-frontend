import React, { useState } from 'react';
import './Header.css';
import SearchDrawer from '../SearchDrawer/SearchDrawer';

const Header = ({ onNavigate, currentPage }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="main-header">
        <div className="header-container">
          <div className="header-left">
            <img src="/images/logo.png" alt="shop Logo" className="logo" onClick={() => onNavigate && onNavigate('home')} style={{ cursor: 'pointer' }} />
          </div>

          <nav className="header-center">
            <ul className="nav-links">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }} className={currentPage === 'home' ? 'active-link' : ''}>Home</a></li>
              <li className="nav-item-dropdown">
                <a href="#boys" className={`has-dropdown ${currentPage === 'kurta-pajama' ? 'active-link' : ''}`}>Boys <svg className="dropdown-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
                <div className="dropdown-menu">
                  <a href="#traditional" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('kurta-pajama', 'Traditional'); }}>Traditional</a>
                  <a href="#modern" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('kurta-pajama', 'Modern'); }}>Modern</a>
                  <a href="#nightwear" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('kurta-pajama', 'Nightwear'); }}>Nightwear</a>
                </div>
              </li>
              <li className="nav-item-dropdown">
                <a href="#girls" className={`has-dropdown ${currentPage === 'girls-plp' ? 'active-link' : ''}`}>Girls <svg className="dropdown-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
                <div className="dropdown-menu">
                  <a href="#traditional" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('girls-plp', 'Traditional'); }}>Traditional</a>
                  <a href="#modern" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('girls-plp', 'Modern'); }}>Modern</a>
                  <a href="#nightwear" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('girls-plp', 'Nightwear'); }}>Nightwear</a>
                </div>
              </li>
              <li className="nav-item-dropdown">
                <a href="#newborn" className={`has-dropdown ${currentPage === 'newborn-plp' ? 'active-link' : ''}`}>NewBorn <svg className="dropdown-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
                <div className="dropdown-menu">
                  <a href="#giftbox" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('newborn-plp', 'Newborn Giftbox'); }}>Newborn Giftbox</a>
                  <a href="#pattu" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('newborn-plp', 'Newborn Pattu Frock'); }}>Newborn Pattu Frock</a>
                </div>
              </li>
              <li className="nav-item-dropdown">
                <a href="#bestselling" className={`has-dropdown ${currentPage === 'bestselling-plp' ? 'active-link' : ''}`}>Best Selling Products <svg className="dropdown-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
                <div className="dropdown-menu">
                  <a href="#festival" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('bestselling-plp', 'Festival Collection'); }}>Festival Collection</a>
                  <a href="#birthday" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('bestselling-plp', 'Birthday Collection'); }}>Birthday Collection</a>
                </div>
              </li>
              <li><a href="#clearance" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('clearance-plp', 'All Categories'); }} className={currentPage === 'clearance-plp' ? 'active-link' : ''}>Clearance Sale Live Now!</a></li>
              <li><a href="#stores" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('stores-page'); }} className={currentPage === 'stores-page' ? 'active-link' : ''}>Our Stores</a></li>
              <li><a href="#blog" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('blog-page'); }} className={currentPage === 'blog-page' ? 'active-link' : ''}>Blog</a></li>
            </ul>
          </nav>

          <div className="header-right">
            <button className="icon-btn search-btn" onClick={() => setIsSearchOpen(true)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
            <button className="icon-btn user-btn" onClick={() => onNavigate && onNavigate('signin')}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </button>
            <button className="icon-btn cart-btn" onClick={() => onNavigate && onNavigate('cart')}>
              <div className="cart-icon-wrapper">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                <span className="cart-badge">0</span>
              </div>
            </button>
          </div>
        </div>
      </header>
      <SearchDrawer isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
