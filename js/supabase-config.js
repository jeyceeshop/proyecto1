// Completa estos campos únicamente con la URL y la clave pública de navegador.
export const supabaseConfig = {
  url: '',
  clavePublica: '',
};

export async function conectarSupabase() {
  if (!supabaseConfig.url || !supabaseConfig.clavePublica) return null;

  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
  return createClient(supabaseConfig.url, supabaseConfig.clavePublica);
}
