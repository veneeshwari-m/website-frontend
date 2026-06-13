import React from 'react';
import '../ProductGrid/ProductGrid.css';
import '../ChettinadCotton/ChettinadCotton.css';

const products = [
  { id: 1, name: "Boys Cotton Ikkat Kurta Pajama in Ash KP214", price: "Rs. 699.00", img: "/images/boy1.png" },
  { id: 2, name: "Boys Cotton Ikkat Kurta Pajama in Pink KP212", price: "Rs. 699.00", img: "/images/boy2.png" },
  { id: 3, name: "Boys Cotton Ikkat Kurta Pajama in Navy KP209", price: "Rs. 699.00", img: "/images/boy3.png" },
  { id: 4, name: "Boys South Indian Shirt Dhoti in Green SD113", price: "Rs. 850.00", img: "/images/boy4.png" },
  { id: 5, name: "Boys South Indian Shirt Dhoti in Green SD112", price: "Rs. 850.00", img: "/images/boy5.png" }
];

const BoysEthnicWear = () => {
  return (
    <section className="product-grid-section" style={{ borderTop: '1px solid #eaeaea', paddingTop: '60px' }}>
      <div className="product-grid-header">
        <h2>Boys Ethnic Wear Collection</h2>
        <p>Let your boy stand out from the crowd in our unique ethnic wears like dhoti shirts and more. Fashion that's as playful as he is!</p>
      </div>
      
      <div className="product-grid-container">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.img} alt={product.name} onError={(e) => { e.target.src = "https://placehold.co/300x400/e8e8e8/8a2b8f?text=Boys+Ethnic" }} />
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

      <button className="view-all-btn-solid" style={{ marginTop: '30px' }}>
        View All
      </button>

    </section>
  );
};

export default BoysEthnicWear;
