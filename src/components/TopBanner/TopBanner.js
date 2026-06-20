import React, { useState, useEffect } from 'react';
import './TopBanner.css';
import { FaLessThan ,  FaGreaterThan } from "react-icons/fa";


const messages = [
  "Welcome to our store",
  "Unlock Free Shipping on Your Order When You Spend Rs 2000 or More!"
];

const TopBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + messages.length) % messages.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="top-banner">
      <div className="top-banner-content">
        <button className="banner-nav-btn" onClick={prevSlide}><FaLessThan /></button>
        <div className="banner-text-container">
          <span className="banner-text" key={currentIndex}>{messages[currentIndex]}</span>
        </div>
        <button className="banner-nav-btn" onClick={nextSlide}><FaGreaterThan /></button>
      </div>
    </div>
  );
};

export default TopBanner;