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

//   const API_URL = 'https://script.google.com/macros/s/AKfycbxnSQV3Cur6nV9Y1KtWevyyn6vgAuIZ10TyZUDqs7efhBjFRWPrgtCmfSVn2vBqzKA/exec';

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


// App.js
import React, { useState } from 'react';
import DonationReceipt from './DonationReceiptPDFGenerator';

const App = () => {
  // Sample data array to simulate CSV content
  const donations = [
    {
      Receipt_NO: "241101789",
      Donation_Date: "06-11-2024",
      Contributor_Name: "abc",
      Mobile_No: "xxxxxxxxxx",
      Amount: "2500",
      Amount_in_words: "Two Thousand Five Hundred Rupees Only",
      Address: "",
      Payment_mode: "ICICI",
      Contribution_Date: "06-11-2024",
      PAN_No: "xxxxxxxxxxxxx"
    },
    // Add more donation records as needed
  ];

  const [selectedDonation, setSelectedDonation] = useState(null);

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const rows = text.split('\n');
        const headers = rows[0].split(',');
        
        const parsedDonations = rows.slice(1).map(row => {
          const values = row.split(',');
          const donation = {};
          headers.forEach((header, index) => {
            donation[header.trim()] = values[index]?.trim() || '';
          });
          return donation;
        });

        // Update donations state here if you want to make it dynamic
        console.log('Parsed donations:', parsedDonations);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Donation Receipt Generator</h1>
      
      {/* File upload section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Upload Donations CSV</h2>
        <input 
          type="file" 
          accept=".csv"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>

      {/* Donations list */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Select Donation to Generate Receipt</h2>
        <div className="grid gap-4">
          {donations.map((donation, index) => (
            <div 
              key={donation.Receipt_NO || index}
              className="border p-4 rounded cursor-pointer hover:bg-gray-50"
              onClick={() => setSelectedDonation(donation)}
            >
              <p className="font-medium">Receipt No: {donation.Receipt_NO}</p>
              <p>Contributor: {donation.Contributor_Name}</p>
              <p>Amount: Rs. {donation.Amount}</p>
              <p>Date: {donation.Donation_Date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Receipt preview */}
      {selectedDonation && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Receipt Preview</h2>
          <DonationReceipt donationData={selectedDonation} />
        </div>
      )}
    </div>
  );
};

export default App;



