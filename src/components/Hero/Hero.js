import React, { useState, useEffect } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import './Hero.css';

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:2000/graphql';

const GET_ACTIVE_BANNERS = gql`
  query GetActiveBanners($bannerType: String) {
    getActiveBanners(bannerType: $bannerType) {
      id
      backgroundImage
      sideImage
      sideContent
      bannerType
      isActive
      fontColor
      fontSize
      buttonColor
      buttonSize
    }
  }
`;

const Hero = () => {
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const client = new GraphQLClient(GRAPHQL_ENDPOINT);
        const data = await client.request(GET_ACTIVE_BANNERS, { bannerType: "FIRST" });
        if (data.getActiveBanners && data.getActiveBanners.length > 0) {
          setBannerData(data.getActiveBanners[0]);
        }
      } catch (err) {
        console.error('Error fetching Hero banner:', err);
      }
    };
    fetchBanner();
  }, []);

  const backgroundImage = bannerData?.backgroundImage || "/images/hero_banner.png";
  

  const defaultSubtitle = "Dress her like a";
  const defaultTitle = "Princess";
  const defaultDesc = "Premium ethnic wear for every celebration";

  let subtitle = defaultSubtitle;
  let title = defaultTitle;
  let desc = defaultDesc;

  if (bannerData?.sideContent) {

    const parts = bannerData.sideContent.split('\n');
    if (parts.length >= 3) {
      subtitle = parts[0];
      title = parts[1];
      desc = parts.slice(2).join(' ');
    } else if (parts.length === 2) {
      subtitle = parts[0];
      title = parts[1];
      desc = "";
    } else {
      subtitle = "";
      title = bannerData.sideContent;
      desc = "";
    }
  }

  return (
    <section className="hero-section">
      <div className="hero-container">
    
        <img
          src={backgroundImage}
          alt={title || "Prince 'N' Princess Latest Collection"}
          className="hero-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/hero_banner.png";
          }}
        />

        {bannerData?.sideImage && (
          <div className="hero-side-image-container">
            <img src={bannerData.sideImage} alt="Banner graphic" className="hero-side-image" />
          </div>
        )}

        {/* HTML Content Overlay */}
        <div className="hero-content-overlay">
          {subtitle && (
            <h2 className="hero-subtitle" style={bannerData?.fontColor ? { color: bannerData.fontColor } : {}}>
              {subtitle}
            </h2>
          )}
          <h1 
            className="hero-title" 
            style={{ 
              ...(bannerData?.fontColor && { color: bannerData.fontColor }), 
              ...(bannerData?.fontSize && bannerData.fontSize !== '16px' && { fontSize: isNaN(bannerData.fontSize) ? bannerData.fontSize : `${bannerData.fontSize}px` }) 
            }}
          >
            {title}
          </h1>
          {desc && (
            <p className="hero-desc" style={bannerData?.fontColor ? { color: bannerData.fontColor } : {}}>
              {desc}
            </p>
          )}
          <button
            className="hero-shop-now-btn-visible"
            style={{ 
              marginTop: '30px',
              ...(bannerData?.buttonColor && { background: bannerData.buttonColor }),
              ...(bannerData?.buttonSize && bannerData.buttonSize !== '16px' && { fontSize: isNaN(bannerData.buttonSize) ? bannerData.buttonSize : `${bannerData.buttonSize}px` })
            }}
            onClick={() => window.location.href = '/shop'}
          >
            SHOP NOW
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
