// Skills Roadmap Generator - Database Configuration
// Beautiful PostgreSQL connection with Sequelize ORM 🌿

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Database connection configuration
const config = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'skills_roadmap_db',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: 'postgres',
  
  // Connection pool configuration for better performance
  pool: {
    max: 10,          // Maximum number of connections
    min: 0,           // Minimum number of connections
    acquire: 30000,   // Maximum time to get connection before timeout
    idle: 10000       // Maximum idle time before releasing connection
  },
  
  // Logging configuration (with cottagecore vibes!)
  logging: process.env.NODE_ENV === 'development' 
    ? (msg) => console.log('🌱 Database Query:', msg)
    : false,
    
  // SSL configuration for production databases
  dialectOptions: {
    ssl: process.env.DB_SSL === 'true' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  },
  
  // Timezone configuration
  timezone: '+00:00', // Use UTC
  
  // Model configuration
  define: {
    // Use snake_case for database columns
    underscored: true,
    // Add createdAt and updatedAt timestamps
    timestamps: true,
    // Prevent Sequelize from pluralizing table names
    freezeTableName: false,
    // Use camelCase for model attributes
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
};

// Create Sequelize instance
let sequelize;

if (process.env.DATABASE_URL) {
  // Use DATABASE_URL if available (common for hosted databases)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    ...config,
    dialectOptions: {
      ...config.dialectOptions,
      // Additional options for hosted databases
      ...(process.env.NODE_ENV === 'production' && {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      })
    }
  });
} else {
  // Use individual connection parameters
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Test database connection
async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log('🌱 PostgreSQL connection established successfully');
    
    // Sync models in development (creates tables if they don't exist)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('📚 Database models synchronized');
    }
    
    return sequelize;
  } catch (error) {
    console.error('🚨 Unable to connect to PostgreSQL database:', error);
    throw error;
  }
}

// Graceful database disconnection
async function disconnectDatabase() {
  try {
    await sequelize.close();
    console.log('🌙 Database connection closed gracefully');
  } catch (error) {
    console.error('⚠️  Error closing database connection:', error);
  }
}

// Export database instance and utilities
module.exports = {
  sequelize,
  connectDatabase,
  disconnectDatabase,
  
  // Export Sequelize types for model definitions
  DataTypes: Sequelize.DataTypes,
  Op: Sequelize.Op,
  
  // Database utilities
  transaction: sequelize.transaction.bind(sequelize),
  query: sequelize.query.bind(sequelize)
};