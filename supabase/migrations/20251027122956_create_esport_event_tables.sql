/*
  # Create E-Sport Event Tables

  ## Overview
  This migration creates the database schema for the CESI E-Sport Event platform.
  It includes tables for managing event registrations and collecting participant feedback.

  ## New Tables

  ### 1. registrations
  Stores participant registration data for the e-sport tournament.
  
  **Columns:**
  - `id` (uuid, primary key) - Unique identifier for each registration
  - `email` (text, unique, required) - Participant's email address
  - `pseudo` (text, required) - Gaming username/nickname
  - `team_name` (text, optional) - Name of the participant's team
  - `game` (text, required) - Selected game for competition
  - `phone` (text, optional) - Contact phone number
  - `created_at` (timestamptz) - Registration timestamp
  - `confirmed` (boolean) - Registration confirmation status

  ### 2. feedback
  Collects post-event feedback and ratings from participants.
  
  **Columns:**
  - `id` (uuid, primary key) - Unique identifier for each feedback entry
  - `email` (text, required) - Participant's email address
  - `rating` (integer, required) - Overall event rating (1-5)
  - `organization_rating` (integer, required) - Organization quality rating (1-5)
  - `gameplay_rating` (integer, required) - Gameplay experience rating (1-5)
  - `venue_rating` (integer, required) - Venue quality rating (1-5)
  - `comments` (text, optional) - Additional comments and suggestions
  - `would_participate_again` (boolean) - Willingness to attend future events
  - `created_at` (timestamptz) - Feedback submission timestamp

  ## Security
  
  ### Row Level Security (RLS)
  - RLS is enabled on both tables
  - Public can insert registrations and feedback (no authentication required for event participation)
  - Only authenticated admin users can read/manage data
  
  ## Important Notes
  - All timestamp fields use `now()` as default value
  - Email validation should be handled at application level
  - Ratings are constrained to 1-5 range
*/

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  pseudo text NOT NULL,
  team_name text,
  game text NOT NULL,
  phone text,
  created_at timestamptz DEFAULT now(),
  confirmed boolean DEFAULT false
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  organization_rating integer NOT NULL CHECK (organization_rating >= 1 AND organization_rating <= 5),
  gameplay_rating integer NOT NULL CHECK (gameplay_rating >= 1 AND gameplay_rating <= 5),
  venue_rating integer NOT NULL CHECK (venue_rating >= 1 AND venue_rating <= 5),
  comments text,
  would_participate_again boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert registrations (public event)
CREATE POLICY "Anyone can register for the event"
  ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Anyone can submit feedback (public event)
CREATE POLICY "Anyone can submit feedback"
  ON feedback
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users can read registrations
CREATE POLICY "Authenticated users can view registrations"
  ON registrations
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can read feedback
CREATE POLICY "Authenticated users can view feedback"
  ON feedback
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_game ON registrations(game);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);