import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Background Banner Image */}
        <img
          src="/images/hero_banner.png"
          alt="Prince 'N' Princess Latest Collection"
          className="hero-image"
        />

        {/* HTML Content Overlay */}
        <div className="hero-content-overlay">
          <h2 className="hero-subtitle">Dress her like a</h2>
          <h1 className="hero-title">Princess</h1>
          <p className="hero-desc">Premium ethnic wear for every celebration</p>
          <button
            className="hero-shop-now-btn-visible"
            onClick={() => window.location.href = '/shop'}
          >
            SHOP NOW
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
