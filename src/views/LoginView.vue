<template>
  <div class="login">
    <h1>Identifícate</h1>
    <form>
      <CustomInput
          label="Email"
          placeholder="Tu correo"
          type="email"
          v-model="email"
      />
      <CustomInput
          label="Contraseña"
          placeholder="Tu contraseña"
          type="password"
          v-model="password"
      />
      <CustomButton
          @do-click="login"
          type="submit"
          text="Entrar"
      />
    </form>
    <p>¿Todavía no tienes cuenta? <router-link :to="{ 'name': 'signup' }">Regístrate</router-link>.</p>
  </div>
</template>

<script>
// Importamos el componente del input y el botón
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
// Importamos barra de progreso
import NProgress from "nprogress"
// Supabase
import supabase from "@/mixins/supabase.js"

export default {
  name: 'LoginView',
  mixins: [supabase],
  components: {
    CustomInput,
    CustomButton
  },
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    login: async function() {
      NProgress.start();
      const { user, session, error } = await this.supabase.auth.signIn({
        email: this.email,
        password: this.password,
      })
      if (user === null) {
        // Supabase devuelve un error
        alert(error.message)
      } else {
        // Una vez logeado, te lleva a la home
        this.$router.push({name: 'home'})
        // Pasamos el login a true
        this.$store.state.isLogin = true;
      }
      NProgress.done();
      return session;
    }
  },
  mounted() {
    // Alerta si te has registrado
    if (this.$route.query.signup) {
      alert("Estás registrado");
    }
  }
}
</script>
