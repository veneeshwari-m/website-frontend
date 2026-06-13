import React from 'react';
import './StoreQuality.css';

const scorecards = [
  { id: 1, img: "/images/scorecard1.png", alt: "India Store Quality" },
  { id: 2, img: "/images/scorecard2.png", alt: "UK Store Quality" },
  { id: 3, img: "/images/scorecard3.png", alt: "UAE Store Quality" }
];

const StoreQuality = () => {
  return (
    <section className="store-quality-section">
      <div className="store-quality-grid">
        {scorecards.map(card => (
          <div key={card.id} className="store-quality-card">
            <img src={card.img} alt={card.alt} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default StoreQuality;
