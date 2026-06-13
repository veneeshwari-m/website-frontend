import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <section className="features-section">
      <div className="features-grid">
        
        {/* Feature 1 */}
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <h3 className="feature-title">Free Shipping</h3>
          <p className="feature-desc">Enjoy free delivery across India on prepaid orders above ₹ 2000.</p>
        </div>

        {/* Feature 2 */}
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <h3 className="feature-title">Exchange</h3>
          <p className="feature-desc">Exchange within 7 days, please make sure the items are in undamaged condition. <a href="/exchange-policy" className="feature-link">Read Exchange Policy.</a></p>
        </div>

        {/* Feature 3 */}
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2z"></path>
              <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
            </svg>
          </div>
          <h3 className="feature-title">Support Online</h3>
          <p className="feature-desc">We're available Monday to Saturday, 10:30 AM - 6:00 PM. Closed on Sundays. Feel free to reach out - we're here to help!</p>
        </div>

      </div>
    </section>
  );
};

export default Features;
