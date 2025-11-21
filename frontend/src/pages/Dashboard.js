
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fraudAPI } from '../utils/api';
import FraudCard from '../components/FraudCard';
import '../styles/App.css';
import '../styles/Dashboard.css';

function Dashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserReports();
  }, []);

  const fetchUserReports = async () => {
    try {
      const response = await fraudAPI.getUserReports();
      setReports(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        await fraudAPI.deleteReport(id);
        setReports(reports.filter((r) => r._id !== id));
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
          <p>Loading your reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">My Dashboard</h1>

      <div className="dashboard-actions">
        <Link to="/report" className="action-btn btn-report">
          Report Fraud
        </Link>
        <Link to="/search" className="action-btn btn-search">
          Search Fraud
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{reports.length}</div>
          <div className="stat-label">Total Reports</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {reports.filter((r) => r.status === 'pending').length}
          </div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {reports.filter((r) => r.status === 'verified').length}
          </div>
          <div className="stat-label">Verified</div>
        </div>
      </div>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Your Reports</h2>

      {reports.length === 0 ? (
        <div className="empty-state">
          <p>You haven't submitted any fraud reports yet.</p>
          <Link to="/report" className="action-btn btn-report">
            Submit Your First Report
          </Link>
        </div>
      ) : (
        reports.map((report) => (
          <FraudCard
            key={report._id}
            report={report}
            onDelete={handleDelete}
            isAdmin={false}
          />
        ))
      )}
    </div>
  );
}

export default Dashboard;