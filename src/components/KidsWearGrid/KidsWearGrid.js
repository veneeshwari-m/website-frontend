import React from 'react';
import '../ProductGrid/ProductGrid.css';

const products = [
  { id: 1, name: "Silk Cotton Pattu Pavadai for Baby Girls - Pin...", price: "Rs. 1,299.00", img: "/images/gown2.png" },
  { id: 2, name: "Silk Cotton Pattu Pavadai for Baby Girls - Tur...", price: "Rs. 1,299.00", img: "/images/frock3.png" },
  { id: 3, name: "Traditional Banarasi Pattu Pavadai for Baby G...", price: "Rs. 1,499.00", img: "/images/gown4.png" },
  { id: 4, name: "Traditional Banarasi Pattu Pavadai for Baby G...", price: "Rs. 1,499.00", img: "/images/frock5.png" },
  { id: 5, name: "Pattu Pavadai for Baby Girls - Orange & Pink...", price: "Rs. 1,199.00", img: "/images/gown1.png" },
];

const KidsWearGrid = () => {
  return (
    <section className="product-grid-section" style={{ borderTop: '1px solid #eaeaea' }}>
      <div className="product-grid-header">
        <h2>Traditional Kids Wear</h2>
        <p>Handpicked collections of elegant and timeless traditional wear for kids, perfect for every festive occasion!</p>
      </div>
      
      <div className="product-grid-container">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.img} alt={product.name} onError={(e) => { e.target.src = "https://placehold.co/300x400/e8e8e8/8a2b8f?text=Kids+Wear" }} />
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
        <button className="shop-more-btn">Shop More..</button>
      </div>
    </section>
  );
};

export default KidsWearGrid;
