import React, { useEffect, useState } from 'react';
import './FormComponent.css';

const FormComponent = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const[phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  // const [selectedName, setSelectedName] = useState(null);
  const [error, setError] = useState('');
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    if (dob) {
      const currentDate = new Date();
      const selectedDate = new Date(dob);
      const age = currentDate.getFullYear() - selectedDate.getFullYear();
      const monthDiff = currentDate.getMonth() - selectedDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < selectedDate.getDate())) {
        age--;
      }

      if (age < 18 || age > 65) {
        setError('Age should be between 18 and 65');
        setIsButtonVisible(false);
      } else {
        setError('');
        setIsButtonVisible(true);
      }
    } else {
      setIsButtonVisible(false);
    }
  }, [dob]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const currentDate = new Date().toISOString().split('T')[0];
  
    if (selectedDate > currentDate) {
      setError('Please select a Valid Date of Birth');
      setDob(''); 
      setIsButtonVisible(false);
    }
     else {
      setDob(selectedDate);
      setError('');
      setIsButtonVisible(true);
    }
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    if (error) {
      alert('Cannot proceed. Age should be between 18 and 65.');
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:5000/submit_form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, gender, dob }),
      });
  
      if (response.ok) {
        console.log('Form data submitted successfully');
      } else {
        console.error('Failed to submit form data');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
    
    const formData = { name, email, phone, gender, dob };
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h1>Yoga Admission Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input 
            type="number" 
            id="phone" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select 
            id="gender" 
            value={gender} 
            onChange={(e) => setGender(e.target.value)} 
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input 
            type="date" 
            id="dob" 
            onChange={handleDateChange} 
            required 
          />
        </div>
        {error && (
  <div className="error-message">
    {error}
  </div>
)}
{isButtonVisible && (
  <button type="submit">
    Proceed further
  </button>
)}
      </form>
    </div>
  );
};

export default FormComponent;
