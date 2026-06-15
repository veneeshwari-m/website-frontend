import React, { useState, useEffect } from 'react';
import './Header.css';
import SearchDrawer from '../SearchDrawer/SearchDrawer';

const Header = ({ onNavigate, currentPage, isAuthenticated, setIsAuthenticated }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) setUserData(JSON.parse(storedUser));
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (setIsAuthenticated) setIsAuthenticated(false);
    setIsProfileDropdownOpen(false);
    if (onNavigate) onNavigate('home');
  };

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
            
            <div style={{ position: 'relative' }}>
              {isAuthenticated ? (
                <div 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #ddd', cursor: 'pointer', background: '#fff', marginLeft: '10px' }}
                >
                  <span style={{ fontSize: '18px', color: '#000', fontWeight: 'bold' }}>
                    {userData?.username ? userData.username.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
              ) : (
                <button className="icon-btn user-btn" onClick={() => onNavigate && onNavigate('signin')} style={{ marginLeft: '10px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </button>
              )}
              
              {isProfileDropdownOpen && isAuthenticated && (
                <div style={{ position: 'absolute', top: '45px', right: '0', background: 'white', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 1000, minWidth: '180px', padding: '10px 0' }}>
                  {userData && (
                    <div style={{ padding: '0 15px 10px', borderBottom: '1px solid #eee', marginBottom: '5px' }}>
                      <div style={{ fontWeight: 'bold', color: '#333', fontSize: '15px' }}>{userData.username}</div>
                      <div style={{ color: '#777', fontSize: '13px', marginTop: '2px', wordBreak: 'break-all' }}>{userData.email}</div>
                    </div>
                  )}
                  <div 
                    onClick={handleLogout} 
                    style={{ padding: '8px 15px', cursor: 'pointer', color: '#d93025', fontWeight: '500', display: 'flex', alignItems: 'center' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    Logout
                  </div>
                </div>
              )}
            </div>

            <button className="icon-btn cart-btn" onClick={() => onNavigate && onNavigate('cart')} style={{ marginLeft: '10px' }}>
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
