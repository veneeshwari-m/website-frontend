import React from 'react';
import './PromoBanner.css';

const PromoBanner = () => {
  return (
    <section className="promo-banner-section" style={{ backgroundImage: "url('/images/promo_bg.png')" }}>
      <div className="promo-banner-content">
        <h2 className="promo-banner-title">
          Pattu Frock<br />
          Upto 15% OFF
        </h2>
        <div className="promo-banner-divider">
          <svg width="80" height="15" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="10" x2="45" y2="10" stroke="#877d54" strokeWidth="1"/>
            <path d="M50 5 L55 10 L50 15 L45 10 Z" fill="#877d54" />
            <line x1="55" y1="10" x2="100" y2="10" stroke="#877d54" strokeWidth="1"/>
          </svg>
        </div>
        <div className="promo-banner-offers">
          <p>Buy 2 &ndash; Get 10% OFF</p>
          <p>Buy 3 &ndash; Get 15% OFF</p>
        </div>
        <button className="promo-shop-btn">SHOP NOW &rarr;</button>
      </div>
    </section>
  );
};

export default PromoBanner;
