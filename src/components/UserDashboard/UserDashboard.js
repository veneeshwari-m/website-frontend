import React, { useState, useEffect } from 'react';
import './UserDashboard.css';
import AddProduct from '../AddProduct/AddProduct';


const UserDashboard = ({ onNavigate, onLogout }) => {
  const [activeTab, setActiveTab] = useState('orders');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUserData(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    if (onLogout) onLogout();
  };

  return (
    <div className="user-dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <img
            src="/images/logo.png"
            alt="shop"
            className="dashboard-logo"
            onClick={() => onNavigate('home')}
            style={{ cursor: 'pointer' }}
          />
          <nav className="dashboard-nav">
            <button
              className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              Orders
            </button>
            <button
              className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`nav-btn ${activeTab === 'add-product' ? 'active' : ''}`}
              onClick={() => setActiveTab('add-product')}
            >
              Add Product
            </button>
          </nav>
        </div>
        <div className="header-right">
          <div style={{ position: 'relative' }}>
            <div 
              className="user-avatar" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{ cursor: 'pointer', fontWeight: 'bold' }}
            >
              {userData?.username ? userData.username.charAt(0).toUpperCase() : 'U'}
            </div>
            
            {isDropdownOpen && (
              <div style={{ 
                position: 'absolute', 
                top: '50px', 
                right: '0', 
                background: 'white', 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)', 
                zIndex: 1000, 
                minWidth: '180px', 
                padding: '10px 0' 
              }}>
                {userData && (
                  <div style={{ padding: '0 15px 10px', borderBottom: '1px solid #eee', marginBottom: '5px' }}>
                    <div style={{ fontWeight: 'bold', color: '#333', fontSize: '15px' }}>{userData.username}</div>
                    <div style={{ color: '#777', fontSize: '13px', marginTop: '2px', wordBreak: 'break-all' }}>{userData.email}</div>
                  </div>
                )}
                <div 
                  onClick={handleLogout} 
                  style={{ 
                    padding: '8px 15px', 
                    cursor: 'pointer', 
                    color: '#d93025', 
                    fontWeight: '500', 
                    display: 'flex', 
                    alignItems: 'center'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {activeTab === 'orders' && (
          <div className="orders-section">
            <h2>Orders</h2>
            <div className="no-orders-card">
              <h3>No orders yet</h3>
              <p>Go to store to place an order.</p>
            </div>
          </div>
        )}
        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2>Profile</h2>
            <div className="profile-card">
              <p>Profile details will appear here.</p>
            </div>
          </div>
        )}
        {activeTab === 'add-product' && (
          <div className="add-product-section">
            <AddProduct />
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
