// Skills Roadmap Generator - Progress Model
// Beautiful progress tracking model for user learning journey 🌿📈

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Define Progress model
const Progress = sequelize.define('Progress', {
  // Primary key
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    comment: 'Unique progress record identifier'
  },
  
  // Foreign keys
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
    comment: 'ID of the user tracking progress'
  },
  
  roadmapId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'roadmaps',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    field: 'roadmap_id',
    comment: 'ID of the roadmap being tracked'
  },
  
  // Progress data
  stepProgress: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: [],
    field: 'step_progress',
    comment: 'Array of boolean values indicating step completion',
    validate: {
      isArray(value) {
        if (!Array.isArray(value)) {
          throw new Error('🌿 Step progress must be an array');
        }
      }
    }
  },
  
  completedSteps: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'completed_steps',
    comment: 'Number of completed steps'
  },
  
  totalSteps: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'total_steps',
    comment: 'Total number of steps in the roadmap'
  },
  
  completionPercentage: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0.00,
    field: 'completion_percentage',
    comment: 'Percentage of roadmap completed (0-100)'
  },
  
  // Status and milestones
  status: {
    type: DataTypes.ENUM('not_started', 'in_progress', 'completed', 'paused'),
    allowNull: false,
    defaultValue: 'not_started',
    comment: 'Current status of progress'
  },
  
  startedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'started_at',
    comment: 'When user started this roadmap'
  },
  
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'completed_at',
    comment: 'When user completed this roadmap'
  },
  
  pausedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'paused_at',
    comment: 'When user paused this roadmap'
  },
  
  // Time tracking
  timeSpent: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'time_spent',
    comment: 'Total time spent in minutes'
  },
  
  estimatedTimeRemaining: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'estimated_time_remaining',
    comment: 'Estimated time remaining in minutes'
  },
  
  // User notes and reflections
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'User notes about their progress'
  },
  
  stepNotes: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {},
    field: 'step_notes',
    comment: 'Notes for individual steps (step_index: note)'
  },
  
  // Learning preferences and customizations
  preferences: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {
      reminderFrequency: 'weekly',
      studyGoalPerWeek: 5, // hours
      preferredStudyTime: 'evening'
    },
    comment: 'User preferences for this roadmap'
  },
  
  // Achievement and motivation
  streak: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Current study streak in days'
  },
  
  longestStreak: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'longest_streak',
    comment: 'Longest study streak achieved'
  },
  
  lastStudyDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    field: 'last_study_date',
    comment: 'Last date user made progress'
  },
  
  // Difficulty and adaptation
  difficultyRating: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: true,
    field: 'difficulty_rating',
    comment: 'User-rated difficulty (1-5)',
    validate: {
      min: 1,
      max: 5
    }
  },
  
  stepDifficulties: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {},
    field: 'step_difficulties',
    comment: 'User-rated difficulty for each step'
  },
  
  // Social and sharing
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_public',
    comment: 'Whether progress is publicly visible'
  },
  
  shareWithFriends: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'share_with_friends',
    comment: 'Whether to share progress with friends'
  }
}, {
  // Model options
  tableName: 'progress',
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'roadmap_id'],
      name: 'unique_user_roadmap_progress'
    },
    {
      fields: ['user_id']
    },
    {
      fields: ['roadmap_id']
    },
    {
      fields: ['status']
    },
    {
      fields: ['completion_percentage']
    },
    {
      fields: ['last_study_date']
    }
  ],
  
  // Hooks for automatic calculations
  hooks: {
    beforeSave: async (progress) => {
      // Update status based on progress
      if (progress.completionPercentage === 100) {
        progress.status = 'completed';
        if (!progress.completedAt) {
          progress.completedAt = new Date();
        }
      } else if (progress.completionPercentage > 0) {
        if (progress.status === 'not_started') {
          progress.status = 'in_progress';
          if (!progress.startedAt) {
            progress.startedAt = new Date();
          }
        }
      }
      
      // Update study streak
      const today = new Date().toISOString().split('T')[0];
      const lastStudy = progress.lastStudyDate;
      
      if (progress.changed('stepProgress')) {
        if (!lastStudy || lastStudy !== today) {
          // Check if it's consecutive day
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          
          if (lastStudy === yesterdayStr) {
            progress.streak += 1;
          } else if (!lastStudy || lastStudy !== yesterdayStr) {
            progress.streak = 1; // Reset streak
          }
          
          // Update longest streak
          if (progress.streak > progress.longestStreak) {
            progress.longestStreak = progress.streak;
          }
          
          progress.lastStudyDate = today;
        }
      }
    }
  }
});

// ==================== INSTANCE METHODS ====================

// Update step completion
Progress.prototype.updateStepCompletion = async function(stepIndex, completed) {
  const stepProgress = [...(this.stepProgress || [])];
  
  // Ensure array is long enough
  while (stepProgress.length <= stepIndex) {
    stepProgress.push(false);
  }
  
  stepProgress[stepIndex] = completed;
  this.stepProgress = stepProgress;
  
  await this.save();
  return this;
};

// Add study time
Progress.prototype.addStudyTime = async function(minutes) {
  this.timeSpent += minutes;
  await this.save();
  return this;
};

// Add note to specific step
Progress.prototype.addStepNote = async function(stepIndex, note) {
  const stepNotes = { ...(this.stepNotes || {}) };
  stepNotes[stepIndex] = note;
  this.stepNotes = stepNotes;
  await this.save();
  return this;
};

// Get learning statistics
Progress.prototype.getStats = function() {
  return {
    completionPercentage: this.completionPercentage,
    completedSteps: this.completedSteps,
    totalSteps: this.totalSteps,
    timeSpent: this.timeSpent,
    streak: this.streak,
    longestStreak: this.longestStreak,
    status: this.status,
    startedAt: this.startedAt,
    completedAt: this.completedAt
  };
};

// ==================== CLASS METHODS ====================

// Find or create progress for user and roadmap
Progress.findOrCreateForUser = async function(userId, roadmapId, roadmapSteps = []) {
  let progress = await Progress.findOne({
    where: {
      userId,
      roadmapId
    }
  });
  
  if (!progress) {
    progress = await Progress.create({
      userId,
      roadmapId,
      stepProgress: new Array(roadmapSteps.length).fill(false),
      totalSteps: roadmapSteps.length
    });
  }
  
  return progress;
};

// Get user's active roadmaps
Progress.getActiveRoadmapsForUser = async function(userId) {
  const Roadmap = require('./Roadmap');
  
  return await Progress.findAll({
    where: {
      userId,
      status: ['in_progress', 'not_started']
    },
    include: [{
      model: Roadmap,
      as: 'roadmap'
    }],
    order: [['updatedAt', 'DESC']]
  });
};

// Get user's learning statistics
Progress.getUserStats = async function(userId) {
  const { Op, fn, col } = require('sequelize');
  
  const stats = await Progress.findAll({
    where: { userId },
    attributes: [
      [fn('COUNT', col('id')), 'totalRoadmaps'],
      [fn('SUM', col('completed_steps')), 'totalCompletedSteps'],
      [fn('AVG', col('completion_percentage')), 'averageCompletion'],
      [fn('SUM', col('time_spent')), 'totalTimeSpent'],
      [fn('MAX', col('longest_streak')), 'bestStreak']
    ],
    raw: true
  });
  
  return stats[0] || {
    totalRoadmaps: 0,
    totalCompletedSteps: 0,
    averageCompletion: 0,
    totalTimeSpent: 0,
    bestStreak: 0
  };
};

module.exports = Progress;