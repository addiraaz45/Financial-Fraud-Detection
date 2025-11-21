import React, { useState } from 'react';
import { fraudAPI } from '../utils/api';
import '../styles/App.css';

function ReportFraud() {
  const [formData, setFormData] = useState({
    phone: '',
    upiId: '',
    fraudType: 'scam',
    description: '',
    incidentDate: '',
    amount: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await fraudAPI.reportFraud(formData);
      setSuccess('Fraud report submitted successfully!');
      setFormData({
        phone: '',
        upiId: '',
        fraudType: 'scam',
        description: '',
        incidentDate: '',
        amount: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Report Fraud</h1>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Phone Number (10 digits)*</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              required
              placeholder="9876543210"
            />
          </div>

          <div className="form-group">
            <label>UPI ID*</label>
            <input
              type="text"
              name="upiId"
              value={formData.upiId}
              onChange={handleChange}
              required
              placeholder="user@upi"
            />
          </div>

          <div className="form-group">
            <label>Fraud Type*</label>
            <select name="fraudType" value={formData.fraudType} onChange={handleChange}>
              <option value="scam">Scam</option>
              <option value="spam">Spam</option>
              <option value="harassment">Harassment</option>
              <option value="unauthorized_transaction">Unauthorized Transaction</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description*</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe the fraud incident..."
              rows="5"
            />
          </div>

          <div className="form-group">
            <label>Date of Incident*</label>
            <input
              type="date"
              name="incidentDate"
              value={formData.incidentDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Amount (Optional)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportFraud;
