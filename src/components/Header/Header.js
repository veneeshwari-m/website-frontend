import React, { useState, useEffect } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import './Header.css';
import SearchDrawer from '../SearchDrawer/SearchDrawer';
import Navigation from '../Navigation/Navigation';

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:2000/graphql';

const GET_CART = gql`
  query GetCartByUserId($userId: ID!) {
    getCartByUserId(userId: $userId) {
      id
      totalQuantity
    }
  }
`;

const Header = ({ onNavigate, currentPage, isAuthenticated, setIsAuthenticated }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) setUserData(JSON.parse(storedUser));
    }
  }, [isAuthenticated]);

  const fetchCartCount = async () => {
    try {
      let userId = localStorage.getItem('guestId');
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed && parsed.id) userId = parsed.id;
      }
      
      if (!userId) return;

      const client = new GraphQLClient(GRAPHQL_ENDPOINT);
      const data = await client.request(GET_CART, { userId });
      if (data && data.getCartByUserId) {
        setCartCount(data.getCartByUserId.totalQuantity || 0);
      }
    } catch (err) {
      console.error('Error fetching cart count:', err);
    }
  };

  useEffect(() => {
    fetchCartCount();
    window.addEventListener('cartUpdated', fetchCartCount);
    return () => {
      window.removeEventListener('cartUpdated', fetchCartCount);
    };
  }, []);

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

          <Navigation onNavigate={onNavigate} currentPage={currentPage} />

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
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
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
