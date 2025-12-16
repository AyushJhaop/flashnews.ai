# 📰 NewsFlash.ai

A real-time news aggregation and sentiment analysis platform for stock market traders. NewsFlash.ai provides live news updates, sentiment tracking, and market mood analysis to help traders make informed decisions.

![NewsFlash.ai](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-ISC-green)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-19.2.0-blue)

## ✨ Features

- **🔴 Live News Ticker** - Real-time scrolling news feed with the latest market updates
- **📊 Sentiment Analysis** - AI-powered sentiment scoring for each news article (Positive/Negative/Neutral)
- **📈 Market Mood Gauge** - Visual representation of overall market sentiment
- **💼 Stock Watchlist** - Track sentiment for specific stocks (AAPL, TSLA, NVDA, AMZN)
- **📉 Sentiment Trend Chart** - Historical sentiment data visualization
- **🔐 User Authentication** - Secure login and registration system with JWT
- **⚡ Real-time Updates** - WebSocket-based live data streaming via Socket.IO
- **🎨 Modern UI** - Beautiful, responsive interface built with React and Tailwind CSS
- **🌓 Dark Theme** - Sleek dark mode design optimized for traders

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - Modern UI library
- **Vite 7.2** - Lightning-fast build tool
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Framer Motion 12.23** - Animation library
- **Recharts 3.5** - Data visualization
- **Socket.IO Client 4.8** - Real-time communication
- **Axios 1.13** - HTTP client
- **React Router 7.10** - Client-side routing
- **Lucide React** - Beautiful icon set

### Backend
- **Node.js & Express 5.2** - Server framework
- **MongoDB & Mongoose 9.0** - Database
- **Socket.IO 4.8** - Real-time WebSocket server
- **JWT (jsonwebtoken 9.0)** - Authentication
- **bcryptjs 3.0** - Password hashing
- **dotenv 17.2** - Environment variables
- **CORS 2.8** - Cross-Origin Resource Sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/news-flash.git
cd news-flash
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/news-flash
JWT_SECRET=your_super_secret_jwt_key_change_in_production
```

**Note:** Update `MONGO_URI` if using MongoDB Atlas or a different connection string.

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

### 4. Run the Application

#### Start Backend Server

```bash
cd backend
npm start
```

The backend server will start on `http://localhost:5001`

#### Start Frontend Development Server

Open a new terminal window:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### 5. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 📁 Project Structure

```
news-flash/
├── backend/
│   ├── models/
│   │   ├── News.js          # News article schema
│   │   └── User.js          # User schema
│   ├── routes/
│   │   └── auth.js          # Authentication routes
│   ├── .env                 # Environment variables
│   ├── package.json
│   ├── server.js            # Express server & Socket.IO setup
│   └── simulator.js         # News generation simulator
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/          # Static assets
│   │   ├── components/      # Reusable components
│   │   │   ├── LiveTicker.jsx
│   │   │   ├── SentimentGauge.jsx
│   │   │   └── StockWatchlist.jsx
│   │   ├── landing/
│   │   │   └── LandingPage.jsx
│   │   ├── lib/
│   │   │   └── utils.js     # Utility functions
│   │   ├── pages/
│   │   │   ├── Analytics.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   └── Signup.jsx
│   │   ├── App.jsx          # Main app component
│   │   ├── index.css        # Global styles
│   │   └── main.jsx         # App entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🔑 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user and get JWT token |
| GET | `/api/auth/user` | Get current user (requires auth) |

### WebSocket Events

| Event | Description |
|-------|-------------|
| `news-update` | Receives real-time news updates with sentiment analysis |

## 🎯 Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Dashboard**: View the main dashboard with:
   - Live scrolling news ticker
   - Market mood sentiment gauge
   - Sentiment trend chart
   - Stock watchlist with individual sentiment scores
3. **Real-time Updates**: News automatically streams to your dashboard via WebSocket
4. **Monitor Stocks**: Track sentiment for your watchlist stocks (AAPL, TSLA, NVDA, AMZN)

## 🧪 News Simulator

The backend includes a news simulator that generates realistic market news with sentiment analysis. It covers major tech stocks:
- Apple Inc. (AAPL)
- Tesla Inc. (TSLA)
- Amazon.com (AMZN)
- Alphabet Inc. (GOOGL)
- Microsoft (MSFT)
- Netflix (NFLX)
- NVIDIA (NVDA)

News items are automatically generated with:
- **Positive sentiment** (60-100 score)
- **Negative sentiment** (0-40 score)
- **Neutral sentiment** (40-60 score)

## 🔐 Security

- Passwords are hashed using bcryptjs
- JWT tokens for secure authentication
- Protected routes require valid authentication
- CORS enabled for cross-origin requests

## 🎨 Customization

### Modify Stock Watchlist

Edit `backend/simulator.js` to add/remove stocks:

```javascript
const COMPANIES = [
  { symbol: "YOUR_SYMBOL", name: "Company Name" },
  // Add more companies...
];
```

### Change Theme Colors

Edit `frontend/src/index.css` to customize colors:

```css
:root {
  --color-primary: hsl(217 91% 65%);
  --color-background: hsl(220 25% 8%);
  /* Customize other colors... */
}
```

## 📝 Environment Variables

### Backend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5001 |
| `MONGO_URI` | MongoDB connection string | mongodb://localhost:27017/news-flash |
| `JWT_SECRET` | Secret key for JWT | (required) |

## 🐛 Troubleshooting

### Port Already in Use

If port 5001 or 5173 is already in use:

```bash
# Find and kill the process
lsof -ti:5001 | xargs kill
lsof -ti:5173 | xargs kill
```

Or change the ports in `.env` (backend) and update API URLs in frontend files.

### MongoDB Connection Error

Ensure MongoDB is running:

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Or use MongoDB Atlas and update MONGO_URI in .env
```

### Dependencies Issues

Clear node_modules and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

## 🚧 Future Enhancements

- [ ] Real news API integration (NewsAPI, Alpha Vantage)
- [ ] Advanced sentiment analysis using AI/ML models
- [ ] Email notifications for important news
- [ ] Portfolio tracking and performance analytics
- [ ] Multiple watchlists support
- [ ] User preferences and settings
- [ ] Historical data analysis
- [ ] Mobile app (React Native)
- [ ] Export reports (PDF/CSV)
- [ ] Social features (share insights)

