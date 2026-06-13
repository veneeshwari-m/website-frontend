import React from 'react';
import './InstagramFeed.css';

const basePosts = [
  {
    id: 1,
    img: "/images/insta1.png",
    caption: "Make her festive moments unforgettable 💖 Designed with rich traditional patterns.",
    likes: 312
  },
  {
    id: 2,
    img: "/images/insta2.png",
    caption: "Fresh arrivals for your little champs - comfortable, trendy & perfect for everyday play!",
    likes: 156
  },
  {
    id: 3,
    img: "/images/insta3.png",
    caption: "Our ultra-soft inner lining keeps your little one calm, comfy, and smiling all day.",
    likes: 201
  },
  {
    id: 4,
    img: "/images/insta4.png",
    caption: "MOST LOVED dress is here 💖 ✨ Grab yours before it goes out of stock!",
    likes: 178
  },
  {
    id: 5,
    img: "/images/boy1.png",
    caption: "Traditional Ikkat for your little prince! ✨ Classic styles for festive seasons.",
    likes: 245
  },
  {
    id: 6,
    img: "/images/cotton_frock1.png",
    caption: "Summer ready! Breathable cottons for everyday play 💛",
    likes: 189
  },
  {
    id: 7,
    img: "/images/boy4.png",
    caption: "South Indian traditional dhoti sets are back in stock! 🌿",
    likes: 420
  },
  {
    id: 8,
    img: "/images/cotton_frock5.png",
    caption: "Cute elephant prints your little one will love 🐘💕 Lightweight and fun!",
    likes: 275
  }
];

const InstagramFeed = () => {
  return (
    <section className="instagram-section">
      <div className="instagram-header">
        <h2>Loved by Our Little Customers 💛</h2>
        <button className="instagram-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          Follow Us on Instagram
        </button>
      </div>

      <div className="instagram-scroller">
        <div className="instagram-track">
          {/* First set */}
          <div className="instagram-set">
            {basePosts.map(post => (
              <div key={post.id} className="instagram-card">
                <div className="instagram-image">
                  <img src={post.img} alt="Instagram post" />
                </div>
                <div className="instagram-info">
                  <p className="instagram-caption">{post.caption}</p>
                  <div className="instagram-likes">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#0F2D5C" stroke="#0F2D5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Second identical set for seamless looping */}
          <div className="instagram-set">
            {basePosts.map(post => (
              <div key={`dup-${post.id}`} className="instagram-card">
                <div className="instagram-image">
                  <img src={post.img} alt="Instagram post" />
                </div>
                <div className="instagram-info">
                  <p className="instagram-caption">{post.caption}</p>
                  <div className="instagram-likes">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#0F2D5C" stroke="#0F2D5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
