import React, { useState, useEffect } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:2000/graphql';

const GET_ALL_PRODUCT_CATEGORIES = gql`
  query GetAllProductCategories($search: String) {
    getAllProductCategories(search: $search) {
      id
      name
      code
      description
      imageUrl
      status
      createdTime
      subCategories {
        id
        name
      }
    }
  }
`;

const Navigation = ({ onNavigate }) => {
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const client = new GraphQLClient(GRAPHQL_ENDPOINT);
        const data = await client.request(GET_ALL_PRODUCT_CATEGORIES, { search: "" });
        if (data && data.getAllProductCategories) {
          setCategories(data.getAllProductCategories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="header-center">
      <ul className="nav-links">
        <li><Link to="/" className={currentPath === '/' ? 'active-link' : ''}>Home</Link></li>
        
        {categories.map((category) => (
          <li key={category.id} className="nav-item-dropdown">
            <Link 
              to={`/category/${category.id}/${encodeURIComponent(category.name)}`} 
              className={`has-dropdown ${currentPath.includes(`/category/${category.id}`) ? 'active-link' : ''}`}
              style={{ textTransform: 'capitalize' }}
            >
              {category.name.toLowerCase()}
              {category.subCategories && category.subCategories.length > 0 && (
                <svg className="dropdown-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
              )}
            </Link>
            {category.subCategories && category.subCategories.length > 0 && (
              <div className="dropdown-menu">
                {category.subCategories.map(sub => (
                  <Link key={sub.id} to={`/category/${category.id}/${encodeURIComponent(sub.name)}`}>
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </li>
        ))}

        {categories.length === 0 && (
          <>
            <li className="nav-item-dropdown">
              <Link to="/category/boys/Traditional" className={`has-dropdown ${currentPath.includes('/category/boys') ? 'active-link' : ''}`}>Boys <svg className="dropdown-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></Link>
              <div className="dropdown-menu">
                <Link to="/category/boys/Traditional">Traditional</Link>
                <Link to="/category/boys/Modern">Modern</Link>
                <Link to="/category/boys/Nightwear">Nightwear</Link>
              </div>
            </li>
            <li className="nav-item-dropdown">
              <Link to="/category/girls/Traditional" className={`has-dropdown ${currentPath.includes('/category/girls') ? 'active-link' : ''}`}>Girls <svg className="dropdown-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></Link>
              <div className="dropdown-menu">
                <Link to="/category/girls/Traditional">Traditional</Link>
                <Link to="/category/girls/Modern">Modern</Link>
                <Link to="/category/girls/Nightwear">Nightwear</Link>
              </div>
            </li>
            <li className="nav-item-dropdown">
              <Link to="/category/newborn/Newborn Giftbox" className={`has-dropdown ${currentPath.includes('/category/newborn') ? 'active-link' : ''}`}>NewBorn <svg className="dropdown-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></Link>
              <div className="dropdown-menu">
                <Link to="/category/newborn/Newborn Giftbox">Newborn Giftbox</Link>
                <Link to="/category/newborn/Newborn Pattu Frock">Newborn Pattu Frock</Link>
              </div>
            </li>
            <li className="nav-item-dropdown">
              <Link to="/category/bestselling/Festival Collection" className={`has-dropdown ${currentPath.includes('/category/bestselling') ? 'active-link' : ''}`}>Best Selling Products <svg className="dropdown-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></Link>
              <div className="dropdown-menu">
                <Link to="/category/bestselling/Festival Collection">Festival Collection</Link>
                <Link to="/category/bestselling/Birthday Collection">Birthday Collection</Link>
              </div>
            </li>
          </>
        )}
        <li><Link to="/category/clearance/All Categories" className={currentPath.includes('/category/clearance') ? 'active-link' : ''}>Clearance Sale Live Now!</Link></li>
        <li><Link to="/stores" className={currentPath === '/stores' ? 'active-link' : ''}>Our Stores</Link></li>
        <li><Link to="/blog" className={currentPath === '/blog' ? 'active-link' : ''}>Blog</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
