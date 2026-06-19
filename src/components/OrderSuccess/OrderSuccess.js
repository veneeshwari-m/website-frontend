import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GraphQLClient, gql } from 'graphql-request';
import './OrderSuccess.css';

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:2000/graphql';

const GET_ORDER = gql`
  query GetOrder($id: ID!) {
    getOrderById(id: $id) {
      id
      orderNumber
      subTotal
      deliveryCharge
      totalAmount
      status
      paymentMethod
      deliveryAddress {
        name
        street
        city
        state
        country
        phone
      }
      items {
        productId
        name
        image
        quantity
        price
      }
      createdAt
    }
  }
`;

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const client = new GraphQLClient(GRAPHQL_ENDPOINT, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });

        const data = await client.request(GET_ORDER, { id: orderId });
        setOrder(data.getOrderById);
      } catch (err) {
        console.error("Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="order-success-page loading">
        <div className="spinner"></div>
        <p>Loading your order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-success-page error">
        <h2>Order not found</h2>
        <p>We couldn't retrieve your order details.</p>
        <button onClick={() => navigate('/')}>Return to Home</button>
      </div>
    );
  }

  return (
    <div className="order-success-page">
      <div className="success-header">
        <div className="success-icon-wrapper">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
        <h1>Order Successfully Placed!</h1>
        <p className="order-number-badge">Order #{order.orderNumber}</p>
        <p className="thank-you-text">Thank you for shopping with us! We have received your order and will begin processing it right away.</p>
      </div>

      <div className="order-details-container">
        <div className="order-items-section">
          <h2>Items in Your Order</h2>
          <div className="items-list">
            {order.items.map((item, idx) => (
              <div key={idx} className="order-item-card">
                <img src={item.image} alt={item.name} onError={(e) => { e.target.src = "https://placehold.co/80x100/e8e8e8/8a2b8f?text=Item" }} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-qty">Qty: {item.quantity}</p>
                  <p className="item-price">Rs. {item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-summary-section">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>Rs. {order.subTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Charge</span>
            <span>{order.deliveryCharge > 0 ? `Rs. ${order.deliveryCharge}` : 'Free'}</span>
          </div>
          <div className="summary-row total-row">
            <span>Total Paid</span>
            <span>Rs. {order.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="payment-method-row">
            <span>Payment Method:</span>
            <span className="badge">{order.paymentMethod === 'COD' ? 'Cash on Delivery' : order.paymentMethod}</span>
          </div>
        </div>

        <div className="shipping-details-section">
          <h2>Shipping Address</h2>
          <div className="address-card">
            <strong>{order.deliveryAddress.name}</strong>
            <p>{order.deliveryAddress.street}</p>
            <p>{order.deliveryAddress.city}, {order.deliveryAddress.state}</p>
            <p>{order.deliveryAddress.country}</p>
            <p className="phone">📞 {order.deliveryAddress.phone}</p>
          </div>
        </div>
      </div>

      <div className="success-footer-actions">
        <button className="primary-btn" onClick={() => navigate('/dashboard')}>Track Order</button>
        <button className="secondary-btn" onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default OrderSuccess;
