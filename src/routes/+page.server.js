import { supabase } from "$lib/supabaseClient";
import { getBoundingBox } from "@/utils.js";
import { NOTES_BOUNDING_RECT_FUNCTION_NAME, NOTES_TABLE_NAME } from "@/utils/constants";
import { fail } from "@sveltejs/kit";
import { toast } from "svelte-sonner";

export const actions = {
	addMessageOnLocation: async ({request}) => {
    const data = await request.formData();
		const message = data.get('message');
		const long = data.get('long');
		const lat = data.get('lat');

    const {a, error} = await supabase.from("notes").insert({message, location: `POINT(${long} ${lat})`})
    
    if(error) return fail(500, error)
    
    return {a}
  },
};