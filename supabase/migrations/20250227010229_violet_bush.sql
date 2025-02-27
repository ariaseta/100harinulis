/*
  # Create profiles table and auth schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users.id)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)
      - `full_name` (text)
      - `avatar_url` (text)
      - `linkedin_id` (text)
      - `linkedin_url` (text)
      - `current_day` (integer)
      - `longest_streak` (integer)
      - `current_streak` (integer)
      - `last_post_date` (timestamp with time zone)
  
  2. Security
    - Enable RLS on `profiles` table
    - Add policies for authenticated users to read and update their own data
    - Add policy for public to read basic profile data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ,
  full_name TEXT,
  avatar_url TEXT,
  linkedin_id TEXT,
  linkedin_url TEXT,
  current_day INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  last_post_date TIMESTAMPTZ
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Public can view basic profile information"
  ON profiles
  FOR SELECT
  TO anon
  USING (true);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();