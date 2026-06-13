import React from 'react';
import './OrderStatus.css';

const OrderStatus = () => {
  return (
    <div className="order-status-page">
      <div className="order-status-container">
        <h1 className="page-title">Order Status & Delivery Process</h1>

        <div className="status-section">
          <h2>Order Status</h2>
          <p>
            At shop, we follow a structured and transparent order process to ensure a smooth shopping experience for parents. Below is a clear overview of each stage your order goes through after placement.
          </p>
        </div>

        <div className="status-section">
          <h2>Order Confirmed</h2>
          <p>
            Once your order is successfully placed, it is reviewed and confirmed by our team. This process typically takes half a day to one working day.
          </p>
        </div>

        <div className="status-section">
          <h2>Packed</h2>
          <p>
            After confirmation, your order is carefully packed with attention to quality and safety. Once packed, the parcel is handed over to our courier partner for pickup.
          </p>
        </div>

        <div className="status-section">
          <h2>Dispatched</h2>
          <p>
            When your order is dispatched, the tracking number along with a <strong>tracking link</strong> will be shared. You can track the shipment using the provided details.
          </p>
          <p>
            While most orders are delivered within the expected delivery timeframe, occasional delays may occur due to unforeseen courier or logistical factors beyond our control. We recommend planning purchases in advance, especially for time-sensitive occasions.
          </p>
        </div>

        <div className="status-section">
          <h2>Delivered</h2>
          <p>
            This status confirms that your order has been successfully delivered to the shipping address provided during checkout.
          </p>
        </div>

        <div className="status-section">
          <h2>Cancelled & Refund Initiated</h2>
          <p>
            In rare cases where dispatch is not possible due to product damage, unavailability, or operational issues, the order will be cancelled. If cancelled, the refund for the paid amount will be initiated as per our refund policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
