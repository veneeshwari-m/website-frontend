import React, { useState, useEffect } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import './Cart.css';

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || "http://localhost:2000/graphql";

const GET_CART = gql`
  query GetCartByUserId($userId: ID!) {
    getCartByUserId(userId: $userId) {
      id
      userId
      shopId
      products {
        productId
        quantity
        price
        mrp
        productName
        productImage
      }
      subTotal
      status
      createdAt
      updatedAt
    }
  }
`;

const Cart = ({ onNavigate }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ minutes: 10, seconds: 0 });

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

  const fetchCart = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem('token');
      let userId = localStorage.getItem('guestId');
      
      if (token) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.id) userId = user.id;
      }

      if (!userId) {
        setLoading(false);
        return;
      }

      const client = new GraphQLClient(GRAPHQL_ENDPOINT);
      if (token) client.setHeader('Authorization', `Bearer ${token}`);

      const data = await client.request(GET_CART, { userId });
      setCart(data.getCartByUserId);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return <div style={{ padding: '100px', textAlign: 'center' }}>Loading cart...</div>;
  }

  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container-filled" style={{ textAlign: 'center', padding: '100px 20px' }}>
          <h2>Your Cart is Empty</h2>
          <p>Go back to the store to add some products!</p>
          <button className="checkout-btn" style={{ maxWidth: '200px', margin: '20px auto' }} onClick={() => onNavigate('home')}>Continue Shopping</button>
        </div>
      </div>
    );
  }

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
            
            {cart.products.map((item, idx) => (
              <div key={idx} className="cart-item">
                <div className="col-product item-details">
                  <img src={item.productImage} alt={item.productName} className="cart-item-img" onError={(e) => { e.target.src = "https://placehold.co/80x100/e8e8e8/8a2b8f?text=Item" }} />
                  <div className="item-info">
                    <h3>{item.productName}</h3>
                    <p>Size: M</p>
                    {/* Add remove logic if needed */}
                  </div>
                </div>
                <div className="col-price">
                  Rs. {item.price?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <div className="col-quantity">
                  <div className="quantity-selector">
                    <span style={{ paddingLeft: '10px' }}>{item.quantity}</span>
                  </div>
                </div>
                <div className="col-total">
                  Rs.<br/>{(item.price * item.quantity)?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-sidebar">
            <div className="sidebar-section">
              <h4>Add Order Note</h4>
              <textarea placeholder="Add Order Note" className="order-note-textarea"></textarea>
            </div>
            
            <div className="sidebar-divider"></div>

            <div className="sidebar-section">
              <h4>Estimate Shipping</h4>
              
              <p className="shipping-label">Country/region</p>
              <select className="shipping-select">
                <option>United States</option>
                <option>India</option>
              </select>

              <p className="shipping-label">Province</p>
              <select className="shipping-select">
                <option>Alabama</option>
                <option>California</option>
              </select>

              <p className="shipping-label">Postal/ZIP code</p>
              <input type="text" className="shipping-input" placeholder="Postal/ZIP code" />

              <button className="estimate-btn">Estimate Shipping</button>
            </div>

            <div className="sidebar-divider"></div>

            <div className="sidebar-subtotal">
              <div className="subtotal-row">
                <span>Subtotal</span>
                <span>Rs. {cart.subTotal?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <p className="subtotal-note">Taxes and shipping and discounts calculated at checkout</p>
            </div>

            <div className="sidebar-divider"></div>

            <div className="discount-section">
              <div className="discount-input-group">
                <input type="text" className="discount-input" placeholder="Discount Code" />
                <button className="apply-btn">Apply</button>
              </div>
            </div>

            <button className="checkout-btn" onClick={() => onNavigate('payment')}>Check Out</button>

            <div className="sidebar-footer-info">
              <div className="info-block">
                <h5>Delivery Information</h5>
                <p>Exchange within 7 days, please make sure the items are in undamaged condition.</p>
              </div>
              <div className="info-block">
                <h5>Quality Guarantee</h5>
                <p>Encountering issues with your tights? Reach out to us for assistance</p>
              </div>
              <div className="info-block">
                <h5>Payment Support</h5>
                <img src="/images/razorpay.png" alt="Razorpay" className="razorpay-logo" onError={(e) => { e.target.style.display = 'none' }} />
              </div>
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
