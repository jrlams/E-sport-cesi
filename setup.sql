-- Create registrations table
-- The database is created automatically by the postgres container via environment variables.
-- We connect to it directly, so no 'CREATE DATABASE' or 'USE' commands are needed here.

CREATE TABLE registrations (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  pseudo VARCHAR(255) NOT NULL,
  team_name VARCHAR(255),
  game VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed BOOLEAN DEFAULT FALSE
);

-- Create feedback table
CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  organization_rating INT NOT NULL CHECK (organization_rating >= 1 AND organization_rating <= 5),
  gameplay_rating INT NOT NULL CHECK (gameplay_rating >= 1 AND gameplay_rating <= 5),
  venue_rating INT NOT NULL CHECK (venue_rating >= 1 AND venue_rating <= 5),
  comments TEXT,
  would_participate_again BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_game ON registrations(game);
CREATE INDEX idx_registrations_created_at ON registrations(created_at DESC);
CREATE INDEX idx_feedback_created_at ON feedback(created_at DESC);

-- Create settings table
CREATE TABLE settings (
  key VARCHAR(255) PRIMARY KEY,
  value TEXT NOT NULL
);

-- Insert default stream URL
INSERT INTO settings (key, value) VALUES ('stream_url', 'https://www.twitch.tv/cesi_esport');
