/*
  # Create app settings table with login method controls
  
  1. New Tables
    - `app_settings`
      - `id` (uuid, primary key)
      - `linkedin_login_enabled` (boolean)
      - `email_login_enabled` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Changes
    - Add `is_admin` column to profiles table
  
  3. Security
    - Enable RLS on `app_settings` table
    - Add policy for anyone to read settings
    - Add policy for admin users to update settings
*/

-- First, add is_admin column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Create app_settings table
CREATE TABLE IF NOT EXISTS app_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  linkedin_login_enabled BOOLEAN DEFAULT true,
  email_login_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read app settings"
  ON app_settings
  FOR SELECT
  USING (true);

CREATE POLICY "Only admins can update app settings"
  ON app_settings
  FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM profiles WHERE is_admin = true));

-- Insert default settings
INSERT INTO app_settings (linkedin_login_enabled, email_login_enabled)
VALUES (true, true)
ON CONFLICT DO NOTHING;