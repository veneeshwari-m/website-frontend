import React from 'react';
import './Terms.css';

const Terms = () => {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <h1 className="terms-title">Terms and Conditions</h1>

        <p className="terms-text">
          Welcome to <a href="http://www.princenprincess.in" target="_blank" rel="noopener noreferrer">www.princenprincess.in</a>. By accessing or using this website, you agree to comply with and be bound by the following Terms and Conditions, which, along with our Privacy Policy, govern the relationship between you and shop Clothing regarding your use of this website.
        </p>

        <p className="terms-text">
          Please read these terms carefully. If you do not agree with any part of these terms, please refrain from using our site.
        </p>

        <hr className="terms-divider" />

        <h2 className="terms-subtitle">Website Usage</h2>

        <ul className="terms-list">
          <li>The content provided on this website is for your general information and personal use only. It is subject to change without prior notice.</li>
          <li>We do not guarantee the accuracy, completeness, performance, or suitability of the information and materials found or offered on this site.</li>
          <li>You acknowledge that such information may contain errors or inaccuracies. We expressly exclude liability for any such inaccuracies to the fullest extent permitted by law.</li>
          <li>Any use of information or materials on this website is entirely at your own risk. It is your responsibility to ensure that any products, services, or information available through this site meet your specific requirements.</li>
        </ul>

        <hr className="terms-divider" />

        <h2 className="terms-subtitle">Intellectual Property</h2>
        <ul className="terms-list">
          <li>This website contains material that is owned by or licensed to us, including but not limited to design, layout, look, appearance, images, and graphics.</li>
          <li>Reproduction or redistribution of any part of this content is strictly prohibited without written consent, except as permitted by our copyright policy.</li>
          <li>All trademarks reproduced on this site, which are not the property of or licensed to shop, are duly acknowledged.</li>
        </ul>

        <hr className="terms-divider" />

        <h2 className="terms-subtitle">External Links</h2>
        <ul className="terms-list">
          <li>From time to time, our website may include links to third-party websites. These are provided for your convenience and additional information.</li>
          <li>Inclusion of any such links does not imply endorsement, and we hold no responsibility for the content or policies of linked websites.</li>
        </ul>

        <hr className="terms-divider" />

        <h2 className="terms-subtitle">Restrictions</h2>
        <ul className="terms-list">
          <li>You may not create a link to this website from another website or document without prior written consent from shop.</li>
          <li>Unauthorised use of this website may result in a claim for damages and/or may be treated as a criminal offense.</li>
        </ul>

        <hr className="terms-divider" />

        <h2 className="terms-subtitle">Governing Law</h2>
        <ul className="terms-list">
          <li>Your use of this website and any disputes arising from such use shall be governed by the laws of India, under applicable jurisdiction or regulatory authority.</li>
        </ul>

        <hr className="terms-divider" />

        <h2 className="terms-subtitle">Product Listings & Delivery</h2>
        <ul className="terms-list">
          <li>shop takes pride in offering accurate product listings with detailed descriptions to ensure a confident shopping experience.</li>
          <li>We have partnered with multiple trusted delivery providers to ensure timely order fulfilment across India.</li>
          <li>However, please note that delivery timelines are estimates and may vary due to peak seasons, weather disruptions, or logistical challenges.</li>
          <li>We shall not be held responsible for any delays that are beyond our control, and we kindly request your understanding during such events.</li>
        </ul>
        <hr className="terms-divider" />

        <h2 className="terms-subtitle">Updates to Terms</h2>
        <p className="terms-text">
          We reserve the right to modify these Terms and Conditions at any time. Any changes will take effect immediately upon being posted on this page.
        </p>
        <p className="terms-text">
          For additional information, please refer to our <a href="/privacy">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default Terms;
