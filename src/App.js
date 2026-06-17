import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import TopBanner from './components/TopBanner/TopBanner';
import Header from './components/Header/Header';
import FloatingButtons from './components/FloatingButtons/FloatingButtons';
import SignIn from './components/SignIn/SignIn';
import Cart from './components/Cart/Cart';
import OurStores from './components/OurStores/OurStores';
import StoreQuality from './components/StoreQuality/StoreQuality';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
import ProductListingPage from './components/ProductListingPage/ProductListingPage';
import BlogPage from './components/BlogPage/BlogPage';
import GlobalBanner from './components/GlobalBanner/GlobalBanner';
import ProductDetailPage from './components/ProductDetailPage/ProductDetailPage';
import UserDashboard from './components/UserDashboard/UserDashboard';
import OrderStatus from './components/OrderStatus/OrderStatus';
import Payment from './components/Payment/Payment';
import Exchange from './components/Exchange/Exchange';
import Shipping from './components/Shipping/Shipping';
import Cancellation from './components/Cancellation/Cancellation';
import ContactUs from './components/ContactUs/ContactUs';
import Privacy from './components/Privacy/Privacy';
import Terms from './components/Terms/Terms';
import AboutUs from './components/AboutUs/AboutUs';
import HomePage from './components/HomePage/HomePage';

const CategoryPageWrapper = ({ onNavigate }) => {
  const { categoryId, categoryName } = useParams();

  let gender = "Dynamic";
  let initialCategory = categoryName || "Products";
  
  if (categoryId === 'boys') { gender = "Boys"; initialCategory = categoryName || "Traditional"; }
  else if (categoryId === 'girls') { gender = "Girls"; initialCategory = categoryName || "Traditional"; }
  else if (categoryId === 'newborn') { gender = "NewBorn"; initialCategory = categoryName || "Newborn Giftbox"; }
  else if (categoryId === 'bestselling') { gender = "Best Selling"; initialCategory = categoryName || "Festival Collection"; }
  else if (categoryId === 'clearance') { gender = "Clearance"; initialCategory = categoryName || "Traditional"; }

  return (
    <>
      <ProductListingPage gender={gender} initialCategory={initialCategory} categoryId={gender === "Dynamic" ? categoryId : null} />
      <Footer onNavigate={onNavigate} />
    </>
  );
};

const AppContent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [intendedPage, setIntendedPage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleNavigate = (page, categoryName = null, categoryId = null) => {
    if (page === 'home') navigate('/');
    else if (page === 'cart') navigate('/cart');
    else if (page === 'signin') { setIntendedPage(window.location.pathname); navigate('/login'); }
    else if (page === 'dashboard') navigate('/dashboard');
    else if (page === 'category-plp') navigate(`/category/${categoryId}/${encodeURIComponent(categoryName)}`);
    else if (page === 'kurta-pajama') navigate(`/category/boys/${encodeURIComponent(categoryName)}`);
    else if (page === 'girls-plp') navigate(`/category/girls/${encodeURIComponent(categoryName)}`);
    else if (page === 'newborn-plp') navigate(`/category/newborn/${encodeURIComponent(categoryName)}`);
    else if (page === 'bestselling-plp') navigate(`/category/bestselling/${encodeURIComponent(categoryName)}`);
    else if (page === 'clearance-plp') navigate(`/category/clearance/${encodeURIComponent(categoryName)}`);
    else if (page === 'stores-page') navigate('/stores');
    else if (page === 'blog-page') navigate('/blog');
    else if (page === 'pdp') navigate('/product/detail');
    else navigate(`/${page}`);
  };

  return (
    <div className="App">
      <TopBanner />
      <Header onNavigate={handleNavigate} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
        <Route path="/cart" element={<Cart onNavigate={handleNavigate} />} />
        
        <Route path="/login" element={
          <SignIn 
            onBack={() => { navigate(intendedPage || '/'); setIntendedPage(null); }} 
            onSignIn={() => { setIsAuthenticated(true); navigate(intendedPage || '/dashboard'); setIntendedPage(null); }}
            onGuest={() => { navigate(intendedPage === '/checkout' ? '/cart' : (intendedPage || '/')); setIntendedPage(null); }}
          />
        } />
        
        <Route path="/dashboard" element={
          <UserDashboard 
            onNavigate={handleNavigate} 
            onLogout={() => { localStorage.removeItem('token'); setIsAuthenticated(false); navigate('/'); }}
          />
        } />
        
        <Route path="/category/:categoryId" element={<CategoryPageWrapper onNavigate={handleNavigate} />} />
        <Route path="/category/:categoryId/:categoryName" element={<CategoryPageWrapper onNavigate={handleNavigate} />} />
        
        <Route path="/stores" element={<div style={{ marginTop: '20px' }}><OurStores /><GlobalBanner /><Features /><Footer onNavigate={handleNavigate} /></div>} />
        <Route path="/blog" element={<div style={{ marginTop: '20px' }}><BlogPage /><GlobalBanner /><Footer onNavigate={handleNavigate} /></div>} />
        <Route path="/product/detail" element={<><ProductDetailPage /><Footer onNavigate={handleNavigate} /></>} />
        <Route path="/order-status" element={<div style={{ marginTop: '20px' }}><OrderStatus /><GlobalBanner /><StoreQuality /><Features /><Footer onNavigate={handleNavigate} /></div>} />
        <Route path="/payment" element={<div style={{ marginTop: '20px' }}><Payment /><GlobalBanner /><StoreQuality /><Features /><Footer onNavigate={handleNavigate} /></div>} />
        <Route path="/exchange" element={<div style={{ marginTop: '20px' }}><Exchange /><GlobalBanner /><StoreQuality /><Features /><Footer onNavigate={handleNavigate} /></div>} />
        <Route path="/shipping" element={<div style={{ marginTop: '20px' }}><Shipping /><GlobalBanner /><StoreQuality /><Features /><Footer onNavigate={handleNavigate} /></div>} />
        <Route path="/cancellation" element={<div style={{ marginTop: '20px' }}><Cancellation /><GlobalBanner /><StoreQuality /><Features /><Footer onNavigate={handleNavigate} /></div>} />
        <Route path="/contact" element={<div style={{ marginTop: '20px' }}><ContactUs /><GlobalBanner /><StoreQuality /><Features /><Footer onNavigate={handleNavigate} /></div>} />
        <Route path="/privacy" element={<div style={{ marginTop: '20px' }}><Privacy /><GlobalBanner /><StoreQuality /><Features /><Footer onNavigate={handleNavigate} /></div>} />
        <Route path="/terms" element={<div style={{ marginTop: '20px' }}><Terms /><GlobalBanner /><StoreQuality /><Features /><Footer onNavigate={handleNavigate} /></div>} />
        <Route path="/about-us" element={<div style={{ marginTop: '20px' }}><AboutUs /><Footer onNavigate={handleNavigate} /></div>} />
      </Routes>
      <FloatingButtons />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
