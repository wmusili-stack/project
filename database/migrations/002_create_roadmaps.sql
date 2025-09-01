-- Skills Roadmap Generator - Roadmaps Table Migration
-- Beautiful roadmaps table for storing learning paths 🌿📚

-- Create custom ENUM types
CREATE TYPE roadmap_category AS ENUM (
    'Technology',
    'Creative', 
    'Business',
    'Health & Wellness',
    'Academic',
    'Lifestyle',
    'Custom'
);

CREATE TYPE difficulty_level AS ENUM (
    'Beginner',
    'Intermediate', 
    'Advanced',
    'Expert'
);

CREATE TYPE roadmap_status AS ENUM (
    'draft',
    'published',
    'archived',
    'deleted'
);

CREATE TYPE roadmap_source AS ENUM (
    'user_created',
    'ai_generated',
    'template',
    'imported'
);

-- Create roadmaps table
CREATE TABLE IF NOT EXISTS roadmaps (
    -- Primary identification
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Foreign key to users
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    
    -- Basic roadmap information
    title VARCHAR(200) NOT NULL,
    description TEXT CHECK (length(description) <= 1000),
    category roadmap_category NOT NULL DEFAULT 'Technology',
    skill_name VARCHAR(150) NOT NULL,
    icon VARCHAR(10) DEFAULT '📚',
    
    -- Difficulty and duration
    difficulty_level difficulty_level NOT NULL DEFAULT 'Beginner',
    estimated_duration VARCHAR(50),
    
    -- Roadmap content (stored as JSON for flexibility)
    steps JSONB NOT NULL DEFAULT '[]'::jsonb,
    
    -- Roadmap settings
    is_public BOOLEAN DEFAULT FALSE,
    is_template BOOLEAN DEFAULT FALSE,
    allow_comments BOOLEAN DEFAULT TRUE,
    
    -- Analytics and engagement
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    completions INTEGER DEFAULT 0,
    
    -- Source and metadata
    source roadmap_source NOT NULL DEFAULT 'user_created',
    source_data JSONB,
    
    -- Status and lifecycle
    status roadmap_status NOT NULL DEFAULT 'draft',
    published_at TIMESTAMP WITH TIME ZONE,
    archived_at TIMESTAMP WITH TIME ZONE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT valid_steps CHECK (jsonb_array_length(steps) > 0),
    CONSTRAINT valid_views CHECK (views >= 0),
    CONSTRAINT valid_likes CHECK (likes >= 0),
    CONSTRAINT valid_completions CHECK (completions >= 0)
);

-- Create indexes for optimal query performance
CREATE INDEX idx_roadmaps_user_id ON roadmaps(user_id);
CREATE INDEX idx_roadmaps_category ON roadmaps(category);
CREATE INDEX idx_roadmaps_difficulty ON roadmaps(difficulty_level);
CREATE INDEX idx_roadmaps_skill_name ON roadmaps(skill_name);
CREATE INDEX idx_roadmaps_is_public ON roadmaps(is_public);
CREATE INDEX idx_roadmaps_status ON roadmaps(status);
CREATE INDEX idx_roadmaps_created_at ON roadmaps(created_at);
CREATE INDEX idx_roadmaps_views ON roadmaps(views DESC);
CREATE INDEX idx_roadmaps_likes ON roadmaps(likes DESC);

-- Create composite indexes for common queries
CREATE INDEX idx_roadmaps_public_category ON roadmaps(is_public, category) WHERE is_public = TRUE;
CREATE INDEX idx_roadmaps_user_status ON roadmaps(user_id, status);

-- Full-text search index for roadmap content
CREATE INDEX idx_roadmaps_search ON roadmaps USING gin(to_tsvector('english', title || ' ' || description || ' ' || skill_name));

-- Create trigger for automatic updated_at timestamp
CREATE TRIGGER update_roadmaps_updated_at 
    BEFORE UPDATE ON roadmaps 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add helpful comments
COMMENT ON TABLE roadmaps IS 'Learning roadmaps created by users';
COMMENT ON COLUMN roadmaps.id IS 'Unique roadmap identifier (UUID)';
COMMENT ON COLUMN roadmaps.steps IS 'Array of learning steps with titles, descriptions, and resources (JSON)';
COMMENT ON COLUMN roadmaps.source IS 'How this roadmap was created (user, AI, template, etc.)';
COMMENT ON COLUMN roadmaps.views IS 'Number of times this roadmap has been viewed';
COMMENT ON COLUMN roadmaps.is_public IS 'Whether this roadmap is visible to other users';