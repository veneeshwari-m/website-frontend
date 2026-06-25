import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TopBanner from './components/TopBanner/TopBanner';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ProductShowcase from './components/ProductShowcase/ProductShowcase';
import ProductCarousel from './components/ProductCarousel/ProductCarousel';
import NewbornShowcase from './components/NewbornShowcase/NewbornShowcase';
import PromoCarousel from './components/PromoCarousel/PromoCarousel';
import ChettinadShowcase from './components/ChettinadShowcase/ChettinadShowcase';
import JablaShowcase from './components/JablaShowcase/JablaShowcase';
import ClearanceBanner from './components/ClearanceBanner/ClearanceBanner';
import BoysShowcase from './components/BoysShowcase/BoysShowcase';
import CottonFrockShowcase from './components/CottonFrockShowcase/CottonFrockShowcase';
import LovedByCustomers from './components/LovedByCustomers/LovedByCustomers';
import CustomerFavorites from './components/CustomerFavorites/CustomerFavorites';
import OurStores from './components/OurStores/OurStores';
import StoreQuality from './components/StoreQuality/StoreQuality';
import StoreFeatures from './components/StoreFeatures/StoreFeatures';
import Footer from './components/Footer/Footer';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import SignIn from './pages/signIn.js/signIn';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import OrderSuccessPage from './pages/OrderSuccessPage/OrderSuccessPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import GirlsPage from './pages/GirlsPage/GirlsPage';
import OurStoresPage from './pages/OurStoresPage/OurStoresPage';
import ProductPage from './pages/ProductPage/ProductPage';
import { CartProvider } from './context/CartContext';
import { useNavigate } from 'react-router-dom';

// Simple wrapper for SignIn to handle navigation
const SignInWrapper = () => {
  const navigate = useNavigate();
  return (
    <SignIn 
      onBack={() => navigate(-1)} 
      onSignIn={() => navigate('/')} 
      onGuest={() => navigate('/')} 
    />
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <TopBanner />
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <ProductShowcase />
                <ProductCarousel />
                <NewbornShowcase />
                <PromoCarousel />
                <ChettinadShowcase />
                <JablaShowcase />
                <BoysShowcase />
                <ClearanceBanner />
                <CottonFrockShowcase />
                <LovedByCustomers  />
                <CustomerFavorites  />
                <OurStores />
              
                
              </>
            } />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
            <Route path="/order-details/:orderId" element={<OrderSuccessPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/categories/GIRLS" element={<GirlsPage />} />
            <Route path="/categories/:categoryCode" element={<CategoryPage />} />
            <Route path="/stores" element={<OurStoresPage />} />
            <Route path="/login" element={<SignInWrapper />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
          <StoreQuality />
          <StoreFeatures />
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
