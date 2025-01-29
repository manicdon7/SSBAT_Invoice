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
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileDownload, FaEye, FaTimes, FaSpinner, FaRupeeSign, FaCalendarAlt, FaUser, FaSearch } from 'react-icons/fa';
import DonationReceipt from './DonationReceiptPDFGenerator';

const Modal = ({ isOpen, onClose, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl p-6 w-11/12 max-w-4xl max-h-[90vh] overflow-auto relative shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-red-50 transition-colors text-red-600"
          >
            <FaTimes className="w-5 h-5" />
          </button>
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const App = () => {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbxeiVZ4g-d1QUBplHzUMTj5LXr5bKxwLCvaYNlaCAS5KUXOo2bCzjKWmN79QKyLPl_Z/exec'
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();
        console.log("Full result:", result);
  
        if (result.status === 'success' && Array.isArray(result.data)) {
          const parseDate = (dateString) => {
            if (!dateString) return '';
            if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
              return new Date(dateString).toISOString().split('T')[0];
            }
            if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
              const [day, month, year] = dateString.split('-');
              return new Date(`${year}-${month}-${day}`).toISOString().split('T')[0];
            }
            return 'Invalid Date';
          };
  
          // Slice the array from index 3 to infinite
          const filteredData = result.data.slice(3);
  
          const transformedData = filteredData.map(donation => ({
            ...donation,
            Receipt_NO: donation.Receipt_NO?.toString() || '',
            Contributor_Name: donation["Contributor's_Name"] || '',
            Amount: parseFloat(donation.Amount) || 0,
            Donation_Date: parseDate(donation.Receipt_Date) || ''
          }));
  
          setDonations(transformedData);
        } else {
          throw new Error('Invalid data format received from the server.');
        }
      } catch (error) {
        console.error('Error fetching donations:', error);
        setError('Failed to load donations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchDonations();
  }, []);
  

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const formatAmount = (amount) => {
    return amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handlePreviewClick = (e, donation) => {
    e.stopPropagation();
    setSelectedDonation(donation);
    setIsPreviewOpen(true);
  };

  const handleDownloadClick = (e) => {
    e.stopPropagation();
  };

  const filteredDonations = donations.filter(donation => 
    donation.Receipt_NO.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-600 mb-2">
            Donation Receipt Generator
          </h1>
          <p className="text-yellow-600">Manage and generate donation receipts efficiently</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-red-100">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                placeholder="Search by Receipt Number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-12">
              <FaSpinner className="w-8 h-8 animate-spin text-red-500" />
            </div>
          ) : error ? (
            <div className="text-center p-12 text-red-600">
              <p>{error}</p>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="text-center p-12 text-gray-600">
              <p>{searchQuery ? 'No donations found matching your search.' : 'No donations found.'}</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredDonations.map((donation, index) => (
                <motion.div
                  key={donation.Receipt_NO || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className={`bg-white rounded-xl border transition-all duration-300 cursor-pointer 
                    hover:shadow-lg hover:border-red-200 group ${
                      selectedDonation?.Receipt_NO === donation.Receipt_NO
                        ? 'ring-2 ring-red-400 shadow-lg'
                        : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedDonation(donation)}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-lg text-red-600">
                          Receipt #{donation.Receipt_NO}
                        </h3>
                        <span className="text-yellow-600 text-sm font-semibold">
                          {donation.Payment_mode}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-700">
                          <FaUser className="text-red-400" />
                          <span className="font-medium">{donation.Contributor_Name}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-700">
                          <FaRupeeSign className="text-yellow-500" />
                          <span className="font-medium">
                            {formatAmount(donation.Amount)}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <FaCalendarAlt className="text-red-400" />
                          <span>{formatDate(donation.Donation_Date)}</span>
                        </div>
                      </div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 flex gap-3"
                      >
                        <button
                          onClick={(e) => handlePreviewClick(e, donation)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex-1"
                        >
                          <FaEye className="w-4 h-4" />
                          Preview
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
        <div className="h-full">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Receipt Preview</h2>
          {selectedDonation && (
            <DonationReceipt donationData={selectedDonation} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default App;