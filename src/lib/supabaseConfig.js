// Configuración pública de Supabase.
//
// La "anon key" de Supabase está pensada para ir en el cliente (es pública);
// la seguridad real la da el Row Level Security (RLS) de la base de datos,
// que sólo deja a cada usuario ver y editar sus propias filas.
//
// 👉 Rellena estos dos valores con los de tu proyecto:
//    Supabase → Project Settings → Data API (o API):
//      - "Project URL"  ->  SUPABASE_URL
//      - "anon public"  ->  SUPABASE_ANON_KEY

export const SUPABASE_URL = 'TU_SUPABASE_URL'
export const SUPABASE_ANON_KEY = 'TU_SUPABASE_ANON_KEY'
