import React, { useState } from 'react';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const [qty, setQty] = useState(1);
  const sizes = ["M", "1Y", "2Y", "3Y", "4Y", "5Y", "6Y", "8Y", "9Y", "10Y", "11Y", "12Y", "13Y"];
  const [activeSize, setActiveSize] = useState("M");
  const images = [
    "/images/gown2.png",
    "/images/gown1.png",
    "/images/gown3.png",
    "/images/gown4.png",
    "/images/gown5.png",
    "/images/frock1.png",
    "/images/frock2.png"
  ];
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="pdp-page-wrapper">
      <div className="pdp-section">
        <div className="pdp-gallery">
          <div className="pdp-thumbnails">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="thumbnail"
                className={`pdp-thumbnail ${activeImage === img ? 'active' : ''}`}
                onClick={() => setActiveImage(img)}
                onError={(e) => { e.target.src = "https://placehold.co/70x90/e8e8e8/8a2b8f?text=Img" }}
              />
            ))}
          </div>
          <div className="pdp-main-image-container">
            <img
              src={activeImage}
              alt="Main Product"
              className="pdp-main-image"
              onError={(e) => { e.target.src = "https://placehold.co/500x700/e8e8e8/8a2b8f?text=Product+Image" }}
            />
            <button className="pdp-expand-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
            </button>
          </div>
        </div>

        <div className="pdp-details">
          <div className="pdp-vendor">shop</div>
          <h1 className="pdp-title">Baby Girl Purple Banarasi Pattu Gown - Aari Work Coat Pattu Gown Set PG709</h1>
          <div className="pdp-price">Rs. 1,999.00</div>

          <div className="pdp-actions">
            <button className="pdp-action-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              Ask a question
            </button>
            <button className="pdp-action-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              Share
            </button>
          </div>

          <div className="pdp-delivery-box">
            <div className="delivery-item border-bottom">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
              <span>Estimate delivery times: 2-7 Business days depends on Location.</span>
            </div>
            <div className="delivery-item border-bottom">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z"></path></svg>
              <span>Orders are typically dispatched within 1-3 working days. During peak seasons, dispatch may take up to 3-4 working days.</span>
            </div>
            <div className="delivery-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              <span>Free shipping: On all orders above ₹2000 within India.</span>
            </div>
          </div>

          <div className="pdp-viewers">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            17 peoples are viewing this right now
          </div>

          <div className="pdp-stock-status">
            <div className="stock-text">Hurry up! Only <span>1 item(s)</span> items left in stock</div>
            <div className="stock-bar-bg">
              <div className="stock-bar-fill" style={{ width: '5%' }}></div>
            </div>
          </div>

          <div className="pdp-add-to-cart-section">
            <div className="qty-selector">
              <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <input type="text" className="qty-input" value={qty} readOnly />
              <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>

          <button className="buy-now-btn">Buy it now</button>
          <div className="pdp-size-selector">
            <div className="size-label">Size: {activeSize}</div>
            <div className="size-grid">
              {sizes.map(size => (
                <button
                  key={size}
                  className={`size-btn ${activeSize === size ? 'active' : ''}`}
                  onClick={() => setActiveSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="pdp-accordions">
            <div className="pdp-accordion">
              <div className="accordion-header">
                <span>Description</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </div>
            </div>
            <div className="pdp-accordion">
              <div className="accordion-header">
                <span>Shipping and Returns</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </div>
            </div>
            <div className="pdp-accordion">
              <div className="accordion-header">
                <span>Our Offline Store</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="side-size-chart">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
        <span>Size chart</span>
      </div>

      <div className="pdp-new-arrivals-section">
        <h2 className="pdp-section-heading">New <span>Arrivals</span></h2>
        <div className="pdp-new-arrivals-grid">
          <div className="pdp-na-card" style={{ backgroundImage: "url('https://placehold.co/400x250/fff5f0/8a2b8f?text=Banarasi+Gown')" }}></div>
          <div className="pdp-na-card" style={{ backgroundImage: "url('https://placehold.co/400x250/e0d6c8/8a2b8f?text=Chettinad+Collection')" }}></div>
          <div className="pdp-na-card" style={{ backgroundImage: "url('https://placehold.co/400x250/fdf6e3/8a2b8f?text=Fast+Moving')" }}></div>
          <div className="pdp-na-card" style={{ backgroundImage: "url('https://placehold.co/400x250/ffffff/8a2b8f?text=Tradition+in+Purity')" }}></div>
        </div>
      </div>

      <div className="pdp-sticky-bar">
        <div className="sticky-product-info">
          <img src={images[0]} alt="Thumbnail" />
          <div className="sticky-title">Baby Girl Purple Banarasi Pattu Gown - Aari Work Coat Pattu Gown Set PG709</div>
        </div>
        <div className="sticky-actions">
          <select className="sticky-size-select" value={activeSize} onChange={(e) => setActiveSize(e.target.value)}>
            {sizes.map(s => (
              <option key={s} value={s}>{s} - Rs. 1,999.00</option>
            ))}
          </select>
          <div className="sticky-qty">
            <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
            <input type="text" value={qty} readOnly />
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>
          <button className="sticky-add-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
