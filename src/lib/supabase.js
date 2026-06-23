import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabaseConfig'

// Indica si ya se han rellenado las claves reales (no los placeholders).
export const isSupabaseConfigured =
  Boolean(SUPABASE_URL && SUPABASE_ANON_KEY) &&
  !SUPABASE_URL.startsWith('TU_') &&
  !SUPABASE_ANON_KEY.startsWith('TU_')

// Si no hay config, creamos un cliente "vacío" que no se llega a usar
// (la app muestra una pantalla de aviso). Evita que el build falle.
export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : createClient('https://placeholder.supabase.co', 'placeholder-anon-key')
