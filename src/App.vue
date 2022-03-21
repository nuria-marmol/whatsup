<template>
  <main>
    <router-view></router-view>
    <nav>
      <ul>
        <li v-if="$store.state.isLogin">
          <router-link :to=" { name: 'home' } ">Home</router-link>
        </li>
        <li v-if="$store.state.isLogin">
          <router-link :to=" { name: 'search' } ">Buscar</router-link>
        </li>
        <li>
          <custom-button
              v-if="$store.state.isLogin"
            text="Salir"
            @do-click="logout"
          />
          <router-link
              v-else
              :to="{ 'name': 'login' }"
          >Login</router-link>
        </li>
      </ul>
    </nav>
  </main>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
import customButton from "@/components/CustomButton";
import supabase from "@/mixins/supabase.js";
import privateLogin from "@/mixins/private.js";

export default {
  components: {
    customButton
  },
  mixins: [supabase, privateLogin],
  methods: {
    logout: async function() {
      await this.supabase.auth.signOut();
      this.checkLogin();
      // Lo tenemos en la carpeta store
      this.$store.state.isLogin = false;
    }
  },
  mounted: async function() {
    // Miramos si está logeado al cargar la pág. Usamos la función de private
    this.$store.state.isLogin = await this.isLogin();
  }
}
</script>