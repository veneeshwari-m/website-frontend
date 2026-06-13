import React from 'react';
import './NewArrivalGrid.css';

const products = [
  { id: 1, name: "Baby Girl Purple Banarasi Pattu Gown - Aari Work Coat Pattu Gown Set PG709", img: "/images/gown2.png" },
  { id: 2, name: "Girls Chettinad Pattu Pavadai - Maroon Cotton Halter Neck Set PPP2065", img: "/images/frock3.png" },
  { id: 3, name: "Girls Chettinad Pattu Pavadai - Purple Cotton Halter Neck Set (1-6 Yrs)...", img: "/images/frock1.png" },
  { id: 4, name: "Baby Girl Cream Kalamkari Cotton Dress - Elephant Tribal Print Flutter...", img: "/images/halter2.png" },
  { id: 5, name: "Baby Girl Yellow & Green Banarasi Pattu Gown - Aari Work Coat Pattu...", img: "/images/gown1.png" }
];

const NewArrivalGrid = ({ onNavigate }) => {
  return (
    <section className="new-arrival-section">
      <div className="new-arrival-container">
        {products.map(product => (
          <div key={product.id} className="new-arrival-card">
            <img src={product.img} alt={product.name} className="new-arrival-image" onError={(e) => { e.target.src = "https://placehold.co/300x330/e8e8e8/8a2b8f?text=New+Arrival" }} />
            <div className="new-arrival-info">
              <h3 className="new-arrival-title">{product.name}</h3>
              <button className="new-arrival-btn" onClick={() => onNavigate && onNavigate('pdp')}>
                Shop Now <span role="img" aria-label="eyes">👀</span><span role="img" aria-label="yellow heart">💛</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivalGrid;
