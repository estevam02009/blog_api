const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

// Middleware
app.use(cors());

// Update CORS configuration - move this before routes
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Blog API' });
});

// Remove duplicate CORS configuration
// app.use(cors({ ... })); // Remove this

// Start server
const PORT = process.env.PORT || 3001; // Change default port to 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});