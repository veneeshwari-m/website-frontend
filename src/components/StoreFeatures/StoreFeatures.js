import React from 'react';
import './StoreFeatures.css';

const StoreFeatures = () => {
  return (
    <section className="store-features-section">
      <div className="store-features-container">
        <div className="scorecards-container">
          <div className="scorecard">
            <img src="/images/scorecard_india.png" alt="India Scorecard" />
          </div>
          <div className="scorecard">
            <img src="/images/scorecard_uk.png" alt="UK Scorecard" />
          </div>
          <div className="scorecard">
            <img src="/images/scorecard_uae.png" alt="UAE Scorecard" />
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </div>
            <h3>Free Shipping</h3>
            <p>Enjoy free delivery across India on prepaid orders above ₹ 2000.</p>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h3>Exchange</h3>
            <p>Exchange within 7 days, please make sure the items are in undamaged condition. <em style={{fontStyle: 'italic', color: '#333'}}>Read Exchange Policy.</em></p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><circle cx="8" cy="10" r="1"></circle><circle cx="12" cy="10" r="1"></circle><circle cx="16" cy="10" r="1"></circle></svg>
            </div>
            <h3>Support Online</h3>
            <p>We're available Monday to Saturday, 10:30 AM - 6:00 PM. Closed on Sundays. Feel free to reach out - we're here to help!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreFeatures;
