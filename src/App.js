import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  const fetchData = async (url) => {
    try {
      console.log(url);
      const response = await axios.get(url);
      console.log(response.data);
      
      if (response.data && response.data.status === 'success' && Array.isArray(response.data.data)) {
        return response.data.data; // Return the data if it's valid
      } else {
        console.error('Error loading data:', response.data.message || 'Failed to load data');
        return []; // Return an empty array in case of error
      }
    } catch (error) {
      console.error('Error during API request:', error);
      return []; // Return an empty array in case of an exception
    }
  };

  // Load data when the component mounts
  useEffect(() => {
    const API_URL = 'https://script.google.com/macros/s/AKfycbxqwdU2F0A5K-wGVMAu_Z6uO7bqjmQu4lsq_vPeE3KfLhxI7f5N9AdLIMoXMd36Krk/exec';

    
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      const data = await fetchData(API_URL);
      if (data.length > 0) {
        setDonations(data);
      } else {
        setError('Failed to load data');
      }
      
      setLoading(false);
    };

    loadData();
  }, []);

  // Render loading, error, or data
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Donation Records</h1>
      <div className="card-grid">
        {donations.map((donation, index) => (
          <div key={donation.Receipt_NO || index} className="card">
            <h2>Receipt #{donation.Receipt_NO}</h2>
            <div>
              <strong>Contributor:</strong> {donation["Contributor's_Name"]}
            </div>
            <div>
              <strong>Date:</strong> {donation.Donation_Date}
            </div>
            <div>
              <strong>Amount:</strong> ₹{donation.Amount}
            </div>
            <div>
              <strong>Payment Mode:</strong> {donation.Payment_mode}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
