import React, { useState } from 'react';
import './RazorpayCheckoutModal.css';
import statesData from './statesData.json';

const RazorpayCheckoutModal = ({ isOpen, onClose }) => {
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('veneeshwarim@gmail.com');
  const [sendUpdates, setSendUpdates] = useState(true);
  const [step, setStep] = useState('contact'); // 'contact', 'address', 'payment'
  const [addressType, setAddressType] = useState('Home');
  const [saveAddress, setSaveAddress] = useState(true);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [orderForSomeoneElse, setOrderForSomeoneElse] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [searchCountry, setSearchCountry] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({ name: 'India', code: '+91', flag: '🇮🇳' });

  const countryList = [
    { name: 'India', code: '+91', flag: '🇮🇳' },
    { name: 'United States of America', code: '+1', flag: '🇺🇸' },
    { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
    { name: 'Canada', code: '+1', flag: '🇨🇦' },
    { name: 'Australia', code: '+61', flag: '🇦🇺' },
    { name: 'Afghanistan', code: '+93', flag: '🇦🇫' },
    { name: 'Albania', code: '+355', flag: '🇦🇱' }
  ];

  const filteredCountries = countryList.filter(c => c.name.toLowerCase().includes(searchCountry.toLowerCase()));

  if (!isOpen) return null;

  const handleMobileChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    setMobile(val);
  };

  return (
    <div className="rzp-overlay">
      <div className="rzp-modal">
        {/* Left Pane */}
        <div className="rzp-left-pane">
          <div className="rzp-brand">
            <img src="/images/logo.png" alt="Prince N Princess" className="rzp-logo" />
            <div className="rzp-brand-info">
              <h2>Prince N Princess</h2>
              <div className="rzp-trusted-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#00e676"><path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3zm-2 16l-4-4 1.41-1.41L10 15.17l6.59-6.59L18 10l-8 8z"/></svg>
                Razorpay Trusted Business
              </div>
            </div>
          </div>

          <div className="rzp-card rzp-order-summary">
            <div className="rzp-card-header">
              <span>Order summary</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
            <div className="rzp-product-info">
              <img src="/images/gown1.png" alt="Product" className="rzp-product-img" />
              <div className="rzp-product-details">
                <div className="rzp-product-name">Baby Girl Yellow & Green Banarasi Patt...</div>
                <div className="rzp-product-qty">Qty. 1</div>
              </div>
              <div className="rzp-product-price">₹1,999</div>
            </div>
          </div>

          <div className="rzp-card rzp-coupons">
            <div className="rzp-coupon-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#00e676"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.41l9 9c.36.36.86.59 1.41.59s1.05-.22 1.41-.59l7-7c.36-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
            </div>
            <div className="rzp-coupon-details">
              <div className="rzp-coupon-title">Coupons and offers</div>
              <div className="rzp-coupon-subtitle">8 offers available</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>

          {step !== 'contact' && (
            <div className="rzp-card" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer'}} onClick={() => setStep('contact')}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <div style={{width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fcfcfc', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b31b8a" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <div style={{fontSize: '14px', fontWeight: '600', color: '#111'}}>Using as +91 {mobile || '91597 31388'}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
          )}

          <div className="rzp-secured">
            Secured by <strong>Razorpay</strong>
          </div>
        </div>

        {/* Right Pane */}
        <div className="rzp-right-pane">
          {step !== 'contact' ? (
            <div className="rzp-back-btn" onClick={() => setStep('contact')} style={{position: 'absolute', top: '20px', left: '20px', cursor: 'pointer', color: '#666'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </div>
          ) : null}
          
          <div className="rzp-close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </div>

          <div className="rzp-stepper">
            <span className={step === 'contact' ? 'active' : ''}>Contact</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            <span className={step === 'address' ? 'active' : ''}>Address</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            <span className={step === 'payment' ? 'active' : ''}>Payment</span>
          </div>

          <div className="rzp-form-content" style={step === 'address' ? {padding: '20px 60px'} : {}}>
            {step === 'contact' && (
              <>
                <div className="rzp-contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <h2 className="rzp-form-title">Contact details</h2>
                <p className="rzp-form-subtitle">Enter mobile to continue</p>

                <div className="rzp-input-group phone-group">
                  <div className="rzp-country-code" onClick={() => setShowCountryModal(true)} style={{cursor: 'pointer'}}>
                    <span className="flag">{selectedCountry.flag}</span>
                    <span>{selectedCountry.code}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                  <input 
                    type="tel" 
                    placeholder="Mobile number" 
                    value={mobile}
                    onChange={handleMobileChange}
                    maxLength="10"
                  />
                </div>

                <div className="rzp-input-group">
                  <input 
                    type="email" 
                    placeholder="Email (Optional)" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <label className="rzp-checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={sendUpdates}
                    onChange={(e) => setSendUpdates(e.target.checked)}
                  />
                  <span className="checkmark">
                    {sendUpdates && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                  </span>
                  Send me offers and order updates
                </label>

                <button className="rzp-continue-btn" onClick={() => setStep('address')}>
                  Continue
                </button>
              </>
            )}

            {step === 'address' && (
              <>
                <div className="rzp-address-header" style={{display: 'flex', alignItems: 'center', marginBottom: '25px', width: '100%'}}>
                  <h2 className="rzp-form-title" style={{margin: '0 auto'}}>Add delivery address</h2>
                </div>

                <div className="rzp-address-form" style={{width: '100%', textAlign: 'left'}}>
                  {/* Row 1 & 2 grouped */}
                  <div className="rzp-grouped-inputs" style={{border: '1px solid #e0e0e0', borderRadius: '6px', overflow: 'hidden', marginBottom: '15px'}}>
                    
                    <div className="rzp-input-row" onClick={() => setShowCountryModal(true)} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0 15px', borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff', height: '48px'}}>
                      <span style={{marginRight: '10px', fontSize: '18px'}}>{selectedCountry.flag}</span>
                      <div style={{flex: 1, fontSize: '14px', color: '#333'}}>
                        {selectedCountry.name}
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>

                    <div className="rzp-input-row" style={{borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff'}}>
                      <input type="text" placeholder="Pincode" style={{width: '100%', border: 'none', padding: '15px', fontSize: '14px', outline: 'none'}} />
                    </div>

                    <div className="rzp-input-row" style={{display: 'flex', backgroundColor: '#fff'}}>
                      <input type="text" placeholder="City" style={{flex: 1, border: 'none', borderRight: '1px solid #e0e0e0', padding: '15px', fontSize: '14px', outline: 'none'}} />
                      <div style={{flex: 1, display: 'flex', alignItems: 'center', padding: '0 15px'}}>
                        {(statesData[selectedCountry.name] && statesData[selectedCountry.name].length > 0) ? (
                          <select style={{flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', color: '#333', appearance: 'none', height: '100%'}}>
                            {statesData[selectedCountry.name].map((stateName, index) => (
                              <option key={index} value={stateName}>{stateName}</option>
                            ))}
                          </select>
                        ) : (
                          <input type="text" placeholder="State/Province" style={{flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', color: '#333', height: '100%'}} />
                        )}
                        {(statesData[selectedCountry.name] && statesData[selectedCountry.name].length > 0) && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Name field */}
                  <div style={{border: '1px solid #e0e0e0', borderRadius: '6px', marginBottom: '15px'}}>
                    <input type="text" placeholder="Full name" style={{width: '100%', border: 'none', padding: '15px', fontSize: '14px', outline: 'none', borderRadius: '6px'}} />
                  </div>

                  {/* Address rows grouped */}
                  <div className="rzp-grouped-inputs" style={{border: '1px solid #e0e0e0', borderRadius: '6px', overflow: 'hidden', marginBottom: '15px'}}>
                    <div className="rzp-input-row" style={{borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff'}}>
                      <input type="text" placeholder="House no / Building / Apartment" style={{width: '100%', border: 'none', padding: '15px', fontSize: '14px', outline: 'none'}} />
                    </div>
                    <div className="rzp-input-row" style={{backgroundColor: '#fff'}}>
                      <input type="text" placeholder="Area, Sector, Street, Village" style={{width: '100%', border: 'none', padding: '15px', fontSize: '14px', outline: 'none'}} />
                    </div>
                  </div>

                  <div style={{color: '#0F2D5C', fontSize: '14px', fontWeight: '500', marginBottom: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <span style={{fontSize: '18px'}}>+</span> Add landmark (optional)
                  </div>

                  <label className="rzp-checkbox-label" style={{marginBottom: saveAddress ? '15px' : '20px'}}>
                    <input type="checkbox" checked={saveAddress} onChange={(e) => setSaveAddress(e.target.checked)} />
                    <span className="checkmark" style={{width: '18px', height: '18px', borderRadius: '4px'}}>
                      {saveAddress && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </span>
                    <span style={{color: '#111', fontSize: '15px'}}>Save my address as</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" style={{marginLeft: '2px'}}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                  </label>

                  {saveAddress && (
                    <div style={{display: 'flex', gap: '10px', marginLeft: '30px', marginBottom: '15px'}}>
                      <button 
                        onClick={() => setAddressType('Home')}
                        style={{display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '500', 
                          background: addressType === 'Home' ? '#0F2D5C' : '#f5f5f5', color: addressType === 'Home' ? 'white' : '#666'}}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                        Home
                      </button>
                      <button 
                        onClick={() => setAddressType('Office')}
                        style={{display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '500', 
                          background: addressType === 'Office' ? '#0F2D5C' : '#f5f5f5', color: addressType === 'Office' ? 'white' : '#666'}}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                        Office
                      </button>
                      <button 
                        onClick={() => setAddressType('Others')}
                        style={{display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '500', 
                          background: addressType === 'Others' ? '#0F2D5C' : '#f5f5f5', color: addressType === 'Others' ? 'white' : '#666'}}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        Others
                      </button>
                    </div>
                  )}
                  {saveAddress && (
                     <div 
                       onClick={() => setShowMoreOptions(!showMoreOptions)}
                       style={{color: '#0F2D5C', fontSize: '15px', marginBottom: showMoreOptions ? '10px' : '25px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px'}}
                     >
                        {showMoreOptions ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"></polyline></svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        )}
                        {showMoreOptions ? 'See less' : 'More options'}
                     </div>
                  )}

                  {showMoreOptions && saveAddress && (
                    <label className="rzp-checkbox-label" style={{marginBottom: '25px', marginTop: '0'}}>
                      <input type="checkbox" checked={orderForSomeoneElse} onChange={(e) => setOrderForSomeoneElse(e.target.checked)} />
                      <span className="checkmark" style={{width: '18px', height: '18px', borderRadius: '4px', background: orderForSomeoneElse ? '#111' : 'white', border: '1px solid ' + (orderForSomeoneElse ? '#111' : '#ccc')}}>
                        {orderForSomeoneElse && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                      </span>
                      <span style={{color: '#333', fontSize: '15px'}}>Order for someone else</span>
                    </label>
                  )}

                  <button className="rzp-continue-btn" onClick={() => setStep('payment')}>
                    Continue
                  </button>
                </div>
              </>
            )}

            {step === 'payment' && (
              <>
                <div className="rzp-address-header" style={{display: 'flex', alignItems: 'center', marginBottom: '25px', width: '100%'}}>
                  <h2 className="rzp-form-title" style={{margin: '0 auto'}}>Payment</h2>
                </div>
                <div style={{padding: '40px', textAlign: 'center', color: '#666'}}>
                  <p>Razorpay Payment Gateway Integration will go here.</p>
                  <button className="rzp-continue-btn" onClick={onClose} style={{marginTop: '20px'}}>
                    Complete Order
                  </button>
                </div>
              </>
            )}

            {showCountryModal && (
              <div className="rzp-country-modal-overlay" style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'white', zIndex: 100, display: 'flex', flexDirection: 'column'}}>
                <div style={{padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f5f5f5'}}>
                  <h3 style={{margin: 0, fontSize: '18px', color: '#111'}}>Select country code</h3>
                  <svg onClick={() => setShowCountryModal(false)} style={{cursor: 'pointer'}} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
                <div style={{padding: '15px 20px'}}>
                  <div style={{display: 'flex', alignItems: 'center', border: '1px solid #eaeaea', borderRadius: '8px', padding: '12px 15px', background: '#fafafa'}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" style={{marginRight: '10px'}}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input type="text" placeholder="Search country" value={searchCountry} onChange={(e) => setSearchCountry(e.target.value)} style={{border: 'none', outline: 'none', width: '100%', fontSize: '15px', background: 'transparent'}} />
                  </div>
                </div>
                <div style={{flex: 1, overflowY: 'auto'}}>
                  {filteredCountries.map((c, i) => (
                    <div key={i} onClick={() => { setSelectedCountry(c); setShowCountryModal(false); setSearchCountry(''); }} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', borderBottom: '1px solid #f5f5f5', cursor: 'pointer', background: selectedCountry.name === c.name ? '#fcebf6' : 'white'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: '#111', fontWeight: selectedCountry.name === c.name ? '500' : 'normal'}}>
                        <span style={{fontSize: '18px'}}>{c.flag}</span>
                        {c.name}
                      </div>
                      <div style={{width: '18px', height: '18px', borderRadius: '50%', border: '2px solid ' + (selectedCountry.name === c.name ? '#000' : '#ccc'), display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        {selectedCountry.name === c.name && <div style={{width: '10px', height: '10px', borderRadius: '50%', background: '#000'}}></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="rzp-footer">
            By proceeding, I agree to Razorpay's <strong>Privacy Notice</strong> • Edit Preferences
          </div>
        </div>
      </div>
    </div>
  );
};

export default RazorpayCheckoutModal;
