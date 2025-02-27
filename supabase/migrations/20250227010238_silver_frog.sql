/*
  # Create posts table for tracking user posts

  1. New Tables
    - `posts`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with time zone)
      - `user_id` (uuid, references profiles.id)
      - `post_url` (text)
      - `day_number` (integer)
      - `likes_count` (integer)
      - `comments_count` (integer)
      - `title` (text)
  
  2. Security
    - Enable RLS on `posts` table
    - Add policies for authenticated users to read and create their own posts
    - Add policy for public to read posts
*/

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  post_url TEXT NOT NULL,
  day_number INTEGER NOT NULL,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  title TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS posts_user_id_idx ON posts (user_id);
CREATE INDEX IF NOT EXISTS posts_day_number_idx ON posts (day_number);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own posts"
  ON posts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own posts"
  ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts"
  ON posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public can view posts"
  ON posts
  FOR SELECT
  TO anon
  USING (true);