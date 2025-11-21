import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Home.css";
import { FaMobile } from "react-icons/fa";
import { FaMagnifyingGlassChart } from "react-icons/fa6";
import { TbPresentationAnalyticsFilled } from "react-icons/tb";
import { MdOutlineSecurity } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BsShieldFillCheck } from "react-icons/bs";
import { MdOutlineVerified } from "react-icons/md";

function Home() {
  const { user } = useAuth();

  return (
    <div className="home">
      {/* HERO SECTION */}
      <section
        className="hero"
      >
        <div className="hero-content">
          <h1>Welcome to FraudGuard</h1>
          <p>Your trusted platform for secure fraud reporting & detection</p>

          {!user ? (
            <div className="hero-buttons">
              <Link to="/signup" className="btn-large btn-primary">
                Get Started
              </Link>
              <Link to="/login" className="btn-large btn-secondary">
                Login
              </Link>
            </div>
          ) : (
            <div className="hero-buttons">
              <Link
                to="/dashboard"
                style={{ background: "#fff", color: "#2A2A2A" }}
                className="btn-large btn-secondary"
              >
                Dashboard
              </Link>
              <Link
                to="/report"
                className="btn-large btn-secondary"
                onMouseEnter={(e) => (e.target.style.color = "#2A2A2A")}
                onMouseLeave={(e) => (e.target.style.color = "#fff")}
              >
                Report
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Why Choose FraudGuard?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaMobile />
            </div>
            <h3>Report Fraud Easily</h3>
            <p>Submit suspicious phone or UPI IDs in seconds.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaMagnifyingGlassChart />
            </div>
            <h3>Smart Detection</h3>
            <p>
              Get instant risk scoring & fraud history powered by analytics.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <TbPresentationAnalyticsFilled />
            </div>
            <h3>Advanced Analytics</h3>
            <p>
              Admins get insights into nationwide fraud patterns and trends.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <MdOutlineSecurity />
            </div>
            <h3>Community Protection</h3>
            <p>Join thousands in strengthening India’s digital safety.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <h2>How FraudGuard Works</h2>

        <div className="steps-container">
          <div className="step-card">
            <FaCheckCircle className="step-icon" />
            <h3>1. Report</h3>
            <p>Share details of suspicious calls, UPI IDs, or numbers.</p>
          </div>

          <div className="step-card">
            <MdOutlineVerified className="step-icon" />
            <h3>2. Verify</h3>
            <p>Our system analyzes data and checks for fraud patterns.</p>
          </div>

          <div className="step-card">
            <BsShieldFillCheck className="step-icon" />
            <h3>3. Protect</h3>
            <p>Your report helps alert and protect thousands of users.</p>
          </div>
        </div>
      </section>

      {/* TRUSTED STATS */}
      <section className="trusted-stats">
        <h2>Trusted by Users Across India</h2>

        <div className="stats-grid">
          <div className="stat">
            <h3>10,000+</h3>
            <p>Fraud Reports Submitted</p>
          </div>

          <div className="stat">
            <h3>5,000+</h3>
            <p>Numbers Flagged</p>
          </div>

          <div className="stat">
            <h3>98%</h3>
            <p>User Satisfaction</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Take Control of Your Digital Safety</h2>
        <p>Join our community and help reduce online fraud.</p>

        {!user && (
          <Link to="/signup" className="btn-large btn-primary">
            Sign Up Now
          </Link>
        )}
      </section>
    </div>
  );
}

export default Home;
