import React from 'react';

import './LovedByCustomers.css';

const LovedByCustomers = () => {
  return (
    <section className="loved-by-customers-section">
      <div className="loved-by-customers-images">
        <div className="factory-img-wrapper">
          <img src="/images/im1.jpg" alt="Factory View 1" className="factory-img" />
         
        </div>
        <div className="factory-img-wrapper">
          <img src="/images/img2.jpg" alt="Factory View 2" className="factory-img" />
         
        </div>
      </div>
      
    </section>
  );
};

export default LovedByCustomers;
