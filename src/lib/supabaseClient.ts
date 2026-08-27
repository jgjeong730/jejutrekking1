import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Progress sync is optional — if the env vars aren't set (e.g. a fork without
// its own Supabase project), the app should still work fully offline via
// localStorage, just without cross-device sharing.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
