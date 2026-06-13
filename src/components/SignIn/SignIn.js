import React from 'react';
import './SignIn.css';


// const LOGIN_MUTATION = gql`

// `

const SignIn = ({ onBack, onSignIn, onGuest }) => {

  // Google login functionality removed to fix unused var warning

  return (
    <div className="signin-page">
      <div className="signin-header">
        <button className="back-btn" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <img src="/images/logo.png" alt="Logo" className="signin-logo" onClick={onBack} />
      </div>

      <div className="signin-container">
        <div className="signin-content">
          <div className="auth-inputs-wrapper">
            <input type="email" placeholder="Email" className="auth-input" />
            <input type="password" placeholder="Password" className="auth-input" />
          </div>
          
          <button className="primary-btn" onClick={onSignIn}>Sign In</button>
          <button className="guest-btn" onClick={onGuest}>Continue as guest</button>

          <label className="checkbox-wrapper">
            <input type="checkbox" defaultChecked />
            <span className="checkmark">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </span>
            Email me with news and offers
          </label>

          <p className="terms">
            By continuing, you agree to our <a href="/terms">Terms of service</a>
          </p>
        </div>
      </div>

      <div className="signin-footer">
        <a href="/privacy">Privacy policy</a>
      </div>
    </div>
  );
};

export default SignIn;