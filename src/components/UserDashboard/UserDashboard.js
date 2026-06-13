import React, { useState } from 'react';
import './UserDashboard.css';

const UserDashboard = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('orders');

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
          </nav>
        </div>
        <div className="header-right">
          <div className="user-avatar">V</div>
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
      </main>
    </div>
  );
};

export default UserDashboard;
