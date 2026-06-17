import React, { useState, useEffect } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import './ProductListingPage.css';
import '../ProductGrid/ProductGrid.css';

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:2000/graphql';

const GET_ALL_PRODUCTS = gql`
  query GetAllProducts($search: String) {
    getAllProducts(search: $search) {
      id
      name
      price
      mrp
      discountPercentage
      images
      brand
      productCategoriesID
      variants {
        color
        size
        stock
      }
    }
  }
`;

const ADD_TO_CART = gql`
  mutation AddToCart($userId: ID!, $shopId: ID!, $productId: ID!, $quantity: Float!) {
    addToCart(userId: $userId, shopId: $shopId, productId: $productId, quantity: $quantity) {
      id
      totalQuantity
      subTotal
    }
  }
`;

const allProducts = [
  // Boys
  { id: 1, gender: "Boys", category: "Traditional", name: "Boys Cotton Ikkat Kurta in Ash KP214", price: "Rs. 699.00", img: "/images/boy1.png" },
  { id: 2, gender: "Boys", category: "Traditional", name: "Boys Cotton Ikkat Kurta in Pink KP212", price: "Rs. 699.00", img: "/images/boy2.png" },
  { id: 3, gender: "Boys", category: "Traditional", name: "Boys Elegant Sherwani Suit", price: "Rs. 1,299.00", img: "/images/boy3.png" },
  { id: 4, gender: "Boys", category: "Traditional", name: "Boys South Indian Shirt Dhoti", price: "Rs. 850.00", img: "/images/boy4.png" },
  { id: 5, gender: "Boys", category: "Modern", name: "Boys Casual Print Shirt", price: "Rs. 450.00", img: "https://placehold.co/300x400/fafafa/8a2b8f?text=Casual+Shirt" },
  { id: 6, gender: "Boys", category: "Modern", name: "Boys Denim Jacket Set", price: "Rs. 950.00", img: "https://placehold.co/300x400/fafafa/8a2b8f?text=Denim+Jacket" },
  { id: 7, gender: "Boys", category: "Nightwear", name: "Boys Soft Cotton Pyjama Set", price: "Rs. 399.00", img: "https://placehold.co/300x400/f0f8ff/8a2b8f?text=Cotton+Pyjama" },
  { id: 8, gender: "Boys", category: "Nightwear", name: "Boys Cozy Sleepwear Set", price: "Rs. 450.00", img: "https://placehold.co/300x400/f0f8ff/8a2b8f?text=Cozy+Sleepwear" },
  // Girls
  { id: 9, gender: "Girls", category: "Traditional", name: "Baby Girl Yellow Pattu Gown", price: "Rs. 1,999.00", img: "/images/frock1.png" },
  { id: 10, gender: "Girls", category: "Traditional", name: "Baby Girl Pink Banarasi Pattu", price: "Rs. 1,999.00", img: "/images/frock2.png" },
  { id: 11, gender: "Girls", category: "Traditional", name: "Girls Classic Halter Neck Traditional", price: "Rs. 1,599.00", img: "/images/halter1.png" },
  { id: 12, gender: "Girls", category: "Modern", name: "Girls Floral Cotton Frock", price: "Rs. 850.00", img: "/images/cotton_frock1.png" },
  { id: 13, gender: "Girls", category: "Modern", name: "Girls Modern A-Line Dress", price: "Rs. 950.00", img: "/images/cotton_frock2.png" },
  { id: 14, gender: "Girls", category: "Modern", name: "Girls Fancy Party Frock", price: "Rs. 1,250.00", img: "https://placehold.co/300x400/fff0f5/8a2b8f?text=Modern+Frock" },
  { id: 15, gender: "Girls", category: "Nightwear", name: "Girls Pink Sleepwear Set", price: "Rs. 450.00", img: "https://placehold.co/300x400/fff0f5/8a2b8f?text=Pink+Sleepwear" },
  { id: 16, gender: "Girls", category: "Nightwear", name: "Girls Soft Pyjama Pants", price: "Rs. 399.00", img: "https://placehold.co/300x400/fff0f5/8a2b8f?text=Pyjama+Pants" },
  // NewBorn
  { id: 17, gender: "NewBorn", category: "Newborn Giftbox", name: "Premium Newborn Gift Set", price: "Rs. 1,500.00", img: "https://placehold.co/300x400/fff8dc/8a2b8f?text=Giftbox" },
  { id: 18, gender: "NewBorn", category: "Newborn Giftbox", name: "Organic Cotton Newborn Set", price: "Rs. 1,200.00", img: "https://placehold.co/300x400/fff8dc/8a2b8f?text=Organic+Set" },
  { id: 19, gender: "NewBorn", category: "Newborn Pattu Frock", name: "Newborn Silk Pattu Frock", price: "Rs. 950.00", img: "https://placehold.co/300x400/fff8dc/8a2b8f?text=Pattu+Frock" },
  { id: 20, gender: "NewBorn", category: "Newborn Pattu Frock", name: "Yellow Newborn Pattu Dress", price: "Rs. 899.00", img: "https://placehold.co/300x400/fff8dc/8a2b8f?text=Yellow+Frock" },
  // Best Selling
  { id: 21, gender: "Best Selling", category: "Festival Collection", name: "Kids Premium Diwali Combo", price: "Rs. 2,500.00", img: "https://placehold.co/300x400/fff8dc/8a2b8f?text=Diwali+Combo" },
  { id: 22, gender: "Best Selling", category: "Festival Collection", name: "Boys Ethnic Kurta Set", price: "Rs. 1,200.00", img: "/images/boy3.png" },
  { id: 23, gender: "Best Selling", category: "Birthday Collection", name: "Girls Grand Birthday Frock", price: "Rs. 2,950.00", img: "/images/frock3.png" },
  { id: 24, gender: "Best Selling", category: "Birthday Collection", name: "Boys Birthday Suit Set", price: "Rs. 1,899.00", img: "https://placehold.co/300x400/e8f4f8/8a2b8f?text=Birthday+Suit" },
  // Clearance
  { id: 25, gender: "Clearance", category: "Traditional", name: "Girls Green Silk Pattu", price: "Rs. 1,499.00", img: "/images/frock4.png", discount: "-25%" },
  { id: 26, gender: "Clearance", category: "Modern", name: "Girls Printed Cotton Dress", price: "Rs. 499.00", img: "/images/cotton_frock3.png", discount: "-7%" },
  { id: 27, gender: "Clearance", category: "Traditional", name: "Girls Red Banarasi Gown", price: "Rs. 1,899.00", img: "/images/frock5.png", discount: "-23%" },
  { id: 28, gender: "Clearance", category: "Modern", name: "Baby Girl Floral Frock", price: "Rs. 399.00", img: "/images/cotton_frock4.png", discount: "-7%" },
  // Chettinad Cotton Duplicates
  ...Array.from({ length: 59 }).map((_, i) => {
    const imgs = ["/images/gown2.png", "/images/halter2.png", "/images/halter3.png", "/images/halter1.png"];
    const names = [
      "Girls Chettinad Pattu Pavadai - Purple",
      "Girls Chettinad Pattu Pavadai - Gold Cotton Halter",
      "Girls Chettinad Pattu Pavadai - Orange Cotton Halter",
      "Girls Chettinad Pattu Pavadai - Green Cotton Halter"
    ];
    return {
      id: 100 + i,
      gender: "Girls",
      category: "Chettinad Cotton",
      name: names[i % 4],
      price: "Rs. 1,599.00",
      img: imgs[i % 4]
    };
  })
];

const ProductListingPage = ({ gender = "Boys", initialCategory = "Traditional", categoryId = null }) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dynamicProducts, setDynamicProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setQuantity(1);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (selectedProduct) {
      const images = (selectedProduct.raw && selectedProduct.raw.images) || selectedProduct.images || [selectedProduct.img];
      if (Array.isArray(images) && images.length > 0) {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
    }
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (selectedProduct) {
      const images = (selectedProduct.raw && selectedProduct.raw.images) || selectedProduct.images || [selectedProduct.img];
      if (Array.isArray(images) && images.length > 0) {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!selectedProduct) return;
    
    try {
      const client = new GraphQLClient(GRAPHQL_ENDPOINT);
      let userId = localStorage.getItem('guestId');
      if (!userId) {
        userId = 'guest_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('guestId', userId);
      }
      
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed && parsed.id) userId = parsed.id;
      }

      const variables = {
        userId: userId,
        shopId: "default",
        productId: selectedProduct.id.toString(),
        quantity: quantity
      };

      await client.request(ADD_TO_CART, variables);
      
      alert('Product added to cart successfully!');
      setSelectedProduct(null);
      // Dispatch event to update cart count in header
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (err) {
      console.error('Add to cart error:', err);
      alert('Failed to add to cart. Please try again.');
    }
  };

  let categories;
  if (gender === "NewBorn") {
    categories = ["All Categories", "Newborn Giftbox", "Newborn Pattu Frock"];
  } else if (gender === "Best Selling") {
    categories = ["All Categories", "Festival Collection", "Birthday Collection"];
  } else if (gender === "Girls") {
    categories = ["All Categories", "Traditional", "Pattu Pavadai", "Chettinad Cotton", "Modern", "Nightwear"];
  } else if (gender === "Dynamic") {
    categories = [initialCategory];
  } else {
    categories = ["All Categories", "Traditional", "Modern", "Nightwear"];
  }

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory, gender]);

  useEffect(() => {
    if (gender === "Dynamic") {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const client = new GraphQLClient(GRAPHQL_ENDPOINT);
          const data = await client.request(GET_ALL_PRODUCTS, { search: "" });
          if (data && data.getAllProducts) {
            // Filter products that belong to the current category ID
            const filtered = data.getAllProducts.filter(p => p.productCategoriesID === categoryId);
            setDynamicProducts(filtered);
          }
        } catch (err) {
          console.error("Failed to fetch products:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [gender, categoryId]);

  const genderProducts = gender === "Dynamic" ? dynamicProducts.map(p => ({
    id: p.id,
    gender: "Dynamic",
    category: initialCategory,
    name: p.name,
    price: `Rs. ${p.price}`,
    img: (Array.isArray(p.images) && p.images.length > 0) ? p.images[0] : (p.images || "https://placehold.co/300x400/fafafa/8a2b8f?text=Product"),
    discount: p.discountPercentage ? `-${p.discountPercentage}%` : null,
    raw: p
  })) : allProducts.filter(p => p.gender === gender);

  const filteredProducts = activeCategory === "All Categories" 
    ? genderProducts 
    : genderProducts.filter(p => p.category === activeCategory);

  let pageTitle = `${gender} Collection - ${activeCategory}`;
  if (gender === "Clearance") {
    pageTitle = "Clearance Sale upto 50% Off on Kids Clothing and Ethnic Wear";
  } else if (gender === "NewBorn" && activeCategory === "All Categories") {
    pageTitle = "Newborn Ethnic Wear Collection | Soft Fabric | 1500+ Designs";
  } else if (gender === "Girls" && activeCategory === "Traditional") {
    pageTitle = "Traditional Gowns for Festivals, Weddings and Cultural Celebrations";
  } else if (gender === "Girls" && activeCategory === "Pattu Pavadai") {
    pageTitle = "Pattu Pavadai Collection for Kids - Traditional South Indian Wear";
  } else if (gender === "Girls" && activeCategory === "Chettinad Cotton") {
    pageTitle = "Chettinad Cotton Pattu Pavadai with Traditional South Indian Style";
  }

  return (
    <div className="plp-section">
      <div className="plp-breadcrumb">
        Home · <span>{pageTitle}</span>
      </div>
      
      <h1 className="plp-heading">{pageTitle}</h1>

      <div className="plp-content">
        <aside className="plp-sidebar">
          <div className="filter-section" style={{ borderTop: 'none' }}>
            <div className="filter-header">
              <span>Categories</span>
              <span className="filter-toggle">—</span>
            </div>
            <ul className="filter-list">
              {categories.map(category => (
                <li key={category} onClick={() => setActiveCategory(category)} style={{ cursor: 'pointer' }}>
                  <div className={`filter-checkbox ${activeCategory === category ? 'checked' : ''}`}>
                    {activeCategory === category && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    )}
                  </div> 
                  <span style={{ fontWeight: activeCategory === category ? 'bold' : 'normal', color: activeCategory === category ? '#0F2D5C' : '#444' }}>
                    {category}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="plp-main">
          <div className="plp-toolbar">
            <div className="plp-results">There are {filteredProducts.length} results in total</div>
            <div className="plp-sort">
              <span>Sort by:</span>
              <select defaultValue="new">
                <option value="new">Date, new to old</option>
                <option value="old">Date, old to new</option>
                <option value="price_asc">Price, low to high</option>
                <option value="price_desc">Price, high to low</option>
              </select>
            </div>
          </div>

          <div className="plp-grid">
            {loading ? (
              <div style={{ padding: '50px', textAlign: 'center', gridColumn: '1 / -1', fontSize: '18px', color: '#666' }}>Loading products...</div>
            ) : filteredProducts.length === 0 ? (
              <div style={{ padding: '50px', textAlign: 'center', gridColumn: '1 / -1', fontSize: '18px', color: '#666' }}>No products found in this category.</div>
            ) : (
              filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                <div className="product-image-container" style={{height: '350px', position: 'relative'}}>
                  {product.discount && (
                    <div className="discount-badge" style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      backgroundColor: '#0F2D5C',
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      zIndex: 2
                    }}>
                      {product.discount}
                    </div>
                  )}
                  <img src={product.img} alt={product.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-price">{product.price}</p>
                  <button className="select-options-btn" onClick={() => handleSelectProduct(product)}>Select Options</button>
                </div>
              </div>
              ))
            )}
          </div>
        </main>
      </div>

      {selectedProduct && (
        <div className="quick-view-modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="quick-view-modal-content" onClick={e => e.stopPropagation()}>
            <button className="quick-view-close" onClick={() => setSelectedProduct(null)}>✕</button>
            <div className="quick-view-body">
              <div className="quick-view-image" style={{ position: 'relative' }}>
                <img 
                  src={
                    (selectedProduct.raw && Array.isArray(selectedProduct.raw.images)) ? selectedProduct.raw.images[currentImageIndex] : 
                    (Array.isArray(selectedProduct.images) ? selectedProduct.images[currentImageIndex] : (selectedProduct.img || "https://placehold.co/300x400/e8e8e8/8a2b8f?text=Product"))
                  } 
                  alt={selectedProduct.name} 
                  onError={(e) => { e.target.src = "https://placehold.co/300x400/e8e8e8/8a2b8f?text=Product" }}
                />
                {((selectedProduct.raw && selectedProduct.raw.images && selectedProduct.raw.images.length > 1) || (selectedProduct.images && selectedProduct.images.length > 1)) && (
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
                      <button onClick={handleAddToCart} style={{ flex: 1, backgroundColor: '#8a2b8f', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '600', fontSize: '16px', cursor: 'pointer' }}>Add to Cart</button>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); handleAddToCart(e); /* Then redirect to cart/checkout */ }} style={{ width: '100%', backgroundColor: '#8a2b8f', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '600', fontSize: '16px', cursor: 'pointer', padding: '15px 0', marginBottom: '25px' }}>Buy it now</button>
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
    </div>
  );
};

export default ProductListingPage;
