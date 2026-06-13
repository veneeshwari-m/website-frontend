import React from 'react';
import './Cancellation.css';

const Cancellation = () => {
  return (
    <div className="cancellation-page">
      <div className="cancellation-container">
        <h1 className="cancellation-title">Cancellation, Refund & Exchange</h1>

        <div className="cancellation-section">
          <h2>Cancellation, Returns & Refund Policy</h2>
          <p>
            At shop, we strive to provide a smooth and satisfying shopping experience. Please review our policies below to understand how cancellations, exchanges, and refunds are handled.
          </p>
        </div>

        <hr className="cancellation-divider" />

        <div className="cancellation-section">
          <h2 className="icon-heading">
            <span role="img" aria-label="exchange">🔄</span> Exchange Policy
          </h2>
          <ul className="cancellation-list">
            <li>Products are eligible for exchange after the customer receives the item.</li>
            <li>Customers are required to <strong>ship the product back to our warehouse</strong> at their own expense.</li>
            <li>Once we receive the item, the exchanged product will be shipped free of cost.</li>
          </ul>
        </div>

        <hr className="cancellation-divider" />

        <div className="cancellation-section">
          <h2 className="icon-heading">
            <span role="img" aria-label="cancel">❌</span> Order Cancellation
          </h2>
          <ul className="cancellation-list">
            <li>Orders can be cancelled only before they are shipped.</li>
            <li>To request a cancellation, please email us at info@princenprincess.in and WhatsApp us at +91-9952778217.</li>
            <li>If the order is eligible for cancellation, the refund will be processed within 4-7 working days to the same account used for payment.</li>
            <li>Please note: <strong>Bank processing times may cause additional delays beyond our control.</strong></li>
          </ul>
        </div>

        <hr className="cancellation-divider" />

        <div className="cancellation-section">
          <h2 className="icon-heading">
            <span role="img" aria-label="refund">💸</span> Refund Policy
          </h2>
          <p>Refunds will be issued under the following circumstances:</p>
          <ul className="cancellation-list">
            <li>If the product is damaged upon arrival</li>
            <li>If the package is lost in transit</li>
            <li>If the order was not dispatched due to unavailability of the product</li>
          </ul>
          <p>In all such cases, the full amount will be refunded to the original payment method within 4-7 working days after confirmation.</p>
        </div>

        <div className="cancellation-section" style={{ marginTop: '40px' }}>
          <p>For any questions or support, feel free to reach out:</p>
          <p style={{ marginTop: '10px' }}>
            📧 <a href="mailto:info@princenprincess.in" style={{ color: '#333', textDecoration: 'none' }}>info@princenprincess.in</a>
          </p>
          <p>
            📱 WhatsApp: <a href="https://wa.me/919952778217" style={{ color: '#800080', textDecoration: 'underline' }}>+91-9952778217</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cancellation;
