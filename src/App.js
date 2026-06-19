import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import TopBanner from './components/TopBanner/TopBanner';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import FloatingButtons from './components/FloatingButtons/FloatingButtons';
import SignIn from './components/SignIn/SignIn';
import Cart from './components/Cart/Cart';
import ProductGrid from './components/ProductGrid/ProductGrid';
import PattuCollections from './components/PattuCollections/PattuCollections';
import PromoBanner from './components/PromoBanner/PromoBanner';
import NewbornFrockGrid from './components/NewbornFrockGrid/NewbornFrockGrid';
import ScrollingBanner from './components/ScrollingBanner/ScrollingBanner';
import NewArrivalGrid from './components/NewArrivalGrid/NewArrivalGrid';
import ChettinadCotton from './components/ChettinadCotton/ChettinadCotton';
import JablaFrock from './components/JablaFrock/JablaFrock';
import BoysEthnicWear from './components/BoysEthnicWear/BoysEthnicWear';
import ClearanceBanner from './components/ClearanceBanner/ClearanceBanner';
import CottonFrock from './components/CottonFrock/CottonFrock';
import FactoryImages from './components/FactoryImages/FactoryImages';
import InstagramFeed from './components/InstagramFeed/InstagramFeed';
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
import Checkout from './components/Checkout/Checkout';
import OrderSuccess from './components/OrderSuccess/OrderSuccess';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [intendedPage, setIntendedPage] = useState(null);

  // Map old string pages to determine active nav links
  const getLegacyCurrentPage = () => {
    if (pathname === '/') return 'home';
    if (pathname === '/cart') return 'cart';
    if (pathname === '/signin') return 'signin';
    if (pathname === '/dashboard') return 'dashboard';
    if (pathname === '/products/boys') return 'kurta-pajama';
    if (pathname === '/products/girls') return 'girls-plp';
    if (pathname === '/products/newborn') return 'newborn-plp';
    if (pathname === '/products/bestselling') return 'bestselling-plp';
    if (pathname === '/products/clearance') return 'clearance-plp';
    if (pathname === '/stores') return 'stores-page';
    if (pathname === '/blog') return 'blog-page';
    if (pathname === '/product') return 'pdp';
    return 'home';
  };

  const handleNavigate = (page, category) => {
    const routes = {
      'home': '/',
      'cart': '/cart',
      'signin': '/signin',
      'dashboard': '/dashboard',
      'kurta-pajama': '/products/boys',
      'girls-plp': '/products/girls',
      'newborn-plp': '/products/newborn',
      'bestselling-plp': '/products/bestselling',
      'clearance-plp': '/products/clearance',
      'stores-page': '/stores',
      'blog-page': '/blog',
      'pdp': '/product',
      'order-status': '/order-status',
      'payment': '/payment',
      'exchange': '/exchange',
      'shipping': '/shipping',
      'cancellation': '/cancellation',
      'contact': '/contact',
      'privacy': '/privacy',
      'terms': '/terms',
      'about-us': '/about',
      'checkout': '/checkout'
    };

    if (page === 'checkout') {
      if (!isAuthenticated) {
        setIntendedPage('/payment');
        navigate('/signin');
        return;
      }
      navigate('/payment');
      return;
    }

    if (routes[page]) {
      // In a real app we'd pass category via query param or route param. 
      // For now we'll just navigate.
      navigate(routes[page]);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="App">
      <ScrollToTop />
      <TopBanner />
      <Header onNavigate={handleNavigate} currentPage={getLegacyCurrentPage()} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      
      <Routes>
        <Route path="/" element={
          <>
            <Hero onNavigate={handleNavigate} />
            <ProductGrid onNavigate={handleNavigate} />
            <PattuCollections onNavigate={handleNavigate} />
            <PromoBanner />
            <NewbornFrockGrid onNavigate={handleNavigate} />
            <ScrollingBanner />
            <NewArrivalGrid onNavigate={handleNavigate} />
            <ChettinadCotton onNavigate={handleNavigate} />
            <JablaFrock />
            <BoysEthnicWear />
            <ClearanceBanner />
            <CottonFrock />
            <FactoryImages />
            <InstagramFeed />
            <OurStores />
            <GlobalBanner />
            <StoreQuality />
            <Features />
          </>
        } />
        
        <Route path="/cart" element={<Cart onNavigate={handleNavigate} />} />
        
        <Route path="/signin" element={
          <SignIn 
            onBack={() => {
              navigate(intendedPage || '/');
              setIntendedPage(null);
            }} 
            onSignIn={() => {
              setIsAuthenticated(true);
              navigate(intendedPage || '/dashboard');
              setIntendedPage(null);
            }}
            onGuest={() => {
              if (intendedPage === '/payment') {
                navigate('/cart');
              } else {
                navigate(intendedPage || '/');
              }
              setIntendedPage(null);
            }}
          />
        } />
        
        <Route path="/dashboard" element={
          <UserDashboard 
            onNavigate={handleNavigate} 
            onLogout={() => {
              localStorage.removeItem('token');
              setIsAuthenticated(false);
              navigate('/');
            }}
          />
        } />

        <Route path="/products/boys" element={<ProductListingPage gender="Boys" initialCategory="Traditional" />} />
        <Route path="/products/girls" element={<ProductListingPage gender="Girls" initialCategory="Traditional" />} />
        <Route path="/products/newborn" element={<ProductListingPage gender="NewBorn" initialCategory="Traditional" />} />
        <Route path="/products/bestselling" element={<ProductListingPage gender="Best Selling" initialCategory="Traditional" />} />
        <Route path="/products/clearance" element={<ProductListingPage gender="Clearance" initialCategory="Traditional" />} />
        
        <Route path="/stores" element={<div style={{ marginTop: '20px' }}><OurStores /><GlobalBanner /><Features /></div>} />
        <Route path="/blog" element={<div style={{ marginTop: '20px' }}><BlogPage /><GlobalBanner /></div>} />
        <Route path="/product" element={<ProductDetailPage />} />
        
        <Route path="/order-status" element={<div style={{ marginTop: '20px' }}><OrderStatus /><GlobalBanner /><StoreQuality /><Features /></div>} />
        <Route path="/payment" element={<div style={{ marginTop: '20px' }}><Payment /><GlobalBanner /><StoreQuality /><Features /></div>} />
        <Route path="/exchange" element={<div style={{ marginTop: '20px' }}><Exchange /><GlobalBanner /><StoreQuality /><Features /></div>} />
        <Route path="/shipping" element={<div style={{ marginTop: '20px' }}><Shipping /><GlobalBanner /><StoreQuality /><Features /></div>} />
        <Route path="/cancellation" element={<div style={{ marginTop: '20px' }}><Cancellation /><GlobalBanner /><StoreQuality /><Features /></div>} />
        <Route path="/contact" element={<div style={{ marginTop: '20px' }}><ContactUs /><GlobalBanner /><StoreQuality /><Features /></div>} />
        <Route path="/privacy" element={<div style={{ marginTop: '20px' }}><Privacy /><GlobalBanner /><StoreQuality /><Features /></div>} />
        <Route path="/terms" element={<div style={{ marginTop: '20px' }}><Terms /><GlobalBanner /><StoreQuality /><Features /></div>} />
        <Route path="/about" element={<div style={{ marginTop: '20px' }}><AboutUs /></div>} />
      </Routes>

      <Footer onNavigate={handleNavigate} />
      <FloatingButtons />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
