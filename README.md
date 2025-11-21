🛡️ FraudGuard

A simple and powerful financial fraud detection system where users can report frauds and check if a phone number or UPI ID is suspicious or safe. Includes JWT authentication, role-based access, fraud reporting, fraud search, and admin verification tools.

🚀 Features
🔐 Authentication

User Signup & Login (JWT based)

Admin Login (role = admin)

Protected API routes

🔎 Fraud Detection

Search phone number or UPI ID

Displays:

SAFE (no fraud report found)
FRAUD (reported before)
Count of how many times reported

📝 Fraud Reporting

Users can report fraud with:

Name
Phone number
UPI ID
Description

🧑‍💼 Admin Panel

View all fraud reports
Verify reports
Delete fraud entries
View analytics (total reports, categories, daily stats)

📊 Dashboard

Shows:

Total Reports
Verified Reports
Pending Reports
Safe vs Fraud results

🛠️ Tech Stack
Frontend

React.js
React Router
Simple CSS
Context API (Token Handling)

Backend

Node.js
Express.js
MongoDB + Mongoose
JWT Authentication
Role-based access middleware


🖥️ Backend Setup (Node + Express)
Install Dependencies
cd server
npm run dev

Create .env File
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000

Run Backend
npm run dev


🌐 Frontend Setup (React)
Install Dependencies
cd client
npm run dev


Run Frontend
npm start
