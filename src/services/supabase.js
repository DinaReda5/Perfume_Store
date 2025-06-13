import { createClient } from "@supabase/supabase-js";

const supabaseURL = 'https://nhjgkcacnuwlhvtrarac.supabase.co';
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oamdrY2FjbnV3bGh2dHJhcmFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3NzI4MzAsImV4cCI6MjA2NDM0ODgzMH0.5w8ox-dFvCSkNlF3qYocTxKd3VAGleU49HmH5Odo2uw";

const supabase = createClient(supabaseURL, supabaseKey);

export default supabase;
