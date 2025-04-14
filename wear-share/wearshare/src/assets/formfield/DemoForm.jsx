import React, { useState } from 'react';
import './DemoForm.css';

function DemoForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    if (!name || !email || !subject || !time) {
      setErrorMessage('All fields are required.');
      return;
    }

    // Simulate form submission (replace with API call)
    setSuccessMessage('Your booking has been successfully submitted!');
    setErrorMessage('');
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setTime('');
    setMessage('');
  };

  return (
    <div className="demo-form-container">
      <h2>Demo Form</h2>

      <form onSubmit={handleSubmit} className="demo-form">
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Preferred Subject:</label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          >
            <option value="">Select a subject</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="History">History</option>
            <option value="Music">Music</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="time">Preferred Time:</label>
          <input
            type="datetime-local"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Additional Message (Optional):</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Any additional details?"
          ></textarea>
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <button type="submit" className="submit-btn">Submit Booking</button>
      </form>
    </div>
  );
}

export default DemoForm;
