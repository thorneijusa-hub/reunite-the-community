// supabase.js


import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://bbtccnxitrnhvpxfyppf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJidGNjbnhpdHJuaHZweGZ5cHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2Mjk2MzYsImV4cCI6MjA3ODIwNTYzNn0.G6KRDi_ArLsO-2drE_BVFKqA0B6s0dstpde0PyzaWBE' // From Supabase dashboard

export const supabase = createClient(supabaseUrl, supabaseAnonKey)