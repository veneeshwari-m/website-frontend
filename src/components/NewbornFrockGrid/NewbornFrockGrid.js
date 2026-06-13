import React from 'react';
import './NewbornFrockGrid.css';

const products = [
  // First row
  { id: 1, name: "Newborn Naming Ceremony Pattu...", price: "Rs. 850.00", img: "/images/halter1.png" },
  { id: 2, name: "Newborn Pattu Frock with Peacock...", price: "Rs. 850.00", img: "/images/halter2.png" },
  { id: 3, name: "Baby Pattu Frock Green Purple Silk...", price: "Rs. 850.00", img: "/images/halter3.png" },
  { id: 4, name: "Newborn Baby Girl Pink Gold Silk...", price: "Rs. 850.00", img: "/images/halter4.png" },
  // Second row
  { id: 5, name: "Newborn Baby Girl Silver Grey Silk...", price: "Rs. 850.00", img: "/images/halter1.png" },
  { id: 6, name: "Pink Silk Pattu Frock for Baby Girls...", price: "Rs. 850.00", img: "/images/halter2.png" },
  { id: 7, name: "Newborn Baby Girl Royal Blue Silk...", price: "Rs. 850.00", img: "/images/halter3.png" },
  { id: 8, name: "Newborn Baby Girl Yellow Silk Pattu...", price: "Rs. 850.00", img: "/images/halter4.png" }
];

const NewbornFrockGrid = ({ onNavigate }) => {
  return (
    <section className="newborn-grid-section">
      <div className="newborn-grid-header">
        <h2>Newborn Pattu Frock</h2>
      </div>
      
      <div className="newborn-grid-container">
        {products.map(product => (
          <div key={product.id} className="newborn-card">
            <div className="newborn-image-container">
              <img src={product.img} alt={product.name} onError={(e) => { e.target.src = "https://placehold.co/300x400/e8e8e8/8a2b8f?text=Frock" }} />
              <div className="newborn-badge">
                <img src="/images/logo.png" alt="logo" style={{width: '20px', height: '20px', objectFit: 'contain'}} onError={(e) => e.target.style.display = 'none'} />
              </div>
            </div>
            <div className="newborn-info">
              <h3 className="newborn-title">{product.name}</h3>
              <p className="newborn-price">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="newborn-view-all-btn" onClick={() => onNavigate && onNavigate('newborn-plp', 'All Categories')}>
        View Full Collection &gt;
      </button>
    </section>
  );
};

export default NewbornFrockGrid;
