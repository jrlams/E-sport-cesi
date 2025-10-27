import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Registration {
  id?: string;
  email: string;
  pseudo: string;
  team_name?: string;
  game: string;
  phone?: string;
  created_at?: string;
  confirmed?: boolean;
}

export interface Feedback {
  id?: string;
  email: string;
  rating: number;
  organization_rating: number;
  gameplay_rating: number;
  venue_rating: number;
  comments?: string;
  would_participate_again?: boolean;
  created_at?: string;
}
