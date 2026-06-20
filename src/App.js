import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="App">
        <TopBanner />
        <Header />
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
        <StoreQuality />
        <StoreFeatures />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
