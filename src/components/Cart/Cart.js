import React from 'react';
import './Cart.css';
import StoreFeatures from '../StoreFeatures/StoreFeatures';

const Cart = ({ onNavigate }) => {
  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Your cart is empty</h1>

        <div className="cart-actions" style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '60px' }}>
          <button className="continue-shopping-btn" style={{ marginBottom: 0 }} onClick={() => onNavigate('home')}>
            Continue Shopping
          </button>
          <button className="checkout-btn" onClick={() => onNavigate('checkout')}>
            Checkout
          </button>
        </div>

        <div className="account-section">
          <h2>Have an account?</h2>
          <p>
            <span className="login-link" style={{ cursor: 'pointer' }} onClick={() => onNavigate('signin')}>Log in</span> to check out faster.
          </p>
        </div>
      </div>

      <div className="cart-footer">
        <h3><span className="globe-emoji" role="img" aria-label="globe">🌍</span> This wasn't easy... but you made it possible.</h3>
        <p>From India to the world - thank you for trusting us <span role="img" aria-label="heart">💖</span></p>
      </div>

      <StoreFeatures />
    </div>
  );
};

export default Cart;
