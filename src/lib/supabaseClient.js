import { SUPABASE_API_TOKEN, SUPABASE_DOMAIN, SUPABASE_SCHEMA } from '$env/static/private'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(SUPABASE_DOMAIN, SUPABASE_API_TOKEN, {db: {schema: SUPABASE_SCHEMA} })