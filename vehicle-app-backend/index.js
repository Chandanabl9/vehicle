const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Your MySQL username
  password: 'Chandu@123',  // Your MySQL password
  database: 'vehicle',  // Your database name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// API Route to Save User Info
app.post('/api/user', (req, res) => {
  const { name, usnEmpId, department, vehicleNumber, mobileNumber } = req.body;
  
  // SQL query to insert user data into 'info' table
  const query = `
    INSERT INTO info (Name, USN_Emp_No, Department, Vehicle_No, Mobile_Number)
    VALUES (?, ?, ?, ?, ?)
  `;
  
  db.query(query, [name, usnEmpId, department, vehicleNumber, mobileNumber], (err, result) => {
    if (err) {
      console.error('Error saving user data:', err);
      return res.status(500).json({ message: 'Error saving data' });
    }
    res.status(200).json({ message: 'User data saved successfully' });
  });
});

// API Route to Search User Info by Vehicle Number (last 4 digits)
app.get('/api/search', (req, res) => {
  const searchTerm = req.query.vehicleNumber;

  if (!searchTerm || searchTerm.length !== 4) {
    return res.status(400).json({ message: 'Please enter the last 4 digits of the vehicle number.' });
  }

  const query = `SELECT * FROM info WHERE Vehicle_No LIKE ?`;
  db.query(query, [`%${searchTerm}`], (err, result) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ message: 'Error fetching data' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'No matching vehicle found.' });
    }

    res.status(200).json(result[0]); // Return the first matched record
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
