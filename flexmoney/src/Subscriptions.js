import React from 'react';
import './Subscriptions.css';

const Subscriptions = ({ onSubmit }) => {
  const handleEnrollNow = () => {
    onSubmit();
  };
  return (
    <div className="subscriptions-container">
      <div className="product-details">
        <h2>YOGA ADMISSION ENROLLMENT FORM</h2>
        <div className="details">
          <p className='text-right'>500₹<span className="text-money"> / month</span></p>
          <p className='textsidehead'>--- INCLUDES ---</p>
          <ul className='textside'>
            <li>Age group 18-65 years </li>
            <li>Flexible Batch Timings</li>
            <li>Affordable pricing (Monthly basis, payable any time during the month.)</li>
          </ul>
          <button className="buy-now-button" onClick={handleEnrollNow} >Enroll Now</button>
        </div>
      </div>
    </div>
  );
};
export default Subscriptions;
