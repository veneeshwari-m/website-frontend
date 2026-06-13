import React from 'react';
import '../ProductGrid/ProductGrid.css';

const products = [
  { id: 1, name: "Baby Girl Cream Kalamkari Cotton Dress - Elephant...", price: "Rs. 650.00", img: "/images/cotton_frock1.png" },
  { id: 2, name: "Summer Cotton Frock Yellow Ikat Print Kids Casual Wear...", price: "Rs. 699.00", img: "/images/cotton_frock2.png" },
  { id: 3, name: "Summer Cotton Frock Green Ikat Print Kids Casual Wear...", price: "Rs. 699.00", img: "/images/cotton_frock3.png" },
  { id: 4, name: "Summer Cotton Frock for Kids - Tortoise Pink Print |...", price: "Rs. 650.00", img: "/images/cotton_frock4.png" },
  { id: 5, name: "Summer Cotton Frock for Kids - Elephant Print | Brown...", price: "Rs. 650.00", img: "/images/cotton_frock5.png" }
];

const CottonFrock = () => {
  return (
    <section className="product-grid-section" style={{ borderTop: '1px solid #eaeaea', paddingTop: '60px' }}>
      <div className="product-grid-header">
        <h2>Cotton frock</h2>
        <p>Breathable cotton frock made for summer comfort and everyday charm!</p>
      </div>
      
      <div className="product-grid-container">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.img} alt={product.name} onError={(e) => { e.target.src = "https://placehold.co/300x400/e8e8e8/8a2b8f?text=Cotton+Frock" }} />
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

export default CottonFrock;
