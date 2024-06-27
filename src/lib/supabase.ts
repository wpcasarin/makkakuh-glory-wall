import type { Database } from "@lib/types";

import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
