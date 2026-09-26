import { createClient } from '@supabase/supabase-js'
import conf from "../conf/conf"

const supabaseUrl = conf.supabaseUrl
const supabasePublishableKey = conf.supabasePublishKey

export const supabase = createClient(supabaseUrl, supabasePublishableKey)
