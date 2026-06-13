import React from 'react';
import './ProductGrid.css';

const products = [
  { id: 1, name: "Baby Girl Yellow & Green Banarasi Pattu Gown - Aari...", price: "Rs. 1,999.00", img: "/images/frock1.png" },
  { id: 2, name: "Baby Girl Pink & Sandal Banarasi Pattu Gown - Aari...", price: "Rs. 1,999.00", img: "/images/frock2.png" },
  { id: 3, name: "Baby Girl Purple Banarasi Pattu Gown - Aari Work Coa...", price: "Rs. 1,999.00", img: "/images/frock3.png" },
  { id: 4, name: "Baby Girl Green & Peach Silk Pattu Gown - Aari Work Coa...", price: "Rs. 1,999.00", img: "/images/frock4.png" },
  { id: 5, name: "Baby Girl Red & Rose Gold Banarasi Pattu Gown - Aari...", price: "Rs. 1,999.00", img: "/images/frock5.png" },
];

const ProductGrid = ({ onNavigate }) => {
  return (
    <section className="product-grid-section">
      <div className="product-grid-header">
        <h2>Traditional gowns</h2>
        <p>Loved by parents for its timeless tradition and comfort!</p>
      </div>
      
      <div className="product-grid-container">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.img} alt={product.name} onError={(e) => { e.target.src = "https://placehold.co/300x400/e8e8e8/8a2b8f?text=Gown" }} />
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
        <button className="shop-more-btn" onClick={() => onNavigate && onNavigate('girls-plp', 'Traditional')}>Shop More..</button>
      </div>
    </section>
  );
};

export default ProductGrid;
