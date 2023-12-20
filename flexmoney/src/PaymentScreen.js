import React from 'react';
import './PaymentScreen.css';

const payment = ({onPaymentSuccess, selectedBatchTiming,  formData })=> {
  const { name, email, phone } = formData || {}; 
  const handleCheckout = async () => {
    console.log(formData); 
    console.log(formData.name);
    const name = formData.name;
    console.log(name);
    try {
      const userIdResponse = await fetch('http://127.0.0.1:5000/get_user_id_by_name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name}),
      });
      console.log(userIdResponse);
      if (userIdResponse.ok) {
        const jsonResponse = await userIdResponse.json();
        console.log('User ID Response:', jsonResponse); // Log the entire response object

       const { user_id } = jsonResponse;
       console.log('User ID:', user_id);

       const id = user_id;
       console.log(id);
       const batch_timings =(selectedBatchTiming);
       console.log(batch_timings);

        const enrollResponse = await fetch('http://127.0.0.1:5000/enroll_user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, batch_timings}),
        });
  
        if (enrollResponse.ok) {
          console.log('User enrolled successfully');
        } else {
          console.error('Failed to enroll user');
        }
      } else {
        console.error('User ID fetch failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    console.log(selectedBatchTiming)
    onPaymentSuccess();
  };
  
  return (
    <div className="payment-container">
      <div className="payment-details">
        <h2>Payment Information</h2>
        <div className="info">
        <p><strong>Name:</strong> {name} </p>
          <p><strong>Email:</strong>{email} </p>
          <p><strong>Phone:</strong>{phone} </p>
        </div>
      </div>
      <div className="pricing">
        <h2>Price Details</h2>
        <div className="price-info">
          <p><strong>Price:</strong> 450</p>
          <p><strong>SGST:</strong> 25</p>
          <p><strong>CGST:</strong> 25</p>
          <hr />
          <p><strong>Total:</strong> 500/-</p>
        </div>
        <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default payment;
