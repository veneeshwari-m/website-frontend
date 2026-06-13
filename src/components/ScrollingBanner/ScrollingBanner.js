import React from 'react';
import './ScrollingBanner.css';

const ScrollingBanner = () => {
  // Repeat the text 10 times to ensure seamless infinite scrolling
  const items = Array(10).fill(0);

  return (
    <div className="scrolling-banner-container">
      <div className="scrolling-content">
        {items.map((_, index) => (
          <span key={index} className="scrolling-text-item">
            New Arrival Spotlight – Discover What Everyone's Loving Now 👀
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScrollingBanner;
