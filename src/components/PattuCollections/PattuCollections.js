import React from 'react';
import '../ProductGrid/ProductGrid.css';

const products = [
  { id: 1, name: "Girls Chettinad Pattu Pavadai \u2013 Mustard Gold Cotton Halt...", price: "Rs. 1,599.00", img: "/images/gown1.png" },
  { id: 2, name: "Baby Girl Bronze Brocade Halter Top & Silver Silk Ski...", price: "Rs. 1,499.00", img: "/images/gown2.png" },
  { id: 3, name: "Festival Pattu Pavadai Boat Neck Aari Work Purple Patt...", price: "Rs. 1,899.00", img: "/images/gown3.png" },
  { id: 4, name: "Girls Chettinad Pattu Pavadai \u2013 Copper Cotton Halter Set...", price: "Rs. 1,599.00", img: "/images/gown4.png" },
  { id: 5, name: "Girls Chettinad Pattu Pavadai - Rama Blue Cotton Halter Ne...", price: "Rs. 1,599.00", img: "/images/gown5.png" },
];

const PattuCollections = ({ onNavigate }) => {
  return (
    <section className="product-grid-section" style={{ borderTop: '1px solid #eaeaea' }}>
      <div className="product-grid-header">
        <h2>Exclusive Pattu Pavadai Collections</h2>
      </div>
      
      <div className="product-grid-container">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.img} alt={product.name} onError={(e) => { e.target.src = "https://placehold.co/300x400/e8e8e8/8a2b8f?text=Pattu" }} />
              <div className="product-badge">
                <img src="/images/logo.png" alt="logo" style={{width: '20px', height: '20px', objectFit: 'contain'}} onError={(e) => e.target.style.display = 'none'} />
              </div>
            </div>
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-price">{product.price}</p>
              <button className="select-options-btn">Select Options</button>
            </div>
          </div>
        ))}
      </div>

      <div className="product-grid-footer">
        <button className="shop-more-btn" onClick={() => onNavigate && onNavigate('girls-plp', 'Pattu Pavadai')}>View All</button>
      </div>
    </section>
  );
};

export default PattuCollections;
