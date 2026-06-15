import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = ({ onNavigate }) => {
  const [quantity, setQuantity] = useState(2);
  const [timeLeft, setTimeLeft] = useState({ minutes: 1, seconds: 57 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    return `${String(time.minutes).padStart(2, '0')}m ${String(time.seconds).padStart(2, '0')}s`;
  };

  const price = 1999;
  const total = price * quantity;

  return (
    <div className="cart-page">
      <div className="cart-container-filled">
        <div className="cart-header">
          <p className="cart-breadcrumbs">Home · Your Shopping Cart</p>
          <h1 className="cart-title">Shopping Cart</h1>
          <p className="cart-subtitle">Review your selected items before purchase. Enjoy a seamless shopping experience!</p>
        </div>

        <div className="cart-urgency-banner">
          <p>🔥 Products are limited, checkout within <span>{formatTime(timeLeft)}</span></p>
        </div>

        <div className="cart-main-content">
          <div className="cart-items-section">
            <div className="cart-table-header">
              <div className="col-product">Product</div>
              <div className="col-price">Price</div>
              <div className="col-quantity">Quantity</div>
              <div className="col-total">Total</div>
            </div>
            
            <div className="cart-item">
              <div className="col-product item-details">
                <img src="/images/frock1.png" alt="Baby Girl Yellow & Green Banarasi Pattu Gown" className="cart-item-img" />
                <div className="item-info">
                  <h3>Baby Girl Yellow & Green<br/>Banarasi Pattu Gown - Aari Work<br/>Coat Pattu Gown Set PG706</h3>
                  <p>Size: M</p>
                  <button className="remove-btn">Remove</button>
                </div>
              </div>
              <div className="col-price">
                Rs. {price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <div className="col-quantity">
                <div className="quantity-selector">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)}>+</button>
                </div>
              </div>
              <div className="col-total">
                Rs.<br/>{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          <div className="cart-sidebar">
            <div className="sidebar-section">
              <h4>Add Order Note</h4>
              <textarea placeholder="Add Order Note" className="order-note-textarea"></textarea>
            </div>
            
            <div className="sidebar-section">
              <h4>Estimate Shipping</h4>
              <p className="shipping-label">Country/region</p>
              <select className="shipping-select">
                <option>India</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
