import React, { useState } from 'react';
import './Batches.css';

const Batches = ({ onProceed }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const handleProceed = async () => {
    console.log(selectedOption)
    onProceed(selectedOption);
  };

  return (
    <div className="batch-timings-container">
      <h1>Select Batch Timings</h1>
      <div className="batch-options">
        <div
          className={`batch-option ${selectedOption === '6 - 7 am' ? 'selected' : ''}`}
          onClick={() => handleSelectOption('6 - 7 am')}
        >
          6-7 am
        </div>
        <div
          className={`batch-option ${selectedOption === '7 - 8 am' ? 'selected' : ''}`}
          onClick={() => handleSelectOption('7 - 8 am')}
        >
          7-8 am
        </div>
        <div
          className={`batch-option ${selectedOption === '8 - 9 am' ? 'selected' : ''}`}
          onClick={() => handleSelectOption('8 - 9 am')}
        >
          8-9 am
        </div>
        <div
          className={`batch-option ${selectedOption === '5 - 6 pm' ? 'selected' : ''}`}
          onClick={() => handleSelectOption('5 - 6 pm')}
        >
          5-6 pm
        </div>
        </div>
        <div className='message'><p>* Select any one of the batch (<span className='note'>You cannot change the batch until next enrollment</span>)</p></div>
      {selectedOption && (
        <button className="proceed-button" onClick={handleProceed}>
          Proceed
        </button>
      )}
    </div>
  );
};

export default Batches;
