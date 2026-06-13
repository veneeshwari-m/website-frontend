import React, { useState, useRef } from 'react';
import '../ProductGrid/ProductGrid.css';
import './ChettinadCotton.css';

const products = [
  { id: 1, name: "Girls Chettinad Pattu Pavadai - Copper Cotton Halter Set...", price: "Rs. 1,599.00", img: "/images/gown1.png" },
  { id: 2, name: "Girls Chettinad Pattu Pavadai - Olive Green Cotton Halter...", price: "Rs. 1,599.00", img: "/images/frock2.png" },
  { id: 3, name: "Girls Chettinad Pattu Pavadai - Rama Blue Cotton Halter Ne...", price: "Rs. 1,599.00", img: "/images/gown3.png" },
  { id: 4, name: "Girls Chettinad Pattu Pavadai - Pink Cotton Halter Set wi...", price: "Rs. 1,599.00", img: "/images/frock4.png" },
  { id: 5, name: "Girls Chettinad Pattu Gown Olive Cotton Dress with...", price: "Rs. 1,599.00", img: "/images/gown5.png" },
  { id: 6, name: "Girls Chettinad Pattu Pavadai - Green Cotton Halter Set...", price: "Rs. 1,599.00", img: "/images/halter1.png" },
  { id: 7, name: "Girls Chettinad Pattu Pavadai - Yellow Cotton Halter Set...", price: "Rs. 1,599.00", img: "/images/halter2.png" },
  { id: 8, name: "Girls Chettinad Pattu Pavadai - Red Cotton Halter Neck Set...", price: "Rs. 1,599.00", img: "/images/halter3.png" },
  { id: 9, name: "Girls Chettinad Pattu Pavadai - Blue Cotton Halter Set...", price: "Rs. 1,599.00", img: "/images/halter4.png" },
  { id: 10, name: "Girls Chettinad Pattu Gown Pink Cotton Dress with...", price: "Rs. 1,599.00", img: "/images/frock1.png" }
];

const ChettinadCotton = ({ onNavigate }) => {
  const [activeDot, setActiveDot] = useState(0);
  const containerRef = useRef(null);

  const scrollToIndex = (index) => {
    setActiveDot(index);
    if (containerRef.current) {
      const container = containerRef.current;
      const card = container.children[0];
      const cardWidth = card.offsetWidth + 20; // 20px is the gap
      container.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    }
  };

  const handleNext = () => scrollToIndex((activeDot + 1) % products.length);
  const handlePrev = () => scrollToIndex((activeDot - 1 + products.length) % products.length);

  return (
    <section className="product-grid-section" style={{ position: 'relative', borderTop: '1px solid #eaeaea', paddingTop: '60px' }}>
      <div className="product-grid-header">
        <h2>Chettinad Cotton</h2>
      </div>
      
      <div style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto' }}>
        
        <button className="carousel-arrow left-arrow" onClick={handlePrev}>
          &lt;
        </button>

        <div className="product-grid-container" ref={containerRef} style={{ margin: '0', flexWrap: 'nowrap', overflowX: 'hidden' }}>
          {products.map(product => (
            <div key={product.id} className="product-card" style={{ minWidth: 'calc(20% - 16px)' }}>
              <div className="product-image-container">
                <img src={product.img} alt={product.name} onError={(e) => { e.target.src = "https://placehold.co/300x400/e8e8e8/8a2b8f?text=Chettinad" }} />
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

        <button className="carousel-arrow right-arrow" onClick={handleNext}>
          &gt;
        </button>

      </div>

      <div className="carousel-dots">
        {products.map((_, index) => (
          <button 
            key={index} 
            className={`carousel-dot ${index === activeDot ? 'active' : ''}`} 
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <button className="view-all-btn-solid" onClick={() => onNavigate && onNavigate('girls-plp', 'Chettinad Cotton')}>
        View All
      </button>
      
    </section>
  );
};

export default ChettinadCotton;
