-- Create symptom_entries table for tracking user symptom triage
CREATE TABLE symptom_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  main_symptom TEXT NOT NULL,
  duration TEXT NOT NULL,
  severity INTEGER NOT NULL CHECK (severity >= 1 AND severity <= 10),
  associated_symptoms TEXT[] DEFAULT '{}',
  age_range TEXT,
  medical_conditions TEXT[] DEFAULT '{}',
  urgency_verdict TEXT NOT NULL CHECK (urgency_verdict IN ('GO_NOW', 'SEE_THIS_WEEK', 'MONITOR_HOME')),
  confidence_percentage INTEGER NOT NULL CHECK (confidence_percentage >= 0 AND confidence_percentage <= 100),
  reasoning TEXT NOT NULL,
  citations JSONB DEFAULT '[]',
  care_options JSONB DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'RESOLVED', 'WORSING', 'STABLE')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE symptom_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since we're not implementing auth for this demo)
CREATE POLICY "select_symptom_entries" ON symptom_entries FOR SELECT USING (true);
CREATE POLICY "insert_symptom_entries" ON symptom_entries FOR INSERT WITH CHECK (true);
CREATE POLICY "update_symptom_entries" ON symptom_entries FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "delete_symptom_entries" ON symptom_entries FOR DELETE USING (true);

-- Create index for faster queries
CREATE INDEX idx_symptom_entries_created_at ON symptom_entries(created_at DESC);