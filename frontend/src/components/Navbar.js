
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';
import { FaUser } from "react-icons/fa";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
       <img src="/logo.png" style={{width:"120px", borderRadius:"20px"}} alt="App Logo" />

        </Link>

        <ul className="navbar-menu">
          {!user ? (
            <>
              <li className='nav-btn-primary'>
                <Link to="/login">Login</Link>
              </li>
              <li className='nav-signup-btn-primary'>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          ) : (
            <>
              <li className='btn-primary'>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              {user.role === 'admin' && (
                <li  className='btn-primary'>
                  <Link to="/admin">Admin</Link>
                </li>
              )}
              <li>
                <span style={{color:"#0d1b2a"}}> <span><FaUser /></span>  &nbsp;{user.name}</span> &nbsp;
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;