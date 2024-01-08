// plane.js
import React from 'react';

const Plane = () => {
  return (
<div className='bglightt'>
<div className='container'>
  <div className='dflex align-items-center justify-content-center'>
    <div className='px-3'>
      <h2 className="fw-bold fs-3 textinfo pb-2">International Shipping, Done Right!</h2>
      <p>DDP (Duty & Taxes Paid Delivery) Service Provided..</p>
      <ul className="custom-list">
        <li>
          <span className="icon">&#10003;</span>
          Hassle-Free Custom Clearance
        </li>
        <li>
          <span className="icon">&#10003;</span>
          TAX FREE! Duty & Taxes Prepaid by Easyex
        </li>
        <li>
          <span className="icon">&#10003;</span>
          Speed Up without Delay
        </li>
      </ul>
      <p>Did international shipping frustrate you? NO Need to Worry! With the DDP
        (delivery duty paid) service, we not only handle customs clearance but 
        also prepay all duties and taxes in order to speed up international delivery without delay. 
        Now You can relax knowing that everything will be taken care of!</p>
    </div>
    <div className='my-5'>
      <img
        src="./air.png"
        alt="Logo"
        className="img-fluid"
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  </div>
</div>
</div>

  );
};

export default Plane;
