import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cjvojeenqvkspgkqjftz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqdm9qZWVucXZrc3Bna3FqZnR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NjQwODgsImV4cCI6MjA3NjE0MDA4OH0.vKfggHu5V0mxD23IK9_d3OcwlqEznUZHGWBG6-zO3iQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
