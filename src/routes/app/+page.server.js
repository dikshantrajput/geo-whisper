import { supabase } from "$lib/supabaseClient";
import { fail } from "@sveltejs/kit";

export const actions = {
  addMessageOnLocation: async ({ request }) => {
    const formData = await request.formData();
    const message = formData.get('message');
    const long = formData.get('long');
    const lat = formData.get('lat');

    const { data, error } = await supabase.from("notes").insert({ message, location: `POINT(${long} ${lat})` })

    if (error) return fail(500, error)

    return { data }
  },
};