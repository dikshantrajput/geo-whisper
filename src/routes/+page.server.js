import { supabase } from "$lib/supabaseClient";

export async function load() {
  const { data } = await supabase.from("test").select();
  return {
    countries: data ?? [],
  };
}