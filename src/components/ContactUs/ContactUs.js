import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-page">
      <div className="contact-breadcrumb">
        <span>Home</span> &middot; <span>Contact Us</span>
      </div>

      <div className="contact-header">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">Please use the below form. You can also call service on +91-9952778217</p>
      </div>

      <div className="contact-map-container">
        <iframe
          title="shop Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.6346285640236!2d77.0189874!3d10.9909245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859f71c402129%3A0xc6c76fc4754efee!2sPrince%20N%20Princess%20-%20Kids%20Dress%20Store%20Pattu%20Pavadai%2C%20Frock%2C%20Choli%2C%20Sherwani%20%26%20New%20Born!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="contact-details-container">
        <div className="contact-info-column">
          <h2 className="contact-subheading">Suport Customer</h2>
          <p>Have a question? Please contact us using the customer support channels below.</p>

          <div className="contact-info-block">
            <p className="contact-label">Customer Care:</p>
            <p><a href="tel:+919952778217" className="contact-link"><u>WhatsApp / Call</u> : +91-9952778217</a></p>
            <p><a href="mailto:info@princenprincess.in" className="contact-link"><u>Email</u>: info@princenprincess.in</a></p>
          </div>

          <div className="contact-info-block">
            <p className="contact-label"><u>Main Office:</u></p>
            <p>shop</p>
            <p>10C Vasantha Nagar, 5th Street</p>
            <p>Behind old Jai Shanthi Theater</p>
            <p>Singnallur, Coimbaotre - 641005, Tamil Nadu</p>
            <p>Phone: 8220954602 / 9952778217</p>
          </div>
        </div>

        <div className="contact-form-column">
          <h2 className="contact-subheading">Contact Us</h2>
          <p>Please submit all general enquiries in the contact form below and we look forward to hearing from you soon.</p>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <input type="text" placeholder="Your name" className="form-input" required />
              <input type="email" placeholder="E-mail" className="form-input" required />
            </div>
            <textarea placeholder="Enter Your Message" className="form-textarea" rows="6" required></textarea>

            <div className="form-checkbox-container">
              <input type="checkbox" id="privacy-policy" required />
              <label htmlFor="privacy-policy">I agree to the <a href="/privacy" style={{ color: '#333', textDecoration: 'underline' }}>Privacy Policy</a> of the website.</label>
            </div>

            <button type="submit" className="form-submit-btn">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
