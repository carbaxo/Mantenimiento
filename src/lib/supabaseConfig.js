// Configuración pública de Supabase.
//
// La "anon key" de Supabase está pensada para ir en el cliente (es pública);
// la seguridad real la da el Row Level Security (RLS) de la base de datos,
// que sólo deja a cada usuario ver y editar sus propias filas.
//
// Valores del proyecto (Supabase → Project Settings → API):
//   - "Project URL"        ->  SUPABASE_URL
//   - "Publishable key"    ->  SUPABASE_ANON_KEY  (formato sb_publishable_...)

export const SUPABASE_URL = 'https://onvwceahzjohctovmnsl.supabase.co'
export const SUPABASE_ANON_KEY = 'sb_publishable_Q-eHL5aPAeBYPHq2Ml2kcA_aRCtcGPG'
