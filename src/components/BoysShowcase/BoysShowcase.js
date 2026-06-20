import React, { useState, useEffect } from 'react';
import './BoysShowcase.css';
import { GraphQLClient, gql } from 'graphql-request';

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:2000/graphql';

const GET_CATEGORIES = gql`
  query GetProductCategories {
    getProductCategories {
      id
      name
      code
    }
  }
`;

const GET_PRODUCTS = gql`
  query GetProduct($search: String) {
    getProduct(search: $search) {
      id
      name
      price
      images
      productCategoriesID
      productCategoriesCode
    }
  }
`;

const BoysShowcase = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoysProducts = async () => {
      try {
        const client = new GraphQLClient(GRAPHQL_ENDPOINT);
        
        const catData = await client.request(GET_CATEGORIES);
        const categories = catData.getProductCategories || [];
        const boysCategory = categories.find(c => 
          c.name.toLowerCase().includes('boy') || c.code.toLowerCase().includes('boy')
        );
        
        const prodData = await client.request(GET_PRODUCTS, { search: '' });
        let allProducts = prodData.getProduct || [];
        
    
        let boysProducts = [];
        if (boysCategory) {
          boysProducts = allProducts.filter(p => 
            p.productCategoriesID === boysCategory.id || 
            (p.productCategoriesCode && p.productCategoriesCode.includes(boysCategory.code))
          );
        }

        if (boysProducts.length === 0) {
          boysProducts = allProducts.filter(p => p.name.toLowerCase().includes('boy'));
        }

        setProducts(boysProducts.slice(0, 5));
      } catch (err) {
        console.error('Error fetching boys products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoysProducts();
  }, []);

  return (
    <section className="boys-section">
      <div className="boys-container">
        <h2 className="boys-title">Boys Ethnic Wear Collection</h2>
        <p className="boys-subtitle">Let your boy stand out from the crowd in our unique ethnic wears like dhoti shirts and more. Fashion that's as playful as he is!</p>
        
        <div className="boys-grid">
          {loading ? (
            <p style={{ textAlign: 'center', width: '100%', padding: '20px' }}>Loading products...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div className="boys-card" key={product.id}>
                <div className="boys-image-wrapper">
                  <img 
                    src={product.images && product.images.length > 0 ? product.images[0] : '/images/placeholder.png'} 
                    alt={product.name} 
                    className="boys-image"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src="/images/placeholder.png";
                    }}
                  />
                </div>
                <div className="boys-info">
                  <h3 className="boys-name" title={product.name}>{product.name}</h3>
                  <div className="boys-price">
                    Rs. {Number(product.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </div>
                  <button className="boys-select-btn">Select Options</button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', width: '100%', padding: '20px' }}>No products found for boys.</p>
          )}
        </div>

        <div className="boys-view-all-wrapper">
          <button className="boys-view-all-btn" onClick={() => window.location.href = '/boys'}>
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default BoysShowcase;
