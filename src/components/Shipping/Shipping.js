import React from 'react';
import './Shipping.css';

const Shipping = () => {
  return (
    <div className="shipping-page">
      <div className="shipping-container">
        <h1 className="shipping-title">Domestic & International Shipping</h1>
        
        <div className="shipping-section">
          <h2>Domestic Shipping (Within India)</h2>
          <p>We ship across India from our facility in Coimbatore, Tamil Nadu.</p>
          <ul className="shipping-list">
            <li>Delivery timelines may vary depending on the destination.</li>
            <li><strong>Faster delivery</strong> can be expected within <strong>Tamil Nadu</strong> and to <strong>Bengaluru</strong>, compared to other regions.</li>
            <li>For <strong>urgent delivery requests</strong>, please <strong>contact us</strong> before placing your order at +91-9952778217.</li>
            <li>Please note: <strong>Any delivery delays</strong> caused by the courier partner due to <strong>unavoidable circumstances</strong> are beyond our control.</li>
          </ul>
        </div>

        <hr className="shipping-divider" />

        <div className="shipping-section">
          <h2>International Shipping</h2>
          <p>We ship worldwide using trusted courier services like <strong>DHL, DTDC, or others</strong>, based on your selection at checkout.</p>
          <ul className="shipping-list">
            <li>Orders are <strong>dispatched within 2-4 working days</strong> from the date of purchase.</li>
            <li>Delivery time will vary depending on the destination and courier partner.</li>
            <li><strong>Customs Delays:</strong> There may be unforeseen delays due to <strong>customs clearance</strong> in India or the destination country. These are not within our or the courier's control.</li>
          </ul>

          <p style={{ marginTop: '20px' }}>Please Note:</p>
          <ul className="shipping-list">
            <li>We <strong>do not collect customs duties or taxes</strong>. Any such charges levied at the time of delivery must be <strong>borne by the customer</strong>.</li>
            <li>If you need assistance regarding international shipping or customs, feel free to contact us at <strong>+91-9952778217</strong>.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
