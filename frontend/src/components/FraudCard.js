// import React from 'react';
// import './FraudCard.css';

// function FraudCard({ report, onDelete, onVerify, isAdmin }) {
//   const getRiskColor = (score) => {
//     if (score === 0) return '#22c55e';
//     if (score <= 1) return '#84cc16';
//     if (score <= 3) return '#eab308';
//     if (score <= 5) return '#f97316';
//     return '#ef4444';
//   };

//   const getRiskLevel = (score) => {
//     if (score === 0) return 'Safe';
//     if (score <= 1) return 'Low Risk';
//     if (score <= 3) return 'Suspicious';
//     if (score <= 5) return 'High Risk';
//     return 'Highly Fraudulent';
//   };

//   return (
//     <div className="fraud-card">
//       <div className="card-header">
//         <div className="card-title">{report.upiId}</div>
//         <div
//           className="risk-badge"
//           style={{ backgroundColor: getRiskColor(report.riskScore || 0) }}
//         >
//           {getRiskLevel(report.riskScore || 0)}
//         </div>
//       </div>

//       <div className="card-body">
//         <p>
//           <strong>Phone:</strong> {report.phone}
//         </p>
//         <p>
//           <strong>Type:</strong> {report.fraudType}
//         </p>
//         <p>
//           <strong>Description:</strong> {report.description}
//         </p>
//         <p>
//           <strong>Date:</strong> {new Date(report.incidentDate).toLocaleDateString()}
//         </p>
//         <p>
//           <strong>Status:</strong>{' '}
//           <span className={`status status-${report.status}`}>{report.status}</span>
//         </p>
//       </div>

//       {(isAdmin || !isAdmin) && (
//         <div className="card-actions">
//           {isAdmin && report.status === 'pending' && (
//             <>
//               <button
//                 className="btn btn-verify"
//                 onClick={() => onVerify(report._id, 'verified')}
//               >
//                 Verify
//               </button>
//               <button
//                 className="btn btn-reject"
//                 onClick={() => onVerify(report._id, 'rejected')}
//               >
//                 Reject
//               </button>
//             </>
//           )}
//           {(isAdmin || report.reportedBy === localStorage.getItem('userId')) && (
//             <button className="btn btn-delete" onClick={() => onDelete(report._id)}>
//               Delete
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default FraudCard;


import React from 'react';
import '../styles/FraudCard.css';

function FraudCard({ report, onDelete, onVerify, isAdmin }) {
  const getRiskColor = (score) => {
    if (score === 0) return '#22c55e';
    if (score <= 1) return '#84cc16';
    if (score <= 3) return '#eab308';
    if (score <= 5) return '#f97316';
    return '#ef4444';
  };

  const getRiskLevel = (score) => {
    if (score === 0) return 'Safe';
    if (score <= 1) return 'Low Risk';
    if (score <= 3) return 'Suspicious';
    if (score <= 5) return 'High Risk';
    return 'Highly Fraudulent';
  };

  return (
    <div className="fraud-card">
      <div className="card-header">
        <div className="card-title">{report.upiId}</div>
        <div
          className="risk-badge"
          style={{ backgroundColor: getRiskColor(report.riskScore || 0) }}
        >
          {getRiskLevel(report.riskScore || 0)}
        </div>
      </div>

      <div className="card-body">
        <p>
          <strong>Phone:</strong> {report.phoneNumber}
        </p>
        <p>
          <strong>Type:</strong> {report.fraudType}
        </p>
        <p>
          <strong>Description:</strong> {report.description}
        </p>
        <p>
          <strong>Date:</strong> {new Date(report.incidentDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Status:</strong>{' '}
          <span className={`status status-${report.status}`}>{report.status}</span>
        </p>
      </div>

      {(isAdmin || !isAdmin) && (
        <div className="card-actions">
          {isAdmin && report.status === 'pending' && (
            <>
              <button
                className="btn btn-verify"
                onClick={() => onVerify(report._id, 'verified')}
              >
                Verify
              </button>
              <button
                className="btn btn-reject"
                onClick={() => onVerify(report._id, 'rejected')}
              >
                Reject
              </button>
            </>
          )}
          {(isAdmin || report.reportedBy === localStorage.getItem('userId')) && (
            <button className="btn btn-delete" onClick={() => onDelete(report._id)}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default FraudCard;