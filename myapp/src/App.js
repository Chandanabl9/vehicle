import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';

// User Form Page Component
function UserForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    department: '',
    usnEmpId: '',
    vehicleNumber: '',
    mobileNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send the data to backend to save user info
      const response = await axios.post('http://localhost:5000/api/user', formData);
      alert(response.data.message);
      navigate('/search');
    } catch (error) {
      alert('Error saving data');
    }
  };

  return (
    <div className="form-container">
      <h2>User Information Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Faculty/Student Name"
          required
        />
        
        <label>Department:</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Enter Faculty/Student Department"
          required
        />
        
        <label>Employee ID/USN:</label>
        <input
          type="text"
          name="usnEmpId"
          value={formData.usnEmpId}
          onChange={handleChange}
          placeholder="Enter Employee ID or USN"
          required
        />
        
        <label>Vehicle Number:</label>
        <input
          type="text"
          name="vehicleNumber"
          value={formData.vehicleNumber}
          onChange={handleChange}
          placeholder="Enter Vehicle Number"
          required
        />
        
        <label>Mobile Number:</label>
        <input
          type="text"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          placeholder="Enter Mobile Number"
          maxLength="10"
          required
        />
        
        <div className="button-container">
          <button type="search">Search</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

// Search Page Component
function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    
    if (searchTerm.length !== 4) {
      alert('Please enter exactly the last 4 digits of the vehicle number.');
      return;
    }

    try {
      // Send search query to backend
      const response = await axios.get(`http://localhost:5000/api/search?vehicleNumber=${searchTerm}`);
      setSearchResult(response.data); // Display the result
    } catch (error) {
      alert('No matching vehicle found.');
      setSearchResult(null);
    }
  };

  return (
    <div className="search-container">
      <h2>Search Vehicle Information</h2>
      <form onSubmit={handleSearchSubmit}>
        <label>Enter last 4 digits of vehicle number:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          maxLength={4}
          required
          placeholder="Enter last 4 digits of vehicle number"
        />
        <button type="submit">Search</button>
      </form>

      <div className="search-result">
        {searchResult && (
          <div>
            <p><strong>Name:</strong> {searchResult.Name}</p>
            <p><strong>Department:</strong> {searchResult.Department}</p>
            <p><strong>Vehicle Number:</strong> {searchResult.Vehicle_No}</p>
            <p><strong>Mobile Number:</strong> {searchResult.Mobile_Number}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;