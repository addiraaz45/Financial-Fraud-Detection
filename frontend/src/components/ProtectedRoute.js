// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// function ProtectedRoute({ children, requiredRole = null }) {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
//   }

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   if (requiredRole && user.role !== requiredRole) {
//     return <Navigate to="/dashboard" />;
//   }

//   return children;
// }

// export default ProtectedRoute;



import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, requiredRole = null }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default ProtectedRoute;