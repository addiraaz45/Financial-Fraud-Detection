# FraudGuard Frontend

## Setup Instructions

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment
Create a \`.env\` file in the frontend folder:
\`\`\`
REACT_APP_API_URL=http://localhost:5000/api
\`\`\`

### 3. Start Development Server
\`\`\`bash
npm start
\`\`\`

The app will open at http://localhost:3000

## Features

### User Features
- User authentication (Signup/Login)
- Report fraud with phone number and UPI ID
- Search fraud database to check if a number/UPI is flagged
- View personal fraud reports
- Track report status (Pending/Verified/Rejected)
- Risk scoring system

### Admin Features
- View all fraud reports
- Verify or reject reports
- Delete reports
- Analytics dashboard with charts:
  - Daily fraud trends
  - Fraud type distribution
  - Most reported phone numbers
  - Most reported UPI IDs
- Filter reports by status

## Pages

- **Home** (/) - Landing page
- **Login** (/login) - User login
- **Signup** (/signup) - User registration
- **Dashboard** (/dashboard) - User dashboard with their reports
- **Report Fraud** (/report) - Submit fraud report
- **Search Fraud** (/search) - Search fraud database
- **Admin Dashboard** (/admin) - Admin analytics and management

## Architecture

- **State Management**: React Context API for authentication
- **API Communication**: Axios with JWT token management
- **UI Components**: Custom React components
- **Charts**: Recharts for data visualization
- **Styling**: CSS with responsive design

## Security Features

- JWT-based authentication
- Role-based access control (User/Admin)
- Password hashing on backend
- Protected routes
- Token stored in localStorage

## Dependencies

- react: React framework
- react-router-dom: Routing
- axios: HTTP client
- recharts: Charts library

\`\`\`
