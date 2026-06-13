import React from 'react';
import './BlogPage.css';

const blogPosts = [
  {
    id: 1,
    img: "/images/halter1.png",
    alt: "Vishu Style",
    title: "Top 5 Vishu Dresses for Kids in 2026 | shop Vishu Collection",
    excerpt: "Our Favorite Vishu Picks for Kids At shop, our Vishu collection focuses on comfort, traditional beauty, and soft fabrics suitable for babies...",
    date: "Mar 30 2026"
  },
  {
    id: 2,
    img: "/images/frock2.png",
    alt: "Pattu Pavadai Collection",
    title: "Top 5 Pattu Pavadai Collection for Girls - Traditional Elegance by shop",
    excerpt: "When it comes to dressing little girls in traditional South Indian style, Pattu Pavadai always holds a special place. The rich silk look, vibrant...",
    date: "Mar 25 2026"
  },
  {
    id: 3,
    img: "/images/cotton_frock2.png",
    alt: "Newborn Mom Tips",
    title: "What Clothes Are Best for Newborn Babies in India?",
    excerpt: "Choosing the right clothes for your newborn is one of the first big decisions you'll make as a mom and honestly, it can feel...",
    date: "Mar 23 2026"
  }
];

const BlogPage = () => {
  return (
    <section className="blog-page-section">
      <div className="blog-page-header">
        <h1>Welcome To shop Blog</h1>
      </div>

      <div className="blog-grid">
        {blogPosts.map(post => (
          <div key={post.id} className="blog-card">
            <div className="blog-image-wrapper">
              <img src={post.img} alt={post.alt} className="blog-image" />
            </div>
            <div className="blog-content">
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              <p className="blog-date">{post.date}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="popular-posts-section">
        <h2 className="popular-posts-heading">POPULAR POSTS</h2>
        <div className="popular-posts-list">
          {blogPosts.slice(1).reverse().map(post => (
            <div key={`popular-${post.id}`} className="popular-post-item">
              <img src={post.img} alt={post.alt} className="popular-post-image" />
              <div className="popular-post-info">
                <h4 className="popular-post-title">{post.title}</h4>
                <p className="popular-post-date">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  {post.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
