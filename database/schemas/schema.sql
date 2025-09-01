-- Skills Roadmap Generator - Complete Database Schema
-- Beautiful, well-organized database structure 🌿📚

-- ==================== EXTENSIONS ====================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For better text search

-- ==================== CUSTOM TYPES ====================

-- Roadmap categories
CREATE TYPE roadmap_category AS ENUM (
    'Technology',
    'Creative', 
    'Business',
    'Health & Wellness',
    'Academic',
    'Lifestyle',
    'Custom'
);

-- Difficulty levels
CREATE TYPE difficulty_level AS ENUM (
    'Beginner',
    'Intermediate', 
    'Advanced',
    'Expert'
);

-- Roadmap status
CREATE TYPE roadmap_status AS ENUM (
    'draft',
    'published',
    'archived',
    'deleted'
);

-- Progress status
CREATE TYPE progress_status AS ENUM (
    'not_started',
    'in_progress',
    'completed',
    'paused'
);

-- Roadmap source
CREATE TYPE roadmap_source AS ENUM (
    'user_created',
    'ai_generated',
    'template',
    'imported'
);

-- ==================== RELATIONSHIPS OVERVIEW ====================

/*
Database Relationships:

1. Users (1) → Roadmaps (Many)
   - One user can create multiple roadmaps
   - Each roadmap belongs to one user

2. Users (1) → Progress (Many) 
   - One user can have progress on multiple roadmaps
   - Each progress record belongs to one user

3. Roadmaps (1) → Progress (Many)
   - One roadmap can be tracked by multiple users
   - Each progress record tracks one roadmap

4. Future relationships (for later features):
   - Users → Followers (Many-to-Many)
   - Roadmaps → Comments (One-to-Many)
   - Roadmaps → Tags (Many-to-Many)
   - Users → Achievements (One-to-Many)
*/

-- ==================== INDEXES SUMMARY ====================

/*
Performance Indexes Created:

Users:
- email (unique)
- username (unique) 
- is_active
- created_at
- last_login_at

Roadmaps:
- user_id
- category
- difficulty_level
- skill_name
- is_public
- status
- created_at
- views (DESC)
- likes (DESC)
- Full-text search on title + description + skill_name

Progress:
- user_id
- roadmap_id
- user_id + roadmap_id (unique)
- status
- completion_percentage (DESC)
- last_study_date (DESC)
- streak (DESC)
*/

-- ==================== SAMPLE QUERIES ====================

/*
Common Queries This Schema Supports:

1. Get user's active roadmaps:
   SELECT r.* FROM roadmaps r 
   JOIN progress p ON r.id = p.roadmap_id 
   WHERE p.user_id = ? AND p.status IN ('not_started', 'in_progress');

2. Find popular public roadmaps:
   SELECT * FROM roadmaps 
   WHERE is_public = TRUE AND status = 'published'
   ORDER BY views DESC, likes DESC;

3. Search roadmaps by text:
   SELECT * FROM roadmaps 
   WHERE to_tsvector('english', title || ' ' || description || ' ' || skill_name) 
   @@ plainto_tsquery('english', ?);

4. Get user learning statistics:
   SELECT 
     COUNT(*) as total_roadmaps,
     SUM(completed_steps) as total_completed_steps,
     AVG(completion_percentage) as avg_completion,
     SUM(time_spent) as total_time_spent,
     MAX(longest_streak) as best_streak
   FROM progress WHERE user_id = ?;

5. Find users with highest streaks:
   SELECT u.username, p.longest_streak 
   FROM users u JOIN progress p ON u.id = p.user_id
   ORDER BY p.longest_streak DESC;
*/