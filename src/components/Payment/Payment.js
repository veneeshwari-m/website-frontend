import React from 'react';
import './Payment.css';

const Payment = () => {
  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1 className="payment-title">Payment</h1>

        <p className="payment-intro">
          At shop, we offer multiple secure and convenient payment options to make your shopping experience smooth and reliable whether you're ordering within India or internationally.
        </p>

        <hr className="payment-divider" />

        <div className="payment-section">
          <h2>Online Payment Options</h2>
          <p>We support all major Indian digital payment methods through trusted payment gateways:</p>
          <ul className="payment-list">
            <li>Credit/Debit Cards (Visa, Mastercard, RuPay, etc.)</li>
            <li>Net Banking</li>
            <li>UPI apps including Google Pay, PhonePe, Paytm, and more</li>
          </ul>
          <p>Select PayU or Razorpay at checkout for a secure transaction experience.</p>
        </div>

        <hr className="payment-divider" />

        <div className="payment-section">
          <h2>International Payments</h2>
          <p>We welcome international customers with flexible payment options:</p>
          <ul className="payment-list">
            <li>Choose Razorpay at checkout</li>
            <li>Select the "Wallet" or "PayPal" option in the Razorpay widget</li>
            <li>Pay in your local currency using supported global wallets</li>
          </ul>
          <p><em>Note: PayPal is only available through the Razorpay gateway.</em></p>
        </div>

        <hr className="payment-divider" />

        <div className="payment-section">
          <h2>UPI / Bank Transfer</h2>
          <p>If you prefer to pay via direct UPI or bank transfer, please note:</p>
          <ul className="payment-list">
            <li>These payments are eligible for exchange only</li>
            <li>Refunds are not applicable for orders paid through this method</li>
          </ul>
          <p>Please ensure you review sizing or reach out to our team before placing your order via manual transfer.</p>
        </div>

        <hr className="payment-divider" />

        <div className="payment-section">
          <h2>Cash on Delivery (COD)</h2>
          <p>We offer Cash on Delivery service across India for your convenience:</p>
          <ul className="payment-list">
            <li>COD Fee: ₹40 per order</li>
            <li>COD is available on select serviceable pin codes</li>
            <li>Please ensure availability and accurate address details during checkout</li>
          </ul>
        </div>

        <hr className="payment-divider" />

        <div className="payment-section">
          <p>If you need help choosing the right payment method or have special payment concerns, our team is here to assist.</p>
          <p style={{ marginTop: '15px' }}>
            📧 <strong>Email:</strong> <a href="mailto:info@princenprincess.in" style={{ color: '#333', textDecoration: 'none' }}>info@princenprincess.in</a>
          </p>
          <p>
            📞 <strong>WhatsApp:</strong> <a href="https://wa.me/919952778217" style={{ color: '#800080', textDecoration: 'underline' }}>+91-99527 78217</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
