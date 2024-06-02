import { supabase } from '@/supabaseClient.js';
import { getBoundingBox } from '@/utils.js';
import { NOTES_BOUNDING_RECT_FUNCTION_NAME } from '@/utils/constants.js';
import { fail, json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
  const r = url.searchParams.get("radius")
  const lat = url.searchParams.get("lat")
  const long = url.searchParams.get("long")

  const { minLatitude,
    maxLatitude,
    minLongitude,
    maxLongitude, } = getBoundingBox(lat, long, r)
  const { data, error } = await supabase.rpc(NOTES_BOUNDING_RECT_FUNCTION_NAME, {
    min_lat: minLatitude,
    min_long: minLongitude,
    max_lat: maxLatitude,
    max_long: maxLongitude,
  })
  console.log(error);
  if (error) return fail(error)
  return json({ data })
}