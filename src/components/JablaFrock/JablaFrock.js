import React from 'react';
import '../ProductGrid/ProductGrid.css';

const products = [
  { id: 1, name: "10% COMBO OFFER - Baby Girls Knitted Cotton Frock |...", price: "Rs. 1,299.00", img: "/images/frock1.png" },
  { id: 2, name: "10% COMBO OFFER - Baby Girls Knitted Cotton Frock |...", price: "Rs. 1,299.00", img: "/images/frock2.png" },
  { id: 3, name: "Baby Girls Knitted Cotton Frock | Soft Character Print...", price: "Rs. 1,299.00", img: "/images/frock3.png" },
  { id: 4, name: "Maroon Knitted Ruffle Frock for Baby Girls | Graphic Prin...", price: "Rs. 499.00", img: "/images/frock4.png" },
  { id: 5, name: "Yellow Knitted Ruffle Frock for Baby Girls | Graphic Print |...", price: "Rs. 499.00", img: "/images/frock5.png" }
];

const JablaFrock = () => {
  return (
    <section className="product-grid-section" style={{ borderTop: '1px solid #eaeaea', paddingTop: '60px' }}>
      <div className="product-grid-header">
        <h2>Jabla, Co-od & Frock</h2>
        <p>Breathable cotton frock made for summer comfort and everyday charm!</p>
      </div>
      
      <div className="product-grid-container">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.img} alt={product.name} onError={(e) => { e.target.src = "https://placehold.co/300x400/e8e8e8/8a2b8f?text=Jabla" }} />
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
    </section>
  );
};

export default JablaFrock;
