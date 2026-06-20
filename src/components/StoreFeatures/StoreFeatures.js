import React from 'react';
import { FiBox, FiCheckCircle, FiMessageCircle } from 'react-icons/fi';
import './StoreFeatures.css';

const StoreFeatures = () => {
  return (
    <section className="store-features-section">
      <div className="store-features-grid">
        <div className="feature-item">
          <div className="feature-icon-wrapper">
            <FiBox className="feature-icon" />
          </div>
          <h3 className="feature-title">Free Shipping</h3>
          <p className="feature-desc">
            Enjoy free delivery across India on prepaid orders above ₹ 2000.
          </p>
        </div>

        <div className="feature-item">
          <div className="feature-icon-wrapper">
            <FiCheckCircle className="feature-icon" />
          </div>
          <h3 className="feature-title">Exchange</h3>
          <p className="feature-desc">
            Exchange within 7 days, please make sure the items are in undamaged condition. <span className="feature-link">Read Exchange Policy.</span>
          </p>
        </div>

        <div className="feature-item">
          <div className="feature-icon-wrapper">
            <FiMessageCircle className="feature-icon" />
          </div>
          <h3 className="feature-title">Support Online</h3>
          <p className="feature-desc">
            We're available Monday to Saturday, 10:30 AM - 6:00 PM. Closed on Sundays. Feel free to reach out - we're here to help!
          </p>
        </div>
      </div>
    </section>
  );
};

export default StoreFeatures;
