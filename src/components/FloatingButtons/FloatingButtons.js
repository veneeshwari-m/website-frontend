import React, { useState } from 'react';
import './FloatingButtons.css';

const FloatingButtons = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <div className="floating-whatsapp">
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
          <img src="/images/whatsapp-floating.webp" alt="WhatsApp Chat" width="100" height="100" style={{ borderRadius: '50%' }} />
        </a>
      </div>


      <div className="floating-chat">
        {isChatOpen && (
          <div className="rewards-popup">
            <div className="rewards-header">
              Welcome to shop
            </div>
            <div className="rewards-content-wrapper">
              <div className="rewards-main-card">
                <h3>Join And Earn Rewards</h3>
                <p>Earn Points with every purchase and redeem them for discounts!</p>
                <button className="rewards-signup-btn">Sign Up and Get Free Points</button>
                <p className="rewards-login-text">Already have an account? <a href="#signin">Sign in</a></p>
              </div>

              <div className="rewards-ways">
                <div className="ways-left">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"></path></svg>
                  <span>Ways To Earn</span>
                </div>
                <div className="ways-right">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
              </div>
            </div>
            <div className="rewards-footer">
              Powered By <a href="#nector">Nector</a>
            </div>
          </div>
        )}
        <button className={`chat-btn ${isChatOpen ? 'close-btn' : ''}`} onClick={() => setIsChatOpen(!isChatOpen)}>
          {isChatOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
              shop
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default FloatingButtons;
