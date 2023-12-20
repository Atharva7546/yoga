import React, { useState } from 'react';
import './App.css';
import Batches from './Batches';
import FormComponent from './FormComponent';
import PaymentScreen from './PaymentScreen';
import PaymentSuccess from './PaymentSuccess';
import Subscriptions from './Subscriptions';

function App() {
  const [showSubscription, setShowSubscription] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showBatch, setShowBatch] = useState(false);
  const [formData, setFormData] = useState(null); 
  const [selectedBatchTiming, setSelectedBatchTiming] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  const handleSubscriptionSubmit = () => {
    setShowSubscription(false);
    setShowForm(true);
  };

  const handleFormSubmit = (data) => { 
    setFormData(data); 
    setShowForm(false);
    setShowBatch(true);
  };

  const handleProceed = (batchTiming) => {
    setSelectedBatchTiming(batchTiming);
    setShowBatch(false);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setShowPaymentSuccess(true);
  };

  return (
    <div className="App">
      {showSubscription && <Subscriptions onSubmit={handleSubscriptionSubmit} />}
      {showForm && <FormComponent onSubmit={handleFormSubmit} />} {}
      {showBatch && <Batches onProceed={handleProceed} />}
      {showPayment && (
        <PaymentScreen
          formData={formData} 
          selectedBatchTiming={selectedBatchTiming}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
      {showPaymentSuccess && <PaymentSuccess />}
      {!showSubscription && !showForm && !showBatch && !showPayment && !showPaymentSuccess && (
        <p>No component to display</p>
      )}
    </div>
  );
}

export default App;
