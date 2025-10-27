-- Create the database
CREATE DATABASE esport_event;
GO

-- Use the new database
USE esport_event;
GO

-- Create registrations table
CREATE TABLE registrations (
  id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  email NVARCHAR(255) UNIQUE NOT NULL,
  pseudo NVARCHAR(255) NOT NULL,
  team_name NVARCHAR(255),
  game NVARCHAR(255) NOT NULL,
  phone NVARCHAR(50),
  created_at DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET(),
  confirmed BIT DEFAULT 0
);
GO

-- Create feedback table
CREATE TABLE feedback (
  id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  email NVARCHAR(255) NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  organization_rating INT NOT NULL CHECK (organization_rating >= 1 AND organization_rating <= 5),
  gameplay_rating INT NOT NULL CHECK (gameplay_rating >= 1 AND gameplay_rating <= 5),
  venue_rating INT NOT NULL CHECK (venue_rating >= 1 AND venue_rating <= 5),
  comments NVARCHAR(MAX),
  would_participate_again BIT DEFAULT 1,
  created_at DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET()
);
GO

-- Create indexes for better query performance
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_game ON registrations(game);
CREATE INDEX idx_registrations_created_at ON registrations(created_at DESC);
CREATE INDEX idx_feedback_created_at ON feedback(created_at DESC);
GO
