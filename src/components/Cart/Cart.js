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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
