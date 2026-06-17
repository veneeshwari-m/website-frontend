import React, { useState, useEffect } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import Hero from '../Hero/Hero';
import Features from '../Features/Features';
import PromoBanner from '../PromoBanner/PromoBanner';
import ProductGrid from '../ProductGrid/ProductGrid';
import Footer from '../Footer/Footer';

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:2000/graphql';

const GET_ALL_CATEGORIES = gql`
  query GetAllProductCategories($search: String) {
    getAllProductCategories(search: $search) {
      id
      name
      code
      description
      imageUrl
      status
    }
  }
`;

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

const HomePage = ({ onNavigate }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = new GraphQLClient(GRAPHQL_ENDPOINT);
        
        const [categoriesData, productsData] = await Promise.all([
          client.request(GET_ALL_CATEGORIES, { search: "" }),
          client.request(GET_ALL_PRODUCTS, { search: "" })
        ]);

        if (categoriesData && categoriesData.getAllProductCategories) {
          setCategories(categoriesData.getAllProductCategories);
        }
        if (productsData && productsData.getAllProducts) {
          setProducts(productsData.getAllProducts);
        }
      } catch (err) {
        console.error("Failed to fetch home page data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter out categories that have no products
  const activeCategories = categories.filter(category => 
    products.some(p => p.productCategoriesID === category.id)
  );

  return (
    <>
      <Hero onNavigate={onNavigate} />
      {loading ? (
        <div style={{ padding: '50px', textAlign: 'center', fontSize: '18px', color: '#666' }}>
          Loading latest collections...
        </div>
      ) : activeCategories.length === 0 ? (
        <div style={{ padding: '50px', textAlign: 'center', fontSize: '18px', color: '#666' }}>
          No products available at the moment.
        </div>
      ) : (
        activeCategories.map((category, index) => {
          // Get products for this category
          const categoryProducts = products.filter(p => p.productCategoriesID === category.id);
          
          return (
            <React.Fragment key={category.id}>
              <ProductGrid 
                title={category.name} 
                category={category.name}
                categoryId={category.id}
                products={categoryProducts} 
                onNavigate={onNavigate} 
              />
              
              {/* Show the banner after the first category to break up the flow nicely */}
              {index === 0 && (
                <PromoBanner 
                  title="Dazzle in the latest Pattu Pavadai for girls" 
                  subtitle="Pattu Pavadai for Girls" 
                  onNavigate={onNavigate} 
                />
              )}
            </React.Fragment>
          );
        })
      )}
      
      {/* If there were no categories, still render the Banner just so the page isn't totally empty */}
      {!loading && activeCategories.length === 0 && (
        <PromoBanner 
          title="Dazzle in the latest Pattu Pavadai for girls" 
          subtitle="Pattu Pavadai for Girls" 
          onNavigate={onNavigate} 
        />
      )}
      
      <Features />
      <Footer onNavigate={onNavigate} />
    </>
  );
};

export default HomePage;
