-- Skills Roadmap Generator - Progress Table Migration
-- Beautiful progress tracking with streaks and achievements 🌿📈

-- Create progress status ENUM
CREATE TYPE progress_status AS ENUM (
    'not_started',
    'in_progress',
    'completed',
    'paused'
);

-- Create progress table
CREATE TABLE IF NOT EXISTS progress (
    -- Primary identification
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Foreign keys
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    roadmap_id UUID NOT NULL REFERENCES roadmaps(id) ON DELETE CASCADE ON UPDATE CASCADE,
    
    -- Progress tracking
    step_progress JSONB NOT NULL DEFAULT '[]'::jsonb,
    completed_steps INTEGER DEFAULT 0,
    total_steps INTEGER DEFAULT 0,
    completion_percentage DECIMAL(5,2) DEFAULT 0.00,
    
    -- Status and milestones
    status progress_status NOT NULL DEFAULT 'not_started',
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    paused_at TIMESTAMP WITH TIME ZONE,
    
    -- Time tracking
    time_spent INTEGER DEFAULT 0, -- in minutes
    estimated_time_remaining INTEGER,
    
    -- User notes and reflections
    notes TEXT,
    step_notes JSONB DEFAULT '{}'::jsonb,
    
    -- Learning preferences
    preferences JSONB DEFAULT '{
        "reminderFrequency": "weekly",
        "studyGoalPerWeek": 5,
        "preferredStudyTime": "evening"
    }'::jsonb,
    
    -- Achievement and motivation tracking
    streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_study_date DATE,
    
    -- User feedback
    difficulty_rating DECIMAL(2,1) CHECK (difficulty_rating >= 1 AND difficulty_rating <= 5),
    step_difficulties JSONB DEFAULT '{}'::jsonb,
    
    -- Social features
    is_public BOOLEAN DEFAULT FALSE,
    share_with_friends BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT unique_user_roadmap UNIQUE(user_id, roadmap_id),
    CONSTRAINT valid_completion CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    CONSTRAINT valid_steps CHECK (completed_steps >= 0 AND completed_steps <= total_steps),
    CONSTRAINT valid_time_spent CHECK (time_spent >= 0),
    CONSTRAINT valid_streak CHECK (streak >= 0 AND longest_streak >= 0)
);

-- Create indexes for optimal performance
CREATE INDEX idx_progress_user_id ON progress(user_id);
CREATE INDEX idx_progress_roadmap_id ON progress(roadmap_id);
CREATE INDEX idx_progress_status ON progress(status);
CREATE INDEX idx_progress_completion ON progress(completion_percentage DESC);
CREATE INDEX idx_progress_last_study ON progress(last_study_date DESC);
CREATE INDEX idx_progress_streak ON progress(streak DESC);

-- Composite indexes for common queries
CREATE INDEX idx_progress_user_status ON progress(user_id, status);
CREATE INDEX idx_progress_user_completion ON progress(user_id, completion_percentage);
CREATE INDEX idx_progress_active_roadmaps ON progress(user_id, status) WHERE status IN ('not_started', 'in_progress');

-- Create trigger for automatic updated_at timestamp
CREATE TRIGGER update_progress_updated_at 
    BEFORE UPDATE ON progress 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create function to automatically update completion metrics
CREATE OR REPLACE FUNCTION update_progress_metrics()
RETURNS TRIGGER AS $$
BEGIN
    -- Calculate completion metrics when step_progress changes
    IF OLD.step_progress IS DISTINCT FROM NEW.step_progress THEN
        NEW.completed_steps = (
            SELECT COUNT(*)
            FROM jsonb_array_elements_text(NEW.step_progress) AS step(value)
            WHERE step.value::boolean = TRUE
        );
        
        NEW.total_steps = jsonb_array_length(NEW.step_progress);
        
        IF NEW.total_steps > 0 THEN
            NEW.completion_percentage = ROUND((NEW.completed_steps::decimal / NEW.total_steps) * 100, 2);
        ELSE
            NEW.completion_percentage = 0;
        END IF;
        
        -- Update status based on completion
        IF NEW.completion_percentage = 100 THEN
            NEW.status = 'completed';
            IF NEW.completed_at IS NULL THEN
                NEW.completed_at = CURRENT_TIMESTAMP;
            END IF;
        ELSIF NEW.completion_percentage > 0 THEN
            IF OLD.status = 'not_started' THEN
                NEW.status = 'in_progress';
                IF NEW.started_at IS NULL THEN
                    NEW.started_at = CURRENT_TIMESTAMP;
                END IF;
            END IF;
        END IF;
        
        -- Update study streak
        IF CURRENT_DATE != COALESCE(OLD.last_study_date, '1900-01-01'::date) THEN
            IF OLD.last_study_date = CURRENT_DATE - INTERVAL '1 day' THEN
                -- Consecutive day - increment streak
                NEW.streak = OLD.streak + 1;
            ELSE
                -- Not consecutive - reset streak
                NEW.streak = 1;
            END IF;
            
            -- Update longest streak if current is better
            IF NEW.streak > OLD.longest_streak THEN
                NEW.longest_streak = NEW.streak;
            END IF;
            
            NEW.last_study_date = CURRENT_DATE;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for automatic progress calculations
CREATE TRIGGER update_progress_metrics_trigger
    BEFORE UPDATE ON progress
    FOR EACH ROW
    EXECUTE FUNCTION update_progress_metrics();

-- Add helpful comments
COMMENT ON TABLE progress IS 'User progress tracking for roadmaps';
COMMENT ON COLUMN progress.step_progress IS 'Array of boolean values indicating step completion';
COMMENT ON COLUMN progress.streak IS 'Current consecutive study streak in days';
COMMENT ON COLUMN progress.time_spent IS 'Total study time in minutes';
COMMENT ON COLUMN progress.preferences IS 'User learning preferences for this roadmap';