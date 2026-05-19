# AI-Based Smart Complaint Management System

A full-stack MERN (MongoDB, Express, React, Node.js) application designed for efficient complaint management with built-in rule-based AI analysis for automatic urgency detection and department assignment.

## Features

- **User Authentication**: Secure JWT-based login and signup using bcrypt for password hashing.
- **Complaint Management**: Users can register, view, and search complaints by location or category.
- **Admin Dashboard**: View all complaints, update status (Pending, In Progress, Resolved).
- **Rule-Based AI Analysis**: Analyzes complaint title and description to determine urgency (High/Medium/Low), suggest the responsible department, and generate an automatic response.
- **Modern UI**: Fully responsive and beautiful UI built with React, Tailwind CSS, and Lucide React icons.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router DOM, Axios, Vite
- **Backend**: Node.js, Express.js, MongoDB Atlas, Mongoose, JWT
- **AI Logic**: Custom rule-based logic without paid APIs

## Installation & Local Setup

### 1. Clone & Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory based on `.env.example`:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:
```bash
npm run dev
# or
node server.js
```

### 2. Setup Frontend

```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`.

## Deployment on Render

### Backend Deployment
1. Go to [Render](https://render.com/) and create a new **Web Service**.
2. Connect your GitHub repository.
3. Select the `backend` folder as the root directory.
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add Environment Variables (`MONGO_URI`, `JWT_SECRET`).
7. Deploy.

### Frontend Deployment
1. Create a new **Static Site** on Render.
2. Select the `frontend` folder as the root directory.
3. Build Command: `npm run build`
4. Publish Directory: `dist`
5. Wait for the deployment to complete.
*(Make sure to update the `API_URL` in `frontend/src/services/api.js` to your deployed backend URL before pushing to GitHub).*

## Screenshots for Exam Submission
*(Add screenshots here)*
- [x] Login Page Placeholder
- [x] Dashboard Placeholder
- [x] Register Complaint Placeholder
- [x] AI Analysis Placeholder
