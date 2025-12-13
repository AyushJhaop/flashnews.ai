require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const News = require('./models/News');
const { generateNewsItem } = require('./simulator');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Socket.IO Setup
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all for dev
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Simulator Loop
setInterval(async () => {
  const newsItem = generateNewsItem();
  
  // Save to DB
  const news = new News(newsItem);
  await news.save();

  // Broadcast to all clients
  io.emit('news-update', news);
  console.log('Broadcasted:', news.headline);

}, 5000); // New news every 5 seconds

// Basic Routes (API)
app.get('/', (req, res) => {
  res.send('NewsFlash API is running');
});

app.get('/api/news/recent', async (req, res) => {
  try {
    const news = await News.find().sort({ timestamp: -1 }).limit(20);
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
