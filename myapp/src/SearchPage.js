import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Retrieve user data from localStorage
    const storedData = JSON.parse(localStorage.getItem('userData'));
    
    // Check if the vehicle number ends with the provided search term
    if (storedData && storedData.vehicleNumber.endsWith(searchTerm)) {
      setUserData(storedData);
      setMessage('');
    } else {
      setMessage('No matching vehicle found.');
      setUserData(null);
    }
  };

  return (
    <div className="App">
      <h2>Search Vehicle Information</h2>
      <form onSubmit={handleSearchSubmit}>
        <label>Enter last 4 digits of vehicle number:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          maxLength={4} // Limit the input to 4 characters
          required
        />
        <button type="submit">Search</button>
      </form>

      <div className="search-result">
        {message && <p>{message}</p>}
        {userData && (
          <div>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Department:</strong> {userData.department}</p>
            <p><strong>Vehicle Number:</strong> {userData.vehicleNumber}</p>
            <p><strong>Mobile Number:</strong> {userData.mobileNumber}</p>
          </div>
        )}
      </div>

      <button onClick={() => navigate('/')}>Go Back to Form</button>
    </div>
  );
}

export default SearchPage;
