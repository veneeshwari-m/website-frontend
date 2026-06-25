import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { GraphQLClient, gql } from 'graphql-request';
import './CategoryPage.css';
import QuickViewModal from '../../components/QuickViewModal/QuickViewModal';

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:2000/graphql';

const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategoryCode($code: String!) {
    getProductsByCategoryCode(code: $code) {
      products {
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
        description
        material
        embellishment
        neck
        sleeves
        closure
        lining
        washCare
        ironCare
        createdAt
        updatedAt
      }
      filters {
        sizes { name count }
        colors { name count }
        brands { name count }
        stock { inStock outOfStock }
        price { min max }
      }
    }
  }
`;

const CategoryPage = () => {
  const { categoryCode } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filterData, setFilterData] = useState({
    sizes: [], colors: [], brands: [], stock: { inStock: 0, outOfStock: 0 }, price: { min: 0, max: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Active filters state
  const [activeFilters, setActiveFilters] = useState({
    sizes: [],
    brands: [],
    colors: [],
    stock: [],
    price: { min: 0, max: 0 }
  });

  // Filter accordion states
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

  const handleFilterChange = (type, value) => {
    setActiveFilters(prev => {
      const currentList = prev[type];
      if (currentList.includes(value)) {
        return { ...prev, [type]: currentList.filter(item => item !== value) };
      } else {
        return { ...prev, [type]: [...currentList, value] };
      }
    });
  };

  useEffect(() => {
    if (filterData.price.max > 0) {
      setActiveFilters(prev => ({
        ...prev,
        price: { min: 0, max: filterData.price.max }
      }));
    }
  }, [filterData.price.max]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const client = new GraphQLClient(GRAPHQL_ENDPOINT);
        const data = await client.request(GET_PRODUCTS_BY_CATEGORY, { code: categoryCode });
        if (data.getProductsByCategoryCode) {
          setProducts(data.getProductsByCategoryCode.products || []);
          if (data.getProductsByCategoryCode.filters) {
            setFilterData(data.getProductsByCategoryCode.filters);
          }
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error('Error fetching category products:', err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryCode) {
      fetchCategoryProducts();
    }
    window.scrollTo(0, 0);
  }, [categoryCode]);

  const openQuickView = (product) => {
    setSelectedProduct({
      ...product,
      image: product.images && product.images.length > 0 ? product.images[0] : '/images/placeholder.png',
      originalPrice: product.mrp
    });
  };

  const formattedCategoryName = categoryCode ? categoryCode.charAt(0).toUpperCase() + categoryCode.slice(1).toLowerCase() : '';

  const filteredProducts = products.filter(p => {
    // Size filter
    if (activeFilters.sizes.length > 0) {
      const hasSize = p.variants?.some(v => activeFilters.sizes.includes(v.size));
      if (!hasSize) return false;
    }

    // Brand / More filters
    if (activeFilters.brands.length > 0) {
      if (!activeFilters.brands.includes(p.brand)) return false;
    }

    // Color filter
    if (activeFilters.colors.length > 0) {
      const hasColor = p.variants?.some(v => activeFilters.colors.includes(v.color));
      if (!hasColor) return false;
    }

    // Stock filter
    if (activeFilters.stock.length > 0) {
      const hasStock = p.variants?.some(v => v.stock > 0);
      const stockStatus = hasStock ? 'In stock' : 'Out of stock';
      if (!activeFilters.stock.includes(stockStatus)) return false;
    }

    // Price filter
    if (p.price < activeFilters.price.min || p.price > activeFilters.price.max) {
      return false;
    }

    return true;
  });

  return (
    <div className="category-page-container">
      
      {/* Breadcrumbs */}
      <div className="category-breadcrumbs">
        <Link to="/">Home</Link> - Best sellers_{formattedCategoryName}
      </div>

      {/* Main Title */}
      <h1 className="category-page-title">Best sellers_{formattedCategoryName}</h1>

      {/* Layout Grid (Sidebar + Content) */}
      <div className="category-main-layout">
        
        {/* Sidebar */}
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
                    {filterData.sizes.map((size) => (
                      <label className="filter-checkbox-item" key={size.name}>
                        <input 
                          type="checkbox" 
                          checked={activeFilters.sizes.includes(size.name)} 
                          onChange={() => handleFilterChange('sizes', size.name)} 
                        /> 
                        {size.name} ({size.count})
                      </label>
                    ))}
                    {filterData.sizes.length === 0 && <span className="filter-text-item">No sizes available</span>}
                  </div>
                </div>
              )}
            </div>

            <div className={`filter-group ${expandedFilters.moreFilters ? 'expanded' : ''}`}>
              <div className="filter-header" onClick={() => toggleFilter('moreFilters')}>
                <span>More filters</span>
                <span className="filter-icon">{expandedFilters.moreFilters ? '-' : '+'}</span>
              </div>
              {expandedFilters.moreFilters && (
                <div className="filter-content">
                  <div className="filter-checkbox-list">
                    {filterData.brands.map((brand) => (
                      <label className="filter-checkbox-item" key={brand.name}>
                        <input 
                          type="checkbox" 
                          checked={activeFilters.brands.includes(brand.name)} 
                          onChange={() => handleFilterChange('brands', brand.name)} 
                        /> 
                        {brand.name} ({brand.count})
                      </label>
                    ))}
                    {filterData.brands.length === 0 && <span className="filter-text-item">No filters available</span>}
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
                    {filterData.colors.map((color) => (
                      <div 
                        className={`color-swatch-wrapper ${activeFilters.colors.includes(color.name) ? 'selected' : ''}`} 
                        key={color.name} 
                        title={`${color.name} (${color.count})`}
                        onClick={() => handleFilterChange('colors', color.name)}
                      >
                        <div className="color-swatch" style={{backgroundColor: color.name.toLowerCase().replace(/\s/g, '')}}></div>
                      </div>
                    ))}
                    {filterData.colors.length === 0 && <span className="filter-text-item">No colors available</span>}
                  </div>
                </div>
              )}
            </div>

            <div className={`filter-group ${expandedFilters.stock ? 'expanded' : ''}`}>
              <div className="filter-header" onClick={() => toggleFilter('stock')}>
                <span>Stock Availabilty</span>
                <span className="filter-icon">{expandedFilters.stock ? '-' : '+'}</span>
              </div>
              {expandedFilters.stock && (
                <div className="filter-content">
                  <div className="filter-checkbox-list">
                    <label className="filter-checkbox-item">
                      <input 
                        type="checkbox" 
                        checked={activeFilters.stock.includes('In stock')} 
                        onChange={() => handleFilterChange('stock', 'In stock')} 
                      /> 
                      In stock ({filterData.stock.inStock})
                    </label>
                    <label className="filter-checkbox-item">
                      <input 
                        type="checkbox" 
                        checked={activeFilters.stock.includes('Out of stock')} 
                        onChange={() => handleFilterChange('stock', 'Out of stock')} 
                      /> 
                      Out of stock ({filterData.stock.outOfStock})
                    </label>
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
                      <input 
                        type="number" 
                        value={activeFilters.price.min} 
                        onChange={(e) => setActiveFilters(prev => ({ ...prev, price: { ...prev.price, min: Number(e.target.value) } }))} 
                      />
                    </div>
                    <span>-</span>
                    <div className="price-input-box">
                      <span>₹</span>
                      <input 
                        type="number" 
                        value={activeFilters.price.max} 
                        onChange={(e) => setActiveFilters(prev => ({ ...prev, price: { ...prev.price, max: Number(e.target.value) } }))} 
                      />
                    </div>
                  </div>
                  <div className="price-slider-line"></div>
                  <div className="price-range-text">Price: Rs. {activeFilters.price.min.toFixed(2)} - Rs. {activeFilters.price.max.toFixed(2)}</div>
                </div>
              )}
            </div>

          </div>
        </aside>

        {/* Main Content Area */}
        <div className="category-content">
          
          {/* Top Bar (Results Count & Sort) */}
          <div className="category-top-bar">
            <div className="results-count">
              There are {filteredProducts.length} results in total
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

          {/* Product Grid */}
          <div className="category-product-grid">
            {loading ? (
              <div className="category-loading">
                <div className="spinner"></div>
                <p>Loading collection...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
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
                <p>We are currently updating our collection for this category. Please check back later!</p>
                <button className="continue-shopping-btn" onClick={() => navigate('/')}>Continue Shopping</button>
              </div>
            )}
          </div>

        </div>
      </div>

      {selectedProduct && <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
};

export default CategoryPage;
