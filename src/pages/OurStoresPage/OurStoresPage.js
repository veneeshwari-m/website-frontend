import React, { useState, useEffect } from 'react';
import './OurStoresPage.css';
import { GraphQLClient, gql } from 'graphql-request';


const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:2000/graphql';

const GET_SHOPS = gql`
  query GetAllShopUsers {
    getAllShopUsers {
      id
      shopName
      ownerName
      email
      contactNumber
      address
      createdAt
      image
    }
  }
`;

const OurStores = () => {
  const [stores, setStores] = useState([]);


  useEffect(() => {
    const fetchStores = async () => {
      try {
        const client = new GraphQLClient(GRAPHQL_ENDPOINT);
        const data = await client.request(GET_SHOPS);

        if (data.getAllShopUsers && data.getAllShopUsers.length > 0) {
          const fetchedStores = data.getAllShopUsers.map((shop, index) => {
            return {
              id: shop.id,
              shopName: shop.shopName,
              ownerName: shop.ownerName,
              email: shop.email,
              address: shop.address,
              contactNumber: shop.contactNumber,
              image: shop.image || `/images/store${(index % 3) + 1}.jpg`
            };
          });
          setStores(fetchedStores);
        } else {
          setStores([]);
        }
      } catch (err) {
        console.error('Error fetching stores:', err);
        setStores([]);
      }
    };

    fetchStores();
  }, []);

  const handleWhatsAppClick = (contactNumber) => {
    if (!contactNumber) return;
    let primaryNumber = contactNumber.split(/[/,]/)[0];
    let cleanNumber = primaryNumber.replace(/[^\d+]/g, '');
    if (cleanNumber) {
      window.open(`https://wa.me/${cleanNumber}`, '_blank');
    }
  };

  const handleDirectionsClick = (store) => {
    if (!store.address) return;
    const query = encodeURIComponent(`${store.shopName} ${store.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <section className="osp-section">
      <div className="osp-grid">
        {stores.map((store, index) => (
          <div className="osp-card" key={store.id || index}>
            <div className="osp-image-wrapper">
              <img src={store.image} alt={store.shopName} className="osp-image"
                onError={(e) => { e.target.src = '/images/placeholde.png' }} />
            </div>
            <div className="osp-info">
              {store.ownerName && <p className="osp-city">{store.ownerName}</p>}
              <h3 className="osp-name">{store.shopName || 'Store Name N/A'}</h3>
              {store.address && <p className="osp-address">{store.address}</p>}
              {store.contactNumber && <p className="osp-contact">{store.contactNumber}</p>}

              <div className="osp-actions">
                <button className="osp-btn osp-whatsapp-btn" onClick={() => handleWhatsAppClick(store.contactNumber)}>
                  WhatsApp
                </button>
                <button className="osp-btn osp-direction-btn" onClick={() => handleDirectionsClick(store)}>
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
