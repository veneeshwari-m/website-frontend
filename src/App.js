import React, { useState, useEffect } from 'react';
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

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [plpCategory, setPlpCategory] = useState('Traditional');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [intendedPage, setIntendedPage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigate = (page, category) => {
    if (page === 'checkout') {
      if (!isAuthenticated) {
        setIntendedPage('checkout');
        setCurrentPage('signin');
        return;
      }
      // If authenticated, we redirect to payment
      page = 'payment';
    }

    setCurrentPage(page);
    if (category) {
      setPlpCategory(category);
    }
  };

  if (currentPage === 'signin') {
    return <SignIn 
      onBack={() => {
        setCurrentPage(intendedPage || 'home');
        setIntendedPage(null);
      }} 
      onSignIn={() => {
        setIsAuthenticated(true);
        setCurrentPage(intendedPage || 'dashboard');
        setIntendedPage(null);
      }}
      onGuest={() => {
        if (intendedPage === 'checkout') {
          // Guest cannot checkout, take them back to home or cart
          setCurrentPage('cart');
        } else {
          setCurrentPage(intendedPage || 'home');
        }
        setIntendedPage(null);
      }}
    />;
  }

  if (currentPage === 'dashboard') {
    return <UserDashboard 
      onNavigate={handleNavigate} 
      onLogout={() => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        handleNavigate('home');
      }}
    />;
  }

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
        <Route path="/payment" element={<div style={{ marginTop: '20px' }}><Checkout onNavigate={handleNavigate} /><Footer onNavigate={handleNavigate} /></div>} />
        <Route path="/order-success/:orderId" element={<><OrderSuccess /><Footer onNavigate={handleNavigate} /></>} />
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
}

export default App;
