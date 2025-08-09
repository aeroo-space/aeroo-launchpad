import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

declare global {
  interface Window {
    __SUPABASE_URL__?: string;
    __SUPABASE_ANON_KEY__?: string;
  }
}

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = window.__SUPABASE_URL__;
  const key = window.__SUPABASE_ANON_KEY__;

  if (!url || !key) {
    throw new Error(
      "Supabase не сконфигурирован. Убедитесь, что проект подключён к Supabase (зелёная кнопка вверху) и перезагрузите страницу."
    );
  }

  client = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return client;
}
