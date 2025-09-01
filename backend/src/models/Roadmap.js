// Skills Roadmap Generator - Roadmap Model
// Beautiful roadmap data model for storing learning paths 🌿📚

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Define Roadmap model
const Roadmap = sequelize.define('Roadmap', {
  // Primary key
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    comment: 'Unique roadmap identifier'
  },
  
  // Foreign key to User
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    field: 'user_id',
    comment: 'ID of the user who owns this roadmap'
  },
  
  // Roadmap basic information
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      len: {
        args: [1, 200],
        msg: '🌿 Roadmap title must be between 1 and 200 characters'
      }
    },
    comment: 'Title of the roadmap'
  },
  
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: {
        args: [0, 1000],
        msg: '🌿 Description must be less than 1000 characters'
      }
    },
    comment: 'Detailed description of the roadmap'
  },
  
  category: {
    type: DataTypes.ENUM(
      'Technology',
      'Creative',
      'Business',
      'Health & Wellness',
      'Academic',
      'Lifestyle',
      'Custom'
    ),
    allowNull: false,
    defaultValue: 'Technology',
    comment: 'Category of the skill roadmap'
  },
  
  // Roadmap metadata
  skillName: {
    type: DataTypes.STRING(150),
    allowNull: false,
    field: 'skill_name',
    comment: 'Name of the skill this roadmap teaches'
  },
  
  icon: {
    type: DataTypes.STRING(10),
    allowNull: true,
    defaultValue: '📚',
    comment: 'Emoji icon for the roadmap'
  },
  
  difficultyLevel: {
    type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert'),
    allowNull: false,
    defaultValue: 'Beginner',
    field: 'difficulty_level',
    comment: 'Overall difficulty level of the roadmap'
  },
  
  estimatedDuration: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'estimated_duration',
    comment: 'Estimated time to complete (e.g., "3 months", "6 weeks")'
  },
  
  // Roadmap content - stored as JSON
  steps: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: [],
    validate: {
      isValidSteps(value) {
        if (!Array.isArray(value) || value.length === 0) {
          throw new Error('🌿 Roadmap must have at least one step');
        }
        
        // Validate each step structure
        value.forEach((step, index) => {
          if (!step.title || typeof step.title !== 'string') {
            throw new Error(`🌿 Step ${index + 1} must have a valid title`);
          }
          if (!step.description || typeof step.description !== 'string') {
            throw new Error(`🌿 Step ${index + 1} must have a valid description`);
          }
          if (!step.resources || !Array.isArray(step.resources)) {
            throw new Error(`🌿 Step ${index + 1} must have a resources array`);
          }
        });
      }
    },
    comment: 'Array of learning steps with titles, descriptions, and resources'
  },
  
  // Roadmap settings and preferences
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_public',
    comment: 'Whether this roadmap is publicly visible'
  },
  
  isTemplate: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_template',
    comment: 'Whether this is a template that others can use'
  },
  
  allowComments: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'allow_comments',
    comment: 'Whether comments are allowed on this roadmap'
  },
  
  // Analytics and engagement
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Number of times this roadmap has been viewed'
  },
  
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Number of likes this roadmap has received'
  },
  
  completions: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Number of times this roadmap has been completed'
  },
  
  // Source information
  source: {
    type: DataTypes.ENUM('user_created', 'ai_generated', 'template', 'imported'),
    allowNull: false,
    defaultValue: 'user_created',
    comment: 'How this roadmap was created'
  },
  
  sourceData: {
    type: DataTypes.JSONB,
    allowNull: true,
    field: 'source_data',
    comment: 'Additional data about roadmap source (AI prompts, import info, etc.)'
  },
  
  // Status and lifecycle
  status: {
    type: DataTypes.ENUM('draft', 'published', 'archived', 'deleted'),
    allowNull: false,
    defaultValue: 'draft',
    comment: 'Current status of the roadmap'
  },
  
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'published_at',
    comment: 'When the roadmap was published'
  },
  
  archivedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'archived_at',
    comment: 'When the roadmap was archived'
  }
}, {
  // Model options
  tableName: 'roadmaps',
  indexes: [
    {
      fields: ['user_id']
    },
    {
      fields: ['category']
    },
    {
      fields: ['difficulty_level']
    },
    {
      fields: ['is_public']
    },
    {
      fields: ['status']
    },
    {
      fields: ['created_at']
    },
    {
      fields: ['skill_name']
    }
  ],
  
  // Hooks
  hooks: {
    beforeCreate: (roadmap) => {
      // Set published date if status is published
      if (roadmap.status === 'published' && !roadmap.publishedAt) {
        roadmap.publishedAt = new Date();
      }
    },
    
    beforeUpdate: (roadmap) => {
      // Set published date if status changed to published
      if (roadmap.changed('status') && roadmap.status === 'published' && !roadmap.publishedAt) {
        roadmap.publishedAt = new Date();
      }
      
      // Set archived date if status changed to archived
      if (roadmap.changed('status') && roadmap.status === 'archived' && !roadmap.archivedAt) {
        roadmap.archivedAt = new Date();
      }
    }
  }
});

// ==================== INSTANCE METHODS ====================

// Get roadmap progress for a specific user
Roadmap.prototype.getProgressForUser = async function(userId) {
  const Progress = require('./Progress');
  
  const progress = await Progress.findOne({
    where: {
      roadmapId: this.id,
      userId: userId
    }
  });
  
  return progress ? progress.stepProgress : [];
};

// Calculate completion percentage
Roadmap.prototype.calculateCompletion = function(stepProgress = []) {
  if (!this.steps || this.steps.length === 0) return 0;
  
  const completedSteps = stepProgress.filter(step => step === true).length;
  return Math.round((completedSteps / this.steps.length) * 100);
};

// Get public data (excluding sensitive information)
Roadmap.prototype.getPublicData = function() {
  const { userId, sourceData, ...publicData } = this.toJSON();
  return publicData;
};

// Increment views
Roadmap.prototype.incrementViews = async function() {
  this.views += 1;
  await this.save();
};

// ==================== CLASS METHODS ====================

// Find roadmaps by category
Roadmap.findByCategory = async function(category, options = {}) {
  return await Roadmap.findAll({
    where: {
      category,
      status: 'published',
      isPublic: true
    },
    order: [['createdAt', 'DESC']],
    ...options
  });
};

// Find popular roadmaps
Roadmap.findPopular = async function(limit = 10) {
  return await Roadmap.findAll({
    where: {
      status: 'published',
      isPublic: true
    },
    order: [
      ['views', 'DESC'],
      ['likes', 'DESC'],
      ['completions', 'DESC']
    ],
    limit
  });
};

// Search roadmaps
Roadmap.search = async function(query, options = {}) {
  const { Op } = require('sequelize');
  
  return await Roadmap.findAll({
    where: {
      [Op.and]: [
        {
          status: 'published',
          isPublic: true
        },
        {
          [Op.or]: [
            { title: { [Op.iLike]: `%${query}%` } },
            { description: { [Op.iLike]: `%${query}%` } },
            { skillName: { [Op.iLike]: `%${query}%` } }
          ]
        }
      ]
    },
    order: [['views', 'DESC']],
    ...options
  });
};

module.exports = Roadmap;