import React, { useState, useEffect } from 'react';
import './ProductShowcase.css';
import { GraphQLClient, gql } from 'graphql-request';

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:2000/graphql';

const GET_PRODUCTS = gql`
  query GetProduct($search: String) {
    getProduct(search: $search) {
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
      createdAt
      updatedAt
    }
  }
`;

const ProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const client = new GraphQLClient(GRAPHQL_ENDPOINT);

        const data = await client.request(GET_PRODUCTS, { search: '' });
        const fetchedProducts = data.getProduct ? data.getProduct.slice(0, 5) : [];
        setProducts(fetchedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="product-showcase-section">
      <div className="showcase-header">
        <h2 className="showcase-title">Traditional gowns</h2>
        <p className="showcase-subtitle">Loved by parents for its timeless tradition and comfort!</p>
      </div>

      <div className="product-grid">
        {loading ? (
          <p>Loading products...</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image-wrapper">
                <img 
                  src={product.images && product.images.length > 0 ? product.images[0] : '/images/placeholder.png'} 
                  alt={product.name} 
                  className="product-image" 
                />
              </div>
              <div className="product-info">
                <h3 className="product-name" title={product.name}>
                  {product.name}
                </h3>
                <div className="product-price">
                  {Number(product.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <button className="select-options-btn">Select Options</button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      <div className="shop-more-container">
        <button className="shop-more-btn" onClick={() => window.location.href = '/girls'}>
          View All
        </button>
      </div>
    </section>
  );
};

export default ProductShowcase;
