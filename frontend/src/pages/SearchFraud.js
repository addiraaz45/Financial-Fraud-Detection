// import React, { useState } from 'react';
// import { fraudAPI } from '../utils/api';
// import "../styles/App.css";

// function SearchFraud() {
//   const [searchData, setSearchData] = useState({
//     phone: '',
//     upi: '',
//   });
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setSearchData({
//       ...searchData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setError('');
//     setResult(null);
//     setLoading(true);

//     if (!searchData.phone && !searchData.upi) {
//       setError('Please enter phone number or UPI ID');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fraudAPI.searchFraud(searchData);
//       setResult(response.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Search failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getRiskColor = (score) => {
//     if (score === 0) return '#22c55e';
//     if (score <= 1) return '#84cc16';
//     if (score <= 3) return '#eab308';
//     if (score <= 5) return '#f97316';
//     return '#ef4444';
//   };

//   return (
//     <div className="container">
//       <h1 className="page-title">Search for Fraud</h1>

//       <div style={{ maxWidth: '600px', margin: '0 auto', marginBottom: '2rem' }}>
//         {error && <div className="error-message">{error}</div>}

//         <form onSubmit={handleSearch}>
//           <div className="form-group">
//             <label>Phone Number (10 digits)</label>
//             <input
//               type="tel"
//               name="phone"
//               value={searchData.phone}
//               onChange={handleChange}
//               placeholder="9876543210"
//             />
//           </div>

//           <div className="form-group">
//             <label>UPI ID</label>
//             <input
//               type="text"
//               name="upi"
//               value={searchData.upi}
//               onChange={handleChange}
//               placeholder="user@upi"
//             />
//           </div>

//           <button type="submit" className="btn-primary" disabled={loading}>
//             {loading ? 'Searching...' : 'Search'}
//           </button>
//         </form>
//       </div>

//       {result && (
//         <div style={{ maxWidth: '600px', margin: '0 auto' }}>
//           <div style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
//             <h2 style={{ marginBottom: '1.5rem' }}>Search Results</h2>

//             {/* Prominent SCAM or SAFE Banner - Added for your requirement */}
//             <div
//               style={{
//                 padding: '1.5rem',
//                 backgroundColor: result.scamSafe === 'scam' ? '#ef4444' : '#22c55e',  // Red for SCAM, Green for SAFE
//                 borderRadius: '8px',
//                 color: 'white',
//                 marginBottom: '1.5rem',
//                 textAlign: 'center',
//                 fontSize: '1.5rem',
//                 fontWeight: 'bold',
//               }}
//             >
//               {result.scamSafe.toUpperCase()}  {/* Displays "SCAM" or "SAFE" prominently */}
//             </div>

//             <div
//               style={{
//                 padding: '1.5rem',
//                 backgroundColor: getRiskColor(result.riskScore),
//                 borderRadius: '8px',
//                 color: 'white',
//                 marginBottom: '1.5rem',
//                 textAlign: 'center',
//               }}
//             >
//               <h3 style={{ marginBottom: '0.5rem' }}>{result.riskLevel}</h3>
//               <p>Risk Score: {result.riskScore}</p>
//             </div>

//             <p>
//               <strong>Total Complaints:</strong> {result.totalComplaints}
//             </p>
//             {result.phone && <p><strong>Phone:</strong> {result.phone}</p>}
//             {result.upi && <p><strong>UPI:</strong> {result.upi}</p>}

//             {result.reports.length > 0 && (
//               <div style={{ marginTop: '2rem' }}>
//                 <h3>Recent Complaints:</h3>
//                 <ul style={{ marginTop: '1rem' }}>
//                   {result.reports.map((report, idx) => (
//                     <li key={idx} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
//                       <p><strong>Type:</strong> {report.fraudType}</p>
//                       <p><strong>Description:</strong> {report.description}</p>
//                       <p><strong>Date:</strong> {new Date(report.incidentDate).toLocaleDateString()}</p>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SearchFraud;




import React, { useState } from "react";
import { fraudAPI } from "../utils/api";
import "../styles/App.css";

function SearchFraud() {
  const [searchData, setSearchData] = useState({
    phone: "",
    upi: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Input change handler
  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  // Main API search
  const handleSearch = async (e) => {
    e.preventDefault();

    setError("");
    setResult(null);
    setLoading(true);

    if (!searchData.phone && !searchData.upi) {
      setError("Please enter phone number or UPI ID");
      setLoading(false);
      return;
    }

    try {
      const response = await fraudAPI.searchFraud(searchData);
      setResult(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  // Risk color helper
  const getRiskColor = (score) => {
    if (score === 0) return "#22c55e"; // green
    if (score <= 1) return "#84cc16"; // yellow-green
    if (score <= 3) return "#eab308"; // yellow
    if (score <= 5) return "#f97316"; // orange
    return "#ef4444"; // red
  };

  return (
    <div className="container">
      <h1 className="page-title">Search Fraud Record</h1>

      <div style={{ maxWidth: "600px", margin: "0 auto", marginBottom: "2rem" }}>
        {error && <div className="error-message">{error}</div>}

        {/* Search Form */}
        <form onSubmit={handleSearch}>
          <div className="form-group">
            <label>Phone Number (10 digits)</label>
            <input
              type="tel"
              name="phone"
              value={searchData.phone}
              onChange={handleChange}
              placeholder="9876543210"
            />
          </div>

          <div className="form-group">
            <label>UPI ID</label>
            <input
              type="text"
              name="upi"
              value={searchData.upi}
              onChange={handleChange}
              placeholder="user@upi"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {/* Search Results */}
      {result && (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ marginBottom: "1.5rem" }}>Search Results</h2>

            {/* SCAM / SAFE Banner */}
            <div
              style={{
                padding: "1.5rem",
                backgroundColor:
                  result.scamSafe === "scam" ? "#ef4444" : "#22c55e",
                borderRadius: "8px",
                color: "white",
                marginBottom: "1.5rem",
                textAlign: "center",
                fontSize: "1.7rem",
                fontWeight: "bold",
              }}
            >
              {result.scamSafe.toUpperCase()}
            </div>

            {/* Risk Score Card */}
            <div
              style={{
                padding: "1.5rem",
                backgroundColor: getRiskColor(result.riskScore),
                borderRadius: "8px",
                color: "white",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              <h3 style={{ marginBottom: "0.5rem" }}>{result.riskLevel}</h3>
              <p>Risk Score: {result.riskScore}</p>
            </div>

            <p>
              <strong>Total Complaints:</strong> {result.totalComplaints}
            </p>
            {result.phone && (
              <p>
                <strong>Phone:</strong> {result.phone}
              </p>
            )}
            {result.upi && (
              <p>
                <strong>UPI:</strong> {result.upi}
              </p>
            )}

            {result.reports.length > 0 && (
              <div style={{ marginTop: "2rem" }}>
                <h3>Recent Complaints:</h3>
                <ul style={{ marginTop: "1rem" }}>
                  {result.reports.map((report, idx) => (
                    <li
                      key={idx}
                      style={{
                        marginBottom: "1rem",
                        paddingBottom: "1rem",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <p>
                        <strong>Type:</strong> {report.fraudType}
                      </p>
                      <p>
                        <strong>Description:</strong> {report.description}
                      </p>
                      <p>
                        <strong>Report Date:</strong>{" "}
                        {new Date(report.incidentDate).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchFraud;

