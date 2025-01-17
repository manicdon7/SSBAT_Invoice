// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';
// import Header from './Header';

// const App = () => {
//   const [donations, setDonations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to fetch data
//   const fetchData = async (url) => {
//     try {
//       const response = await axios.get(url);
//       if (response.data && response.data.status === 'success') {
//         return response.data.data;
//       } else {
//         console.error('Error loading data:', response.data.message);
//         return [];
//       }
//     } catch (error) {
//       console.error('Error during API request:', error);
//       return [];
//     }
//   };

//   // useEffect to load data on component mount
//   useEffect(() => {
//     const API_URL = 'https://script.google.com/macros/s/AKfycbxGEHrFhxq2yFr0h9mhJtDM2EFQiPEvcO9wVSBEeD-CvulWnI-aJj0qC50_b9r2OQzI/exec';

//     const loadData = async () => {
//       setLoading(true);
//       setError(null);

//       const data = await fetchData(API_URL);
//       if (data.length > 0) {
//         setDonations(data);
//       } else {
//         setError('Failed to load data');
//       }

//       setLoading(false);
//     };

//     loadData();
//   }, []);

//   // Render loading, error, or data
//   // if (loading) {
//   //   return <div>Loading...</div>;
//   // }

//   // if (error) {
//   //   return (
//   //     <div>
//   //       <p>{error}</p>
//   //       <button onClick={() => window.location.reload()}>Retry</button>
//   //     </div>
//   //   );
//   // }

//   // Render donation data
//   return (
//     <div className="container">
//       <div>
//         <Header/>
//       </div>
//       <h1>Donation Records</h1>
//       <div className="card-grid">
//         {donations.map((donation, index) => (
//           <div key={donation.Receipt_NO || index} className="card">
//             <h2>Receipt #{donation.Receipt_NO}</h2>
//             <div>
//               <strong>Contributor:</strong> {donation["Contributor's_Name"]}
//             </div>
//             <div>
//               <strong>Date:</strong> {donation.Donation_Date}
//             </div>
//             <div>
//               <strong>Amount:</strong> ₹{donation.Amount}
//             </div>
//             <div>
//               <strong>Payment Mode:</strong> {donation.Payment_mode}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';
// import Header from './Header';

// const App = () => {
//   const [donations, setDonations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const API_URL = 'https://script.googleusercontent.com/macros/echo?user_content_key=PWQO5XQHUI4d0_ovv7S6gnt2_zT_rUF59q8qQ1Y7Zo_70_HOl5igHPBVy_O6szuimyK7ovO_4BVBApGS693LQyNZrfxn05yRm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnH5A-FEnX_LrCL_fCzMM7HhFtQ2GICf_m1ZSd4wjwze5DSXYXQxRXXsCuGaFaozWYEup_NK2jc7eAPic45JyYjpbXZJsqogUIg&lib=MXiP-_xR-HvtIm9mw9nBB5w_yjbgoiDNP';

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(API_URL);
//       const data = response.data;
//       if (data.status === 'success') {
//         setDonations(data.data);
//       } else {
//         setError('Error loading data');
//       }
//     } catch (error) {
//       setError('Network Error');
//       console.error('Axios error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="container">
//       <Header />
//       <h1>Donation Records</h1>
//       <div className="card-grid">
//         {donations.map((donation, index) => (
//           <div key={index} className="card">
//             <h2>Receipt #{donation.Receipt_NO}</h2>
//             <p><strong>Contributor:</strong> {donation["Contributor's_Name"]}</p>
//             <p><strong>Date:</strong> {donation.Donation_Date}</p>
//             <p><strong>Amount:</strong> ₹{donation.Amount}</p>
//             <p><strong>Payment Mode:</strong> {donation.Payment_mode}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import DonationReceipt from './DonationReceiptPDFGenerator';

const App = () => {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from the provided URL
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        // Fetching the data from the Google Apps Script Web App
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbxeiVZ4g-d1QUBplHzUMTj5LXr5bKxwLCvaYNlaCAS5KUXOo2bCzjKWmN79QKyLPl_Z/exec'
        );
        
        // Check if response is ok (status code 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parsing JSON response
        const data = await response.json();
        console.log('Fetched data:', data); // Log the entire data for debugging

        // Assuming the response has a "data" field containing the donations
        if (data.status === 'success' && Array.isArray(data.data)) {
          setDonations(data.data);
        } else {
          console.error('Invalid data structure received:', data);
        }
      } catch (error) {
        console.error('Error fetching donations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div>
      <h1>Donation Receipt Generator</h1>

      {loading ? (
        <p>Loading donations...</p>
      ) : (
        <>
          {/* Donations list */}
          <div>
            <h2>Select Donation to Generate Receipt</h2>
            {donations.length > 0 ? (
              <ul>
                {donations.map((donation, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedDonation(donation)}
                    style={{ cursor: 'pointer' }}
                  >
                    <p>Receipt No: {donation.Receipt_NO}</p>
                    <p>Contributor: {donation.Contributor_Name}</p>
                    <p>Amount: Rs. {donation.Amount}</p>
                    <p>Date: {donation.Donation_Date}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No donations found.</p>
            )}
          </div>

          {/* Receipt preview */}
          {selectedDonation && (
            <div>
              <h3>Receipt Preview</h3>
              <DonationReceipt donation={selectedDonation} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
