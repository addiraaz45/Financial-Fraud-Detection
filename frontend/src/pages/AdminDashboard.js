// import React, { useState, useEffect } from 'react';
// import { fraudAPI } from '../utils/api';
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';
// import FraudCard from '../components/FraudCard';
// import '../App.css';
// import './AdminDashboard.css';

// function AdminDashboard() {
//   const [analytics, setAnalytics] = useState(null);
//   const [allReports, setAllReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [activeTab, setActiveTab] = useState('overview');
//   const [statusFilter, setStatusFilter] = useState('');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const analyticsRes = await fraudAPI.getAnalytics();
//       setAnalytics(analyticsRes.data.data);

//       const reportsRes = await fraudAPI.getAllReports();
//       setAllReports(reportsRes.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerify = async (id, status) => {
//     try {
//       await fraudAPI.verifyReport(id, { status, severity: 3 });
//       fetchData();
//     } catch (err) {
//       setError('Failed to update report');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this report?')) {
//       try {
//         await fraudAPI.deleteReport(id);
//         fetchData();
//       } catch (err) {
//         setError('Failed to delete report');
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="container">
//         <div className="loading">
//           <div className="loading-spinner"></div>
//           <p>Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   const filteredReports = statusFilter
//     ? allReports.filter((r) => r.status === statusFilter)
//     : allReports;

//   return (
//     <div className="container admin-dashboard">
//       <h1 className="page-title">Admin Dashboard</h1>

//       {error && <div className="error-message">{error}</div>}

//       <div className="admin-tabs">
//         <button
//           className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
//           onClick={() => setActiveTab('overview')}
//         >
//           Overview
//         </button>
//         <button
//           className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
//           onClick={() => setActiveTab('reports')}
//         >
//           All Reports
//         </button>
//       </div>

//       {activeTab === 'overview' && analytics && (
//         <div>
//           <div className="stats-grid">
//             <div className="stat-box">
//               <div className="stat-value">{analytics.totalReports}</div>
//               <div className="stat-title">Total Reports</div>
//             </div>
//             <div className="stat-box">
//               <div className="stat-value">{analytics.verifiedReports}</div>
//               <div className="stat-title">Verified</div>
//             </div>
//             <div className="stat-box">
//               <div className="stat-value">{analytics.pendingReports}</div>
//               <div className="stat-title">Pending</div>
//             </div>
//           </div>

//           <div className="charts-container">
//             <div className="chart-box">
//               <h3>Daily Reports (Last 30 Days)</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={analytics.dailyReports}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="_id" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="count" stroke="#3498db" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             <div className="chart-box">
//               <h3>Fraud Types Distribution</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={analytics.fraudTypes}
//                     dataKey="count"
//                     nameKey="_id"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={100}
//                   >
//                     <Cell fill="#3498db" />
//                     <Cell fill="#2ecc71" />
//                     <Cell fill="#f39c12" />
//                     <Cell fill="#e74c3c" />
//                     <Cell fill="#9b59b6" />
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             <div className="chart-box">
//               <h3>Top Reported Phone Numbers</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={analytics.topPhones}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="_id" angle={-45} textAnchor="end" height={100} />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#27ae60" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             <div className="chart-box">
//               <h3>Top Reported UPI IDs</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={analytics.topUPIs}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="_id" angle={-45} textAnchor="end" height={100} />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#e74c3c" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       )}

//       {activeTab === 'reports' && (
//         <div>
//           <div className="filter-section">
//             <label>Filter by Status:</label>
//             <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//               <option value="">All Reports</option>
//               <option value="pending">Pending</option>
//               <option value="verified">Verified</option>
//               <option value="rejected">Rejected</option>
//             </select>
//           </div>

//           <h3 style={{ marginBottom: '1rem' }}>
//             Showing {filteredReports.length} report(s)
//           </h3>

//           {filteredReports.length === 0 ? (
//             <div className="empty-state">
//               <p>No reports found</p>
//             </div>
//           ) : (
//             filteredReports.map((report) => (
//               <FraudCard
//                 key={report._id}
//                 report={report}
//                 onDelete={handleDelete}
//                 onVerify={handleVerify}
//                 isAdmin={true}
//               />
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminDashboard;





import React, { useState, useEffect } from 'react';
import { fraudAPI } from '../utils/api';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import FraudCard from '../components/FraudCard';
import '../styles/App.css';
import '../styles/AdminDashboard.css';

function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [allReports, setAllReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const analyticsRes = await fraudAPI.getAnalytics();
      setAnalytics(analyticsRes.data.data);

      const reportsRes = await fraudAPI.getAllReports();
      setAllReports(reportsRes.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id, status) => {
    try {
      await fraudAPI.verifyReport(id, { status, severity: 3 });
      fetchData();
    } catch (err) {
      setError('Failed to update report');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        await fraudAPI.deleteReport(id);
        fetchData();
      } catch (err) {
        setError('Failed to delete report');
      }
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const filteredReports = statusFilter
    ? allReports.filter((r) => r.status === statusFilter)
    : allReports;

  return (
    <div className="container admin-dashboard">
      <h1 className="page-title">Admin Dashboard</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          All Reports
        </button>
      </div>

      {activeTab === 'overview' && analytics && (
        <div>
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-value">{analytics.totalReports}</div>
              <div className="stat-title">Total Reports</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{analytics.verifiedReports}</div>
              <div className="stat-title">Verified</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{analytics.pendingReports}</div>
              <div className="stat-title">Pending</div>
            </div>
          </div>

          <div className="charts-container">
            <div className="chart-box">
              <h3>Daily Reports (Last 30 Days)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.dailyReports}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#3498db" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-box">
              <h3>Fraud Types Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.fraudTypes}
                    dataKey="count"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                  >
                    <Cell fill="#3498db" />
                    <Cell fill="#2ecc71" />
                    <Cell fill="#f39c12" />
                    <Cell fill="#e74c3c" />
                    <Cell fill="#9b59b6" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-box">
              <h3>Top Reported Phone Numbers</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.topPhones}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#27ae60" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-box">
              <h3>Top Reported UPI IDs</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.topUPIs}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#e74c3c" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div>
          <div className="filter-section">
            <label>Filter by Status:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Reports</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <h3 style={{ marginBottom: '1rem' }}>
            Showing {filteredReports.length} report(s)
          </h3>

          {filteredReports.length === 0 ? (
            <div className="empty-state">
              <p>No reports found</p>
            </div>
          ) : (
            filteredReports.map((report) => (
              <FraudCard
                key={report._id}
                report={report}
                onDelete={handleDelete}
                onVerify={handleVerify}
                isAdmin={true}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;