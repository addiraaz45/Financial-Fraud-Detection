# Fraud Detection System - Backend

## Setup Instructions

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment Variables
Create a \`.env\` file in the backend folder:
\`\`\`
MONGODB_URI=mongodb://localhost:27017/fraud-detection
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
PORT=5000
\`\`\`

### 3. Run the Server
\`\`\`bash
npm run dev
\`\`\`

Server will run on http://localhost:5000

## API Endpoints

### Authentication
- POST /api/auth/signup - Register a new user
- POST /api/auth/login - Login user

### Fraud Reporting
- POST /api/fraud/report - Submit fraud report (protected)
- GET /api/fraud/search?phone=1234567890&upi=user@upi - Search fraud
- GET /api/fraud/user/reports - Get user's reports (protected)

### Admin Only
- GET /api/fraud/all - Get all fraud reports
- DELETE /api/fraud/:id - Delete report
- PUT /api/fraud/verify/:id - Verify/Reject report
- GET /api/fraud/analytics/data - Get analytics data

## Database Models

### User
- name, email, phone, password (hashed), role (user/admin)

### FraudReport
- reportedBy (User ID), phone, upiId, fraudType, description, incidentDate, amount, status, severity

### AdminLog
- admin (User ID), action, fraudReportId, description
