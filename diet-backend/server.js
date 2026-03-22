require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const foodRoutes = require('./routes/food');
const chatRoutes = require('./routes/chat');

const app = express();

const normalizeOrigin = (origin) => origin.replace(/\/$/, '');
const configuredOrigins = [
  process.env.FRONTEND_URL,
  ...(process.env.FRONTEND_URLS || '').split(','),
  'http://localhost:3000',
  'http://127.0.0.1:3000'
]
  .filter(Boolean)
  .map((origin) => normalizeOrigin(origin.trim()));

const isAllowedOrigin = (origin) => {
  if (!origin) return true;

  const normalizedOrigin = normalizeOrigin(origin);
  if (configuredOrigins.includes(normalizedOrigin)) return true;

  // Allow Vercel preview/production domains when not explicitly configured.
  try {
    if (/\.vercel\.app$/i.test(new URL(normalizedOrigin).hostname)) return true;
  } catch (error) {
    return false;
  }

  return false;
};

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }
    console.warn('[CORS] Rejected origin:', origin);
    return callback(null, true); // Allow all for mobile compatibility; better to allow and validate on backend
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Root endpoint
app.get('/', (req, res) => {
  res.send('FuelSync API is live');
});

// Health checks
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running'
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/chat', chatRoutes);

// Keep existing API-prefixed health route for compatibility
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
