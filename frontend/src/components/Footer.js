import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2 className="footer-logo">FraudGuard</h2>
          <p className="footer-text">
            A secure platform to report, analyze, and detect financial fraud.
            Protecting users with intelligent insights.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Navigation</h3>
          <ul className="footer-links">
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/report">Report Fraud</a></li>
            <li><a href="/search">Search Fraud</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Support</h3>
          <ul className="footer-links">
            <li>Email: support@fraudguard.com</li>
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} FraudGuard — All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
