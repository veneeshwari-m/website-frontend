import React from 'react';
import './Exchange.css';

const Exchange = () => {
  return (
    <div className="exchange-page">
      <div className="exchange-container">
        <h1 className="exchange-title">Exchange Policy</h1>

        <p className="exchange-intro">
          We offer easy exchanges for both domestic and international orders. Please review the terms below to ensure a smooth process.
        </p>

        <div className="exchange-section">
          <h2>Eligibility</h2>
          <ul className="exchange-list">
            <li>Exchange requests must be initiated <strong>within 7 days</strong> of receiving your order.</li>
            <li>The item must reach our warehouse <strong>within 15 days</strong> from the date of delivery.</li>
            <li>Products must be <strong>unused, unwashed</strong>, and returned in original condition and packaging.</li>
            <li>Customers are responsible for shipping the item back to our return address.</li>
          </ul>
        </div>

        <div className="exchange-section">
          <h2>Exchange Shipping Charges</h2>
          <p><strong>If ₹50 shipping was paid at checkout:</strong></p>
          <ul className="exchange-list">
            <li>Return shipping (customer to us): Paid by customer</li>
            <li>Exchange shipping (we send back): Free</li>
          </ul>
          <p style={{ marginTop: '20px' }}><strong>If your order had free shipping:</strong></p>
          <ul className="exchange-list">
            <li>Return shipping (customer to us): Paid by customer</li>
            <li>Exchange shipping (we send back): ₹50 will be charged</li>
          </ul>
        </div>

        <div className="exchange-section">
          <h2>Additional Notes</h2>
          <ul className="exchange-list">
            <li>Exchanges are processed only <strong>after</strong> we receive and inspect the returned item.</li>
            <li>Items that do not meet the above conditions will not be eligible for exchange.</li>
          </ul>
          <p>For any support, please contact our customer service team.</p>

          <div style={{ marginTop: '25px', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '5px' }}>Return Address</p>
            <p style={{ marginBottom: '0' }}>shop</p>
            <p style={{ marginBottom: '0' }}>10C, 5th Street, Vasantha Nagar,</p>
            <p style={{ marginBottom: '0' }}>Near Shanthi Gears, Singanallur,</p>
            <p style={{ marginBottom: '0' }}>Coimbatore - 641005.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
