import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraphQLClient, gql } from 'graphql-request';
import './ProductDetailPage.css';
import RazorpayCheckoutModal from '../RazorpayCheckout/RazorpayCheckoutModal';

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || "http://localhost:2000/graphql";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleBuyNow = () => {
    setIsProcessing(true);
    // Simulate loading for demonstration
    setTimeout(() => {
      setIsProcessing(false);
      setShowCheckoutModal(true);
    }, 1500);
  };

  const handleAddToCart = async (goToCart = false) => {
    try {
      setIsAdding(true);
      let token = localStorage.getItem('token');
      let userId = localStorage.getItem('guestId');
      
      if (!userId && !token) {
        userId = 'guest_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('guestId', userId);
      }

      if (token) {
        const user = JSON.parse(localStorage.getItem('user'));
        userId = user?.id || userId;
      }

      const client = new GraphQLClient(GRAPHQL_ENDPOINT);
      if (token) client.setHeader('Authorization', `Bearer ${token}`);

      // Fetch a valid product ID from the backend to ensure checkout works
      const prodData = await client.request(gql`query { getAllProducts { id } }`);
      const validProductId = prodData.getAllProducts?.[0]?.id;

      if (!validProductId) {
        alert("No products available in the database.");
        setIsAdding(false);
        return;
      }

      // Add to cart
      await client.request(gql`
        mutation AddToCart($userId: ID!, $shopId: ID!, $productId: ID!, $quantity: Float!) {
          addToCart(userId: $userId, shopId: $shopId, productId: $productId, quantity: $quantity) {
            id
          }
        }
      `, {
        userId,
        shopId: "default",
        productId: validProductId,
        quantity: qty
      });

      alert("Product added successfully");
      setIsAdding(false);
      
      if (goToCart) navigate('/cart');
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
      setIsAdding(false);
    }
  };

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
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(true)} disabled={isAdding}>
              {isAdding ? "Adding..." : "Add to Cart"}
            </button>
          </div>

          <button 
            className={`buy-now-btn ${isProcessing ? 'processing' : ''}`} 
            onClick={handleBuyNow}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Processing
                <svg className="processing-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                </svg>
              </div>
            ) : (
              'Buy it now'
            )}
          </button>
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
              <div className="accordion-header" onClick={() => setIsDescriptionOpen(!isDescriptionOpen)} style={{cursor: 'pointer'}}>
                <span>Description</span>
                {isDescriptionOpen ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                )}
              </div>
              {isDescriptionOpen && (
                <div className="accordion-content" style={{padding: '0 0 20px 0', color: '#444', fontSize: '15px', lineHeight: '1.8'}}>
                  <p style={{marginBottom: '15px'}}>Dress your little princess in pure elegance with this stunning Red & Green Banarasi Pattu Coat Gown from Prince N Princess - trusted by 10L+ happy parents across India.</p>
                  <p style={{marginBottom: '30px'}}>Puff sleeves with a gold Banarasi border cuff complete the royal look. The soft cotton inner lining gently protects your baby's delicate skin for all-day comfort. Perfect for naming ceremony, half saree function, mottai ceremony, temple visit, wedding, and festive photoshoots.</p>
                  
                  <h3 style={{fontSize: '14px', color: '#333', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>PRODUCT DETAILS</h3>
                  <ul style={{listStyle: 'none', padding: 0, margin: 0, marginBottom: '20px'}}>
                    <li><strong>Color:</strong> Yellow & Green</li>
                    <li><strong>Material:</strong> Premium Silk Coat Top with Banarasi Silk Skirt</li>
                    <li><strong>Embellishment:</strong> Scallop Aari Work Yoke with Gold Stonework & Circular Motifs</li>
                    <li><strong>Neck:</strong> Open-Front Coat Style with Tassel Tie</li>
                    <li><strong>Sleeves:</strong> Puff Sleeves with Gold Banarasi Cuff Border</li>
                    <li><strong>Closure:</strong> Back Zip</li>
                    <li><strong>Lining:</strong> Soft Cotton Lining to Protect Delicate Skin</li>
                    <li><strong>Wash Care:</strong> Normal Wash (Wash dark colours separately)</li>
                    <li><strong>Iron Care:</strong> Warm Iron</li>
                  </ul>
                  <p>Note: Color may vary slightly due to photographic lighting or device display settings.</p>
                </div>
              )}
            </div>
            <div className="pdp-accordion">
              <div className="accordion-header" onClick={() => setIsShippingOpen(!isShippingOpen)} style={{cursor: 'pointer'}}>
                <span>Shipping and Returns</span>
                {isShippingOpen ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                )}
              </div>
              {isShippingOpen && (
                <div className="accordion-content" style={{padding: '0 0 20px 0', color: '#444', fontSize: '15px', lineHeight: '1.8'}}>
                  <h3 style={{fontSize: '18px', color: '#333', marginBottom: '15px', fontWeight: 'normal'}}>Shipping Policy</h3>
                  <p style={{marginBottom: '15px'}}>We offer free shipping on all prepaid orders above ₹1500 within India.</p>
                  <p style={{marginBottom: '15px'}}>For Cash on Delivery (COD) orders, an additional ₹40 COD fee and standard shipping charges apply. All COD orders are dispatched only after mobile number confirmation.</p>
                  <p style={{marginBottom: '30px'}}>We also ship internationally shipping charges are calculated at checkout based on your delivery location.</p>
                  
                  <h3 style={{fontSize: '18px', color: '#333', marginBottom: '15px', fontWeight: 'normal'}}>Processing & Delivery Timeline</h3>
                  <p style={{marginBottom: '15px'}}>Orders are typically processed within 2-3 business days.</p>
                  <p style={{marginBottom: '30px'}}>Delivery time ranges from 5-7 business days post-dispatch, depending on your location and courier partner availability.</p>

                  <h3 style={{fontSize: '18px', color: '#333', marginBottom: '15px', fontWeight: 'normal'}}>Exchange & Refund Policy</h3>
                  <p style={{marginBottom: '15px'}}>We do not offer refunds on shipped and delivered items.</p>
                  <p style={{marginBottom: '10px'}}>Refunds are only applicable under the following conditions:</p>
                  <ul style={{marginBottom: '20px', paddingLeft: '20px'}}>
                    <li style={{marginBottom: '8px'}}>If the product is out of stock at the time of dispatch.</li>
                    <li style={{marginBottom: '8px'}}>If the product is found damaged during our internal quality check before dispatch.</li>
                  </ul>
                  <p>Every order is packed with care to ensure a premium unboxing experience for your little one.</p>
                </div>
              )}
            </div>
            <div className="pdp-accordion">
              <div className="accordion-header" onClick={() => setIsStoreOpen(!isStoreOpen)} style={{cursor: 'pointer'}}>
                <span>Our Offline Store</span>
                {isStoreOpen ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                )}
              </div>
              {isStoreOpen && (
                <div className="accordion-content" style={{padding: '0 0 20px 0', color: '#444', fontSize: '15px', lineHeight: '1.8'}}>
                  <p style={{marginBottom: '20px'}}>Our Prince N Princess store is open every day, except on Diwali and Pongal Holidays. We welcome you throughout the year with the same warmth and service. Experience Quality and Craftsmanship at Our Trusted Offline Stores.</p>
                  
                  <ol style={{marginBottom: '20px', paddingLeft: '20px'}}>
                    <li style={{marginBottom: '8px'}}>Velachery, Chennai: <a href="tel:+919003466189" style={{color: '#444', textDecoration: 'underline'}}>+91-9003466189</a></li>
                    <li style={{marginBottom: '8px'}}>RS Puram, Coimbatore: <a href="tel:+919789388217" style={{color: '#444', textDecoration: 'underline'}}>+91-9789388217</a></li>
                    <li style={{marginBottom: '8px'}}>Singanallur, Coimbatore: <a href="tel:+918438008217" style={{color: '#444', textDecoration: 'underline'}}>+91-8438008217</a></li>
                  </ol>

                  <a href="#/" style={{color: '#444', textDecoration: 'underline', fontStyle: 'italic', fontWeight: '500'}}>Click Here..</a>
                </div>
              )}
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
          {[
            { img: '/images/gown1.png', title: 'Baby Girl Yellow & Green Banarasi Pattu Gown -...' },
            { img: '/images/frock1.png', title: 'Baby Girl Cream Kalamkari Cotton Dress...' },
            { img: '/images/gown2.png', title: 'Girls Chettinad Pattu Pavadai - Rama Blue...' },
            { img: '/images/frock2.png', title: 'Baby Girl Pink & Sandal Banarasi Pattu Gown -...' },
            { img: '/images/gown3.png', title: 'Girls Chettinad Pattu Pavadai - Purple Cotton...' },
            { img: '/images/gown4.png', title: 'Baby Girl Purple & Lime Green Banarasi Pattu...' },
            { img: '/images/gown5.png', title: 'Newborn Pattu Frock with Peacock Border Design ...' },
            { img: '/images/frock1.png', title: 'Baby Girl Green & Peach Silk Pattu Gown - Aari...' },
            { img: '/images/frock2.png', title: 'Newborn Baby Girl Silver Grey Silk Pattu Frock -...' },
            { img: '/images/gown1.png', title: 'Girls Chettinad Pattu Pavadai - Maroon Cotto...' },
          ].map((item, idx) => (
            <div key={idx} className="pdp-product-card">
              <div className="pdp-card-img-container">
                <img src={item.img} alt={item.title} className="pdp-card-img" onError={(e) => { e.target.src = "https://placehold.co/400x500/e8e8e8/8a2b8f?text=Product" }} />
              </div>
              <div className="pdp-card-info">
                <h4 className="pdp-card-title">{item.title}</h4>
                <button className="pdp-card-btn">Shop Now 👀 💛</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pdp-whatsapp-banner" style={{backgroundColor: '#0F2D5C', color: 'white', padding: '10px 0', textAlign: 'center', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '60px'}}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        Join Our WhatsApp Channel For Regular Update..
      </div>

      <div className="pdp-people-also-bought-section" style={{padding: '60px 20px', textAlign: 'center'}}>
        <h2 style={{fontFamily: "'Times New Roman', Times, serif", fontSize: '32px', color: '#333', margin: '0 0 10px 0', fontWeight: 'normal'}}>People Also Bought</h2>
        <p style={{fontSize: '14px', color: '#666', margin: '0 0 40px 0'}}>Here's some of our most similar products people are buying. Click to discover trending style.</p>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', maxWidth: '1200px', margin: '0 auto'}}>
          {[
            '/images/gown1.png',
            '/images/gown2.png',
            '/images/gown3.png',
            '/images/frock1.png'
          ].map((img, idx) => (
            <div key={idx} style={{borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f9f9f9', height: '350px'}}>
              <img src={img} alt="Related Product" style={{width: '100%', height: '100%', objectFit: 'cover'}} onError={(e) => { e.target.src = "https://placehold.co/300x400/e8e8e8/8a2b8f?text=Product" }} />
            </div>
          ))}
        </div>
      </div>

      <div className="pdp-faq-section" style={{maxWidth: '900px', margin: '60px auto 40px auto', padding: '0 20px'}}>
        <h2 style={{fontFamily: "'Times New Roman', Times, serif", fontSize: '36px', color: '#333', margin: '0 0 40px 0', textAlign: 'center', fontWeight: 'normal'}}>FAQ</h2>
        <div className="faq-list">
          {[
            "1. How long does delivery take and what are the shipping charges?",
            "2. How can I choose the right size for my child?",
            "3. Will the dress color look exactly the same as shown in photos?",
            "4. Where can I explore more girls' ethnic collections?",
            "5. What is your return, exchange, and refund policy?"
          ].map((question, index) => (
            <div key={index} style={{borderBottom: '1px solid #c993c4'}} className="faq-item">
              <div 
                className="faq-header" 
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', cursor: 'pointer', color: '#444', fontSize: '15px'}}
              >
                <span>{question}</span>
                {activeFaq === index ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                )}
              </div>
              {activeFaq === index && (
                <div className="faq-content" style={{padding: '0 0 20px 0', color: '#666', fontSize: '14px', lineHeight: '1.6'}}>
                  Detailed answer for "{question.replace(/^\d+\.\s*/, '')}" goes here.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="pdp-thank-you-section" style={{textAlign: 'center', padding: '60px 20px 100px 20px'}}>
        <h2 style={{fontFamily: "'Times New Roman', Times, serif", fontSize: '28px', color: '#333', margin: '0 0 20px 0', fontWeight: 'normal', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
          <span>🌍</span> This wasn't easy... but you made it possible.
        </h2>
        <p style={{fontSize: '15px', color: '#555', margin: 0}}>
          From India to the world - thank you for trusting us <span style={{color: '#ff4d4d'}}>💖</span>
        </p>
      </div>

      <div className="pdp-sticky-bar">
        <div className="sticky-product-info">
          <img src={images[0]} alt="Thumbnail" />
          <div className="sticky-title">Baby Girl Yellow & Green Banarasi Pattu Gown - Aari Work Coat Pattu Gown Set PG706</div>
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

      <RazorpayCheckoutModal 
        isOpen={showCheckoutModal} 
        onClose={() => setShowCheckoutModal(false)} 
      />
    </div>
  );
};

export default ProductDetailPage;
