// Skills Roadmap Generator - User Model
// Beautiful user data model with authentication capabilities 🌿

const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/database');

// Define User model
const User = sequelize.define('User', {
  // Primary key
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    comment: 'Unique user identifier'
  },
  
  // Basic user information
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: '🌿 Please enter a valid email address'
      },
      len: {
        args: [5, 255],
        msg: '🌿 Email must be between 5 and 255 characters'
      }
    },
    comment: 'User email address (unique)'
  },
  
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [3, 50],
        msg: '🌿 Username must be between 3 and 50 characters'
      },
      isAlphanumeric: {
        msg: '🌿 Username can only contain letters and numbers'
      }
    },
    comment: 'Unique username for the user'
  },
  
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      len: {
        args: [1, 100],
        msg: '🌿 First name must be between 1 and 100 characters'
      }
    },
    field: 'first_name',
    comment: 'User first name'
  },
  
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      len: {
        args: [1, 100],
        msg: '🌿 Last name must be between 1 and 100 characters'
      }
    },
    field: 'last_name',
    comment: 'User last name'
  },
  
  // Authentication
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      len: {
        args: [8, 255],
        msg: '🌿 Password must be at least 8 characters long'
      }
    },
    comment: 'Hashed user password'
  },
  
  // User preferences and settings
  preferences: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {
      theme: 'cottagecore',
      notifications: true,
      emailUpdates: false,
      defaultCategory: 'Technology'
    },
    comment: 'User preferences and settings'
  },
  
  // User profile information
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: {
        args: [0, 500],
        msg: '🌿 Bio must be less than 500 characters'
      }
    },
    comment: 'User biography or description'
  },
  
  avatarUrl: {
    type: DataTypes.STRING(500),
    allowNull: true,
    validate: {
      isUrl: {
        msg: '🌿 Avatar must be a valid URL'
      }
    },
    field: 'avatar_url',
    comment: 'URL to user avatar image'
  },
  
  // Account status and verification
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_verified',
    comment: 'Whether user email is verified'
  },
  
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active',
    comment: 'Whether user account is active'
  },
  
  verificationToken: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'verification_token',
    comment: 'Token for email verification'
  },
  
  resetPasswordToken: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'reset_password_token',
    comment: 'Token for password reset'
  },
  
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'reset_password_expires',
    comment: 'Password reset token expiration'
  },
  
  // Activity tracking
  lastLoginAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'last_login_at',
    comment: 'Last login timestamp'
  },
  
  loginCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'login_count',
    comment: 'Total number of logins'
  }
}, {
  // Model options
  tableName: 'users',
  indexes: [
    {
      unique: true,
      fields: ['email']
    },
    {
      unique: true,
      fields: ['username']
    },
    {
      fields: ['is_active']
    },
    {
      fields: ['created_at']
    }
  ],
  
  // Hooks for password hashing and other operations
  hooks: {
    // Hash password before creating user
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 12);
      }
    },
    
    // Hash password before updating if it changed
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 12);
      }
    }
  }
});

// ==================== INSTANCE METHODS ====================

// Check password method
User.prototype.checkPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get full name
User.prototype.getFullName = function() {
  return `${this.firstName || ''} ${this.lastName || ''}`.trim() || this.username;
};

// Get user profile data (excluding sensitive information)
User.prototype.getProfile = function() {
  const { password, verificationToken, resetPasswordToken, resetPasswordExpires, ...profile } = this.toJSON();
  return profile;
};

// Update last login
User.prototype.updateLastLogin = async function() {
  this.lastLoginAt = new Date();
  this.loginCount += 1;
  await this.save();
};

// ==================== CLASS METHODS ====================

// Find user by email or username
User.findByEmailOrUsername = async function(identifier) {
  return await User.findOne({
    where: {
      [sequelize.Op.or]: [
        { email: identifier.toLowerCase() },
        { username: identifier.toLowerCase() }
      ]
    }
  });
};

// Create user with validation
User.createUser = async function(userData) {
  const { email, username, password, firstName, lastName } = userData;
  
  // Check if user already exists
  const existingUser = await User.findByEmailOrUsername(email);
  if (existingUser) {
    throw new Error('🌿 User already exists with this email or username');
  }
  
  // Create new user
  return await User.create({
    email: email.toLowerCase(),
    username: username.toLowerCase(),
    password,
    firstName,
    lastName
  });
};

module.exports = User;