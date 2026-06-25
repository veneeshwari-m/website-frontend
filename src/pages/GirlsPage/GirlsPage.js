import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraphQLClient, gql } from 'graphql-request';
import './GirlsPage.css';
import QuickViewModal from '../../components/QuickViewModal/QuickViewModal';
import { FiRefreshCw, FiTruck, FiShield } from 'react-icons/fi';

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:2000/graphql';

const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategoryCode($code: String!) {
    getProductsByCategoryCode(code: $code) {
      id
      name
      price
      mrp
      discountPercentage
      images
      brand
      productCategoriesID
      productCategoriesCode
      variants {
        color
        size
        stock
      }
    }
  }
`;

const GirlsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [expandedFilters, setExpandedFilters] = useState({
    size: false,
    moreFilters: false,
    colour: false,
    stock: false,
    price: false
  });

  const toggleFilter = (filterName) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  useEffect(() => {
    const fetchGirlsProducts = async () => {
      setLoading(true);
      try {
        const client = new GraphQLClient(GRAPHQL_ENDPOINT);
        const data = await client.request(GET_PRODUCTS_BY_CATEGORY, { code: 'GIRLS' });
        setProducts(data.getProductsByCategoryCode || []);
      } catch (err) {
        console.error('Error fetching girls products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGirlsProducts();
    window.scrollTo(0, 0);
  }, []);

  const openQuickView = (product) => {
    setSelectedProduct({
      ...product,
      image: product.images && product.images.length > 0 ? product.images[0] : '/images/placeholder.png',
      originalPrice: product.mrp
    });
  };

 
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className="category-page-container">
      

      <div className="category-breadcrumbs">
        <Link to="/">Home</Link> - Best sellers_Girls
      </div>

 
      <h1 className="category-page-title">Best sellers_Girls</h1>

      <div className="category-main-layout">

        <aside className="category-sidebar">
          <div className="filter-accordion">
            
            <div className={`filter-group ${expandedFilters.size ? 'expanded' : ''}`}>
              <div className="filter-header" onClick={() => toggleFilter('size')}>
                <span>Size</span>
                <span className="filter-icon">{expandedFilters.size ? '-' : '+'}</span>
              </div>
              {expandedFilters.size && (
                <div className="filter-content">
                  <div className="filter-checkbox-list">
                    <label className="filter-checkbox-item"><input type="checkbox" defaultChecked /> S (23)</label>
                    <label className="filter-checkbox-item"><input type="checkbox" /> M (42)</label>
                    <label className="filter-checkbox-item"><input type="checkbox" /> 1Y (47)</label>
                    <label className="filter-checkbox-item"><input type="checkbox" /> 2Y (37)</label>
                    <label className="filter-checkbox-item"><input type="checkbox" /> 3Y (40)</label>
                  </div>
                </div>
              )}
            </div>

            <div className={`filter-group ${expandedFilters.colour ? 'expanded' : ''}`}>
              <div className="filter-header" onClick={() => toggleFilter('colour')}>
                <span>Colour</span>
                <span className="filter-icon">{expandedFilters.colour ? '-' : '+'}</span>
              </div>
              {expandedFilters.colour && (
                <div className="filter-content">
                  <div className="filter-colors-grid">
                    <div className="color-swatch-wrapper"><div className="color-swatch" style={{backgroundColor: 'black'}}></div></div>
                    <div className="color-swatch-wrapper selected"><div className="color-swatch" style={{backgroundColor: 'blue'}}></div></div>
                    <div className="color-swatch-wrapper"><div className="color-swatch" style={{backgroundColor: 'red'}}></div></div>
                    <div className="color-swatch-wrapper"><div className="color-swatch" style={{backgroundColor: 'pink'}}></div></div>
                  </div>
                </div>
              )}
            </div>

            <div className={`filter-group ${expandedFilters.price ? 'expanded' : ''}`}>
              <div className="filter-header" onClick={() => toggleFilter('price')}>
                <span>Price</span>
                <span className="filter-icon">{expandedFilters.price ? '-' : '+'}</span>
              </div>
              {expandedFilters.price && (
                <div className="filter-content">
                  <div className="filter-price-inputs">
                    <div className="price-input-box">
                      <span>₹</span>
                      <input type="text" value="0.00" readOnly />
                    </div>
                    <span>-</span>
                    <div className="price-input-box">
                      <span>₹</span>
                      <input type="text" value="1,699.00" readOnly />
                    </div>
                  </div>
                  <div className="price-slider-line"></div>
                  <div className="price-range-text">Price: Rs. 0.00 - Rs. 1,699.00</div>
                </div>
              )}
            </div>

          </div>
        </aside>

   
        <div className="category-content">
          
       
          <div className="category-top-bar">
            <div className="results-count">
              There are {products.length} results in total
            </div>
            <div className="sort-by-wrapper">
              <span>Sort by:</span>
              <select className="sort-by-select">
                <option value="features">Features</option>
                <option value="price-low">Price, low to high</option>
                <option value="price-high">Price, high to low</option>
                <option value="new">Date, new to old</option>
              </select>
            </div>
          </div>


          <div className="category-product-grid">
            {loading ? (
              <div className="category-loading">
                <div className="spinner"></div>
                <p>Loading collection...</p>
              </div>
            ) : currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div className="category-card" key={product.id}>
                  <div 
                    className="category-image-wrapper"
                    onClick={() => navigate(`/product/${product.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img 
                      src={product.images && product.images.length > 0 ? product.images[0] : '/images/placeholder.png'} 
                      alt={product.name} 
                      className="category-image" 
                    />
                  </div>
                  <div className="category-info">
                    <h3 
                      className="category-name" 
                      title={product.name}
                      onClick={() => navigate(`/product/${product.id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      {product.name}
                    </h3>
                    <div className="category-price">
                      Rs. {Number(product.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>
                    <button className="category-select-btn" onClick={() => openQuickView(product)}>Select Options</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="category-empty-state">
                <div className="empty-icon">🛍️</div>
                <h2>No products found</h2>
                <p>We are currently updating our collection for Girls. Please check back later!</p>
                <button className="continue-shopping-btn" onClick={() => navigate('/')}>Continue Shopping</button>
              </div>
            )}
          </div>

    
          {!loading && products.length > itemsPerPage && (
            <div className="girls-pagination">
              <button 
                className="pagination-arrow" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ← Previous
              </button>
              <div className="pagination-numbers">
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i} 
                    className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button 
                className="pagination-arrow" 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          )}

    
          

        </div>
      </div>

      {selectedProduct && <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
};

export default GirlsPage;
