import { createClient } from '@supabase/supabase-js'

export default {
  data() {
    return {
      supabase: undefined
    }
  },
  mounted() {
    // Create a single supabase client for interacting with your database
    this.supabase = createClient(process.env.VUE_APP_URL_API, process.env.VUE_APP_KEY_PUBLIC);
  }
}