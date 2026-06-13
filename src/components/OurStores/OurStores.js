import React from 'react';
import './OurStores.css';

const stores = [
  {
    id: 1,
    title: "shop",
    location: "Chennai",
    address: "Velachery Bypass Rd, Vijaya Nagar, Velachery, Chennai, Tamil Nadu 600042",
    phone: "+91-9003466189 / +91-9629187349",
    img: "/images/store1.png"
  },
  {
    id: 2,
    title: "shop",
    location: "RS Puram, Coimbatore",
    address: "RS Puram DB Road, Opposite Old Kennedy Theatre, Coimbatore, Tamil Nadu 641002",
    phone: "+91-9789388217 / +91-9629187349",
    img: "/images/store2.png"
  },
  {
    id: 3,
    title: "shop",
    location: "Singanallur, Coimbatore",
    address: "Next to SBI Bank, Trichy Road, Singanallur, Tamil Nadu 641005",
    phone: "+91-8438008217 / +91-9629187349",
    img: "/images/store3.png"
  }
];

const OurStores = () => {
  return (
    <section className="stores-section">
      <div className="stores-header">
        <h2>Our Stores</h2>
      </div>

      <div className="stores-grid">
        {stores.map(store => (
          <div key={store.id} className="store-card">
            <img src={store.img} alt={store.location} className="store-image" />
            <div className="store-info">
              <h3 className="store-title">{store.title}</h3>
              <p className="store-location">{store.location}</p>
              <p className="store-address">{store.address}</p>
              <p className="store-phone">{store.phone}</p>
              <div className="store-buttons">
                <button className="store-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  WhatsApp
                </button>
                <button className="store-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurStores;
