import React from 'react';
import './FactoryImages.css';

const FactoryImages = () => {
  return (
    <section className="factory-section">
      <div className="factory-image-container">
        <img src="/images/factory1.png" alt="From Our Own Unit" />
      </div>
      <div className="factory-image-container">
        <img src="/images/factory2.png" alt="100% Genuine - Premium Quality" />
      </div>
    </section>
  );
};

export default FactoryImages;
