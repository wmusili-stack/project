// Skills Roadmap Generator - Main Server File
// Beautiful, clean Express.js server with cottagecore vibes in the console logs! 🌿

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Import routes
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/users');
const roadmapRoutes = require('./src/routes/roadmaps');

// Import database connection
const { connectDatabase } = require('./src/config/database');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ==================== MIDDLEWARE SETUP ====================

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration for frontend communication
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware with cozy format
app.use(morgan('combined', {
  // Custom format for that academic journal feel
  format: '🌿 :method :url :status :res[content-length] - :response-time ms'
}));

// Serve static files from frontend (for development)
if (process.env.NODE_ENV !== 'production') {
  app.use(express.static(path.join(__dirname, '../frontend')));
}

// ==================== API ROUTES ====================

// Health check endpoint (with cottagecore flair!)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    message: '🌱 Skills Roadmap Generator API is blooming beautifully!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roadmaps', roadmapRoutes);

// Catch-all handler for SPA (Single Page Application)
app.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
  } else {
    res.json({ 
      message: '🌿 Skills Roadmap Generator API',
      endpoints: [
        'GET /api/health - Server health check',
        'POST /api/auth/register - User registration',
        'POST /api/auth/login - User login',
        'GET /api/users/profile - User profile',
        'GET /api/roadmaps - Get user roadmaps',
        'POST /api/roadmaps - Create new roadmap',
        'PUT /api/roadmaps/:id - Update roadmap progress'
      ]
    });
  }
});

// ==================== ERROR HANDLING ====================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '🍃 Endpoint not found in our learning garden',
    path: req.path
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('🚨 Server Error:', error);
  
  res.status(error.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? '🌧️ Something went wrong in our garden' 
      : error.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: error.stack })
  });
});

// ==================== SERVER STARTUP ====================

async function startServer() {
  try {
    // Connect to database first
    await connectDatabase();
    console.log('🌱 Database connection established successfully');
    
    // Start the server
    app.listen(PORT, () => {
      console.log('');
      console.log('🌿✨ SKILLS ROADMAP GENERATOR SERVER ✨🌿');
      console.log(`📚 Server running on port ${PORT}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`💡 API endpoints available at: http://localhost:${PORT}/api`);
      console.log(`🎨 Frontend served at: http://localhost:${PORT}`);
      console.log('🌱 Ready to help users grow their skills!');
      console.log('');
    });
    
  } catch (error) {
    console.error('🚨 Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('🌙 Gracefully shutting down server...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🌙 Gracefully shutting down server...');
  process.exit(0);
});

// Start the server
startServer();