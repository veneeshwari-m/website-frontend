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

            <div className="cart-features-row">
              <div className="feature-box">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                </div>
                <h5>Have Questions?</h5>
                <p>Our experts are here to help! Call us free.</p>
              </div>
              <div className="feature-box">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <h5>Secure Shopping</h5>
                <p>All transactions are protected by SSL...</p>
              </div>
              <div className="feature-box">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <h5>Privacy Protection</h5>
                <p>Your privacy is always our top priority.</p>
              </div>
            </div>

            <div className="cart-recommendations">
              <h3 className="recommendations-title">You may also like...</h3>
              <div className="recommendations-grid">
                <div className="recommendation-card">
                  <div className="rec-img-wrapper">
                    <img src="/images/frock2.png" alt="Baby Girl Red & Rose Gold Banarasi Pattu Gown" className="rec-img" />
                  </div>
                  <div className="rec-details">
                    <h4>Baby Girl Red & Rose Gold Banarasi Pattu Gown - Aar...</h4>
                    <p className="rec-price">Rs. 1,999.00</p>
                    <button className="rec-select-options">Select Options</button>
                  </div>
                </div>
                <div className="recommendation-card">
                  <div className="rec-img-wrapper">
                    <img src="/images/frock3.png" alt="Party Gown for Girl" className="rec-img" />
                  </div>
                  <div className="rec-details">
                    <h4>Party Gown for Girl - Baby Girl Purple Sequin Lace &...</h4>
                    <p className="rec-price">Rs. 1,399.00</p>
                    <button className="rec-select-options">Select Options</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cart-sidebar">
            <div className="sidebar-section">
              <h4>Add Order Note</h4>
              <textarea placeholder="Add Order Note" className="order-note-textarea"></textarea>
            </div>
            
            <div className="sidebar-section estimate-shipping-section">
              <hr className="sidebar-divider" />
              <h4 className="estimate-shipping-heading">Estimate Shipping</h4>
              
              <p className="shipping-label">Country/region</p>
              <div className="select-container">
                <select className="shipping-select">
                  <option>United States</option>
                </select>
                <span className="select-arrow"></span>
              </div>

              <p className="shipping-label">Province</p>
              <div className="select-container">
                <select className="shipping-select">
                  <option>Alabama</option>
                </select>
                <span className="select-arrow"></span>
              </div>

              <p className="shipping-label">Postal/ZIP code</p>
              <input type="text" className="shipping-input" placeholder="Postal/ZIP code" />

              <button className="estimate-btn">Estimate Shipping</button>
              
              <hr className="sidebar-divider" />
              
              <div className="subtotal-container">
                <span className="subtotal-label">Subtotal:</span>
                <span className="subtotal-value">Rs. 1,999.00</span>
              </div>
              <p className="tax-shipping-text">Taxes and shipping and discounts calculated at checkout</p>
              
              <hr className="sidebar-divider" />
              
              <div className="discount-container">
                <input type="text" className="discount-input" placeholder="Discount Code" />
                <button className="apply-btn">Apply</button>
              </div>

              <button className="checkout-btn">Check Out</button>
            </div>

            <div className="sidebar-section delivery-info-section">
              <h4 className="info-heading">Delivery Information</h4>
              <p className="info-text">Exchange within 7 days, please make sure the items are in undamaged condition.</p>
              
              <h4 className="info-heading mt-15">Quality Gaurantee</h4>
              <p className="info-text">Encountering issues with your tights? Reach out to us for assistance.</p>

              <h4 className="info-heading mt-15">Payment Support</h4>
              <div className="payment-support-logos">
                <span style={{ fontStyle: 'italic', fontWeight: 'bold', color: '#0d2366', fontSize: '18px' }}>Razorpay</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cart-trust-section">
        <h2 className="trust-heading">🌍 This wasn't easy... but you made it possible.</h2>
        <p className="trust-subheading">From India to the world - thank you for trusting us ❤️</p>
        
        <div className="trust-scorecards">
          <div className="scorecard-wrapper">
            <img src="/images/scorecard-india.png" alt="India Scorecard" className="scorecard-img" />
          </div>
          <div className="scorecard-wrapper">
            <img src="/images/scorecard-uk.png" alt="UK Scorecard" className="scorecard-img" />
          </div>
          <div className="scorecard-wrapper">
            <img src="/images/scorecard-uae.png" alt="UAE Scorecard" className="scorecard-img" />
          </div>
        </div>

        <div className="cart-bottom-features">
          <div className="bottom-feature-item">
            <div className="bottom-feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </div>
            <h4>Free Shipping</h4>
            <p>Enjoy free delivery across India on prepaid orders above ₹ 2000.</p>
          </div>
          <div className="bottom-feature-item">
            <div className="bottom-feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h4>Exchange</h4>
            <p>Exchange within 7 days, please make sure the items are in undamaged condition. <em>Read Exchange Policy.</em></p>
          </div>
          <div className="bottom-feature-item">
            <div className="bottom-feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </div>
            <h4>Support Online</h4>
            <p>We're available Monday to Saturday, 10:30 AM - 6:00 PM. Closed on Sundays. Feel free to reach out - we're here to help!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
