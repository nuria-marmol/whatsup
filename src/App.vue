<template>
  <main>
    <router-view></router-view>
    <nav>
      <ul>
        <li>
          <router-link :to=" { name: 'home' } ">Home</router-link>
        </li>
        <li>
          <router-link :to=" { name: 'search' } ">Buscar</router-link>
        </li>
        <li>
          <custom-button
          text="Salir"
          @do-click="logout"
          />
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
    }
  }
}
</script>