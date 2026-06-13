import React from 'react';
import './Hero.css';

const Hero = ({ onNavigate }) => {
  return (
    <section className="hero-section" style={{ backgroundImage: `url('/images/hero_banner.png')` }}>
      <div className="hero-content">
        <h2 className="hero-subtitle">Dress her like a</h2>
        <h1 className="hero-title">
          <span className="crown-icon">
             <svg width="45" height="45" viewBox="0 0 24 24" fill="#c39d48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 14l2-8 3.5 4.5L12 3l2.5 7.5L18 6l2 8H4zM4 16h16v2H4v-2z" />
             </svg>
          </span>
          Princess
        </h1>
        <div className="hero-divider">
          <span className="divider-icon">
             <svg width="30" height="20" viewBox="0 0 24 24" fill="#c39d48" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L9 8h6l-3-6zm-4 8L3 12l5 4v-4zm8 0v4l5-4-5-4zm-4 2l-3 6h6l-3-6z" />
             </svg>
          </span>
        </div>
        <p className="hero-description">Premium ethnic wear for every celebration</p>
        <button className="shop-now-btn" onClick={() => onNavigate && onNavigate('newborn-plp', 'All Categories')}>SHOP NOW</button>
      </div>
    </section>
  );
};

export default Hero;
