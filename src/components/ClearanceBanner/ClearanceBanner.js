import React from 'react';
import './ClearanceBanner.css';

const ClearanceBanner = () => {
  return (
    <div className="clearance-banner">
      <div className="clearance-banner-blob"></div>
      
      <div className="clearance-content">
        <div className="clearance-tag">LIMITED TIME</div>
        <h2 className="clearance-title">Special Clearance Offer</h2>
        <h3 className="clearance-discount">Up to 50% OFF</h3>
        <p className="clearance-desc">Discover amazing deals on our premium ethnic wear collection.</p>
        <button className="clearance-btn">
          Shop Clearance Sale &rarr;
        </button>
      </div>

      <div className="clearance-image">
        {/* Simple line art SVG for shopping/gift bag to match the screenshot style */}
        <svg width="160" height="160" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
      </div>
    </div>
  );
};

export default ClearanceBanner;
