import React, { useState } from 'react';
import './ProductGrid.css';

const products = [
  { id: 1, name: "Baby Girl Yellow & Green Banarasi Pattu Gown - Aari...", price: "Rs. 1,999.00", img: "/images/frock1.png", images: ["/images/frock1.png", "/images/frock2.png", "/images/frock3.png"] },
  { id: 2, name: "Baby Girl Pink & Sandal Banarasi Pattu Gown - Aari...", price: "Rs. 1,999.00", img: "/images/frock2.png", images: ["/images/frock2.png", "/images/frock1.png", "/images/frock3.png"] },
  { id: 3, name: "Baby Girl Purple Banarasi Pattu Gown - Aari Work Coa...", price: "Rs. 1,999.00", img: "/images/frock3.png", images: ["/images/frock3.png", "/images/frock1.png", "/images/frock2.png"] },
  { id: 4, name: "Baby Girl Green & Peach Silk Pattu Gown - Aari Work Coa...", price: "Rs. 1,999.00", img: "/images/frock4.png", images: ["/images/frock4.png", "/images/frock5.png", "/images/frock1.png"] },
  { id: 5, name: "Baby Girl Red & Rose Gold Banarasi Pattu Gown - Aari...", price: "Rs. 1,999.00", img: "/images/frock5.png", images: ["/images/frock5.png", "/images/frock4.png", "/images/frock1.png"] },
];

const ProductGrid = ({ onNavigate }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setQuantity(1);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (selectedProduct && selectedProduct.images) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length);
    }
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (selectedProduct && selectedProduct.images) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedProduct.images.length - 1 : prev - 1));
    }
  };

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
              <button className="select-options-btn" onClick={() => handleSelectProduct(product)}>Select Options</button>
            </div>
          </div>
        ))}
      </div>

      <div className="product-grid-footer">
        <button className="shop-more-btn" onClick={() => onNavigate && onNavigate('girls-plp', 'Traditional')}>Shop More..</button>
      </div>

      {selectedProduct && (
        <div className="quick-view-modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="quick-view-modal-content" onClick={e => e.stopPropagation()}>
            <button className="quick-view-close" onClick={() => setSelectedProduct(null)}>✕</button>
            <div className="quick-view-body">
              <div className="quick-view-image" style={{ position: 'relative' }}>
                <img 
                  src={selectedProduct.images ? selectedProduct.images[currentImageIndex] : selectedProduct.img} 
                  alt={selectedProduct.name} 
                />
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrevImage}
                      style={{
                        position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
                        width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'white',
                        border: '1px solid #8a2b8f', color: '#111', fontSize: '20px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)', zIndex: 10
                      }}>
                      ❮
                    </button>
                    <button 
                      onClick={handleNextImage}
                      style={{
                        position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
                        width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'white',
                        border: '1px solid #8a2b8f', color: '#111', fontSize: '20px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)', zIndex: 10
                      }}>
                      ❯
                    </button>
                  </>
                )}
              </div>
              <div className="quick-view-details">
                <h2 className="quick-view-title">{selectedProduct.name}</h2>
                <p className="quick-view-price">{selectedProduct.price}</p>
                
                <p className="quick-view-size-label">Size: M</p>
                <div className="quick-view-sizes">
                  {['M', '1Y', '2Y', '3Y', '5Y', '6Y', '7Y', '8Y', '9Y', '10Y', '11Y', '12Y', '13Y'].map(size => (
                    <button key={size} className={`size-btn ${size === 'M' ? 'selected' : ''}`}>{size}</button>
                  ))}
                </div>

                <div className="quick-view-description">
                  <p>Dress your little princess in pure elegance with this stunning Red & Green Banarasi Pattu Coat Gown from Prince N Princess - trusted by 10L+ happy parents across India.</p>
                  <p>Puff sleeves with a gold Banarasi border cuff complete the royal look. The soft cotton inner lining gently protects your baby's delicate skin for all-day comfort. Perfect for naming ceremony, half saree function, mottai ceremony, temple visit, wedding, and festive photoshoots.</p>
                  
                  <div className="product-details-list" style={{ marginTop: '30px' }}>
                    <h3 style={{ fontSize: '15px', color: '#333', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 'normal' }}>PRODUCT DETAILS</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '1.8', color: '#444', fontSize: '15px' }}>
                      <li>Color: Yellow & Green</li>
                      <li>Material: Premium Silk Coat Top with Banarasi Silk Skirt</li>
                      <li>Embellishment: Scallop Aari Work Yoke with Gold Stonework & Circular Motifs</li>
                      <li>Neck: Open-Front Coat Style with Tassel Tie</li>
                      <li>Sleeves: Puff Sleeves with Gold Banarasi Cuff Border</li>
                      <li>Closure: Back Zip</li>
                      <li>Lining: Soft Cotton Lining to Protect Delicate Skin</li>
                      <li>Wash Care: Normal Wash (Wash dark colours separately)</li>
                      <li>Iron Care: Warm Iron</li>
                    </ul>
                    <p style={{ marginTop: '20px', fontSize: '15px', color: '#444', lineHeight: '1.6' }}>
                      Note: Color may vary slightly due to photographic lighting or device display settings.
                    </p>
                  </div>

                  <div className="quick-view-actions" style={{ marginTop: '30px' }}>
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', height: '50px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px', padding: '0 15px', width: '130px', justifyContent: 'space-between' }}>
                        <button onClick={(e) => { e.stopPropagation(); setQuantity(q => Math.max(1, q - 1)); }} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#666' }}>−</button>
                        <span style={{ fontSize: '16px', color: '#333' }}>{quantity}</span>
                        <button onClick={(e) => { e.stopPropagation(); setQuantity(q => q + 1); }} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#666' }}>+</button>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setSelectedProduct(null); onNavigate('cart'); }} style={{ flex: 1, backgroundColor: '#8a2b8f', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '600', fontSize: '16px', cursor: 'pointer' }}>Add to Cart</button>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setSelectedProduct(null); onNavigate('checkout'); }} style={{ width: '100%', backgroundColor: '#8a2b8f', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '600', fontSize: '16px', cursor: 'pointer', padding: '15px 0', marginBottom: '25px' }}>Buy it now</button>
                    <a href="#/" style={{ color: '#222', textDecoration: 'none', fontWeight: '500', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '5px' }} onClick={(e) => { e.preventDefault(); }}>
                      View Full Details <span style={{ fontSize: '18px', lineHeight: 1 }}>»</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
