import React, { useEffect } from 'react';
import './AddAddressModal.css';

const AddAddressModal = ({ onClose }) => {
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="modal-overlay">
      <div className="address-modal-container">
        <div className="address-modal-header">
          <h2>Add address</h2>
          <button className="close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="address-modal-body">
          <div className="form-group">
            <label>Country/region</label>
            <select className="address-input" defaultValue="India">
              <option value="India">India</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group" style={{ flex: 1 }}>
              <input type="text" placeholder="First name" className="address-input active-input" />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <input type="text" placeholder="Last name" className="address-input" />
            </div>
          </div>

          <div className="form-group">
            <input type="text" placeholder="Address" className="address-input" />
          </div>

          <div className="form-group">
            <input type="text" placeholder="Apartment, suite, etc (optional)" className="address-input" />
          </div>

          <div className="form-row three-cols">
            <div className="form-group">
              <input type="text" placeholder="City" className="address-input" />
            </div>
            <div className="form-group">
              <select className="address-input" defaultValue="Andaman">
                <option value="Andaman">Andaman and Nicobar...</option>
                <option value="TN">Tamil Nadu</option>
                <option value="KA">Karnataka</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text" placeholder="PIN code" className="address-input" />
            </div>
          </div>

          <div className="form-group phone-group">
            <label className="placeholder-label">Phone</label>
            <div className="phone-input-wrapper">
              <input type="text" defaultValue="+91" className="address-input" />
              <div className="flag-selector">
                <img src="https://flagcdn.com/w20/in.png" alt="India Flag" />
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
          </div>

          <label className="default-address-checkbox">
            <input type="checkbox" />
            This is my default address
          </label>
        </div>

        <div className="address-modal-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={onClose}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddAddressModal;
