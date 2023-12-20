import React from 'react';
import './PaymentSuccess.css';
import successGif from './assets/success.gif';

const PaymentSuccess = () => {
  return (
    <div className="payment-success-container">
      <div className="success-content">
        <img src={successGif} alt="Payment Successful" className="success-image" />
      </div>
    </div>
  );
};
export default PaymentSuccess;
