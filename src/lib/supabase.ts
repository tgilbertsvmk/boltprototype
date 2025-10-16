import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UserProfile {
  id: string;
  role: string;
  industry: string;
  use_case: string;
  team_type: string;
  created_at: string;
  updated_at: string;
}

export interface Survey {
  id: string;
  user_id: string;
  title: string;
  status: 'draft' | 'deployed' | 'archived';
  personalization_signals: Record<string, string>;
  created_at: string;
  updated_at: string;
  deployed_at: string | null;
}

export interface Question {
  id: string;
  survey_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'text_entry' | 'dropdown';
  options: string[];
  order_index: number;
  ai_generated: boolean;
  created_at: string;
  updated_at: string;
}
