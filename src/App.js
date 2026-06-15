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
      <Header onNavigate={handleNavigate} currentPage={currentPage} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      {currentPage === 'home' && (
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
          <Footer onNavigate={handleNavigate} />
        </>
      )}
      {currentPage === 'cart' && <Cart onNavigate={handleNavigate} />}
      {currentPage === 'kurta-pajama' && (
        <>
          <ProductListingPage gender="Boys" initialCategory={plpCategory} />
          <Footer onNavigate={handleNavigate} />
        </>
      )}
      {currentPage === 'girls-plp' && (
        <>
          <ProductListingPage gender="Girls" initialCategory={plpCategory} />
          <Footer onNavigate={handleNavigate} />
        </>
      )}
      {currentPage === 'newborn-plp' && (
        <>
          <ProductListingPage gender="NewBorn" initialCategory={plpCategory} />
          <Footer onNavigate={handleNavigate} />
        </>
      )}
      {currentPage === 'bestselling-plp' && (
        <>
          <ProductListingPage gender="Best Selling" initialCategory={plpCategory} />
          <Footer onNavigate={handleNavigate} />
        </>
      )}
      {currentPage === 'clearance-plp' && (
        <>
          <ProductListingPage gender="Clearance" initialCategory={plpCategory} />
          <Footer onNavigate={handleNavigate} />
        </>
      )}
      {currentPage === 'stores-page' && (
        <div style={{ marginTop: '20px' }}>
          <OurStores />
          <GlobalBanner />
          <Features />
          <Footer onNavigate={handleNavigate} />
        </div>
      )}
      {currentPage === 'blog-page' && (
        <div style={{ marginTop: '20px' }}>
          <BlogPage />
          <GlobalBanner />
          <Footer onNavigate={handleNavigate} />
        </div>
      )}
      {currentPage === 'pdp' && (
        <>
          <ProductDetailPage />
          <Footer onNavigate={handleNavigate} />
        </>
      )}
      {currentPage === 'order-status' && (
        <div style={{ marginTop: '20px' }}>
          <OrderStatus />
          <GlobalBanner />
          <StoreQuality />
          <Features />
          <Footer onNavigate={handleNavigate} />
        </div>
      )}
      {currentPage === 'payment' && (
        <div style={{ marginTop: '20px' }}>
          <Payment />
          <GlobalBanner />
          <StoreQuality />
          <Features />
          <Footer onNavigate={handleNavigate} />
        </div>
      )}
      {currentPage === 'exchange' && (
        <div style={{ marginTop: '20px' }}>
          <Exchange />
          <GlobalBanner />
          <StoreQuality />
          <Features />
          <Footer onNavigate={handleNavigate} />
        </div>
      )}
      {currentPage === 'shipping' && (
        <div style={{ marginTop: '20px' }}>
          <Shipping />
          <GlobalBanner />
          <StoreQuality />
          <Features />
          <Footer onNavigate={handleNavigate} />
        </div>
      )}
      {currentPage === 'cancellation' && (
        <div style={{ marginTop: '20px' }}>
          <Cancellation />
          <GlobalBanner />
          <StoreQuality />
          <Features />
          <Footer onNavigate={handleNavigate} />
        </div>
      )}
      {currentPage === 'contact' && (
        <div style={{ marginTop: '20px' }}>
          <ContactUs />
          <GlobalBanner />
          <StoreQuality />
          <Features />
          <Footer onNavigate={handleNavigate} />
        </div>
      )}
      {currentPage === 'privacy' && (
        <div style={{ marginTop: '20px' }}>
          <Privacy />
          <GlobalBanner />
          <StoreQuality />
          <Features />
          <Footer onNavigate={handleNavigate} />
        </div>
      )}
      {currentPage === 'terms' && (
        <div style={{ marginTop: '20px' }}>
          <Terms />
          <GlobalBanner />
          <StoreQuality />
          <Features />
          <Footer onNavigate={handleNavigate} />
        </div>
      )}
      {currentPage === 'about-us' && (
        <div style={{ marginTop: '20px' }}>
          <AboutUs />
          <Footer onNavigate={handleNavigate} />
        </div>
      )}
      <FloatingButtons />
    </div>
  );
}

export default App;
