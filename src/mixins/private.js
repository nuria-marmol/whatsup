import supabase from '@/mixins/supabase.js'

export default {
    // Este mixin tiene el mixin de supabase dentro
    mixins: [supabase],
    methods: {
        checkLogin: async function () {
            // ? para decirle que el aud es opcional
            if (await this.supabase.auth.user()?.aud !== 'authenticated') {
                this.$router.push({name: 'login'});
            }
        }
    },
    mounted() {
        this.checkLogin();
    }
}