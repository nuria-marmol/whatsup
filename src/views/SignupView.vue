<template>
  <div class="signup">
    <h1>Registro</h1>
    <section>
      <form class="signup__form">
        <!-- El componente que hemos creado. Para la mayoría NO usamos : porque será contenido fijo. Cuando sea true mostrará el mensaje de error. -->
        <CustomInput
            label="Nombre"
            placeholder="Tu nombre"
            type="text"
            :showErrors="nombreError"
            v-model="nombre"
            :errorsList="['El nombre debe tener más de 4 caracteres']"
        />
        <CustomInput
            label="Correo"
            placeholder="Tu correo"
            type="email"
            :showErrors="emailError"
            v-model="email"
            :errorsList="['No tiene un formato válido', 'Email obligatorio']"
        />
        <CustomInput
            label="Contraseña"
            placeholder="Tu contraseña"
            type="password"
            :showErrors="passwordError"
            v-model="password"
            :errorsList="['Necesitas una contraseña', 'Las contraseñas no coinciden']"
        />
        <CustomInput
            label="Repite contraseña"
            type="password"
            placeholder="Repite tu contraseña"
            :showErrors="passwordError"
            v-model="password2"
        />
        <customButton
            @do-click="validar"
            type="submit"
            text="Registrarme"
        />
      </form>
    </section>
    <router-link :to="{ 'name': 'login' }">Volver atrás</router-link>
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

const limitNombre = 4;

export default {
  name: 'SignupView',
  mixins: [supabase],
  components: {
    CustomInput,
    CustomButton
  },
  data() {
    return {
      nombre: "",
      nombreError: false,
      email: "",
      emailError: false,
      password: "",
      password2: "",
      passwordError: false
    }
  },
  methods: {
    validar: function() {
        console.log(this.nombre);
        // Limpiar validaciones
        this.nombreError = false;
        this.emailError = false;
        this.passwordError = false;

        // Validar el nombre
        /* Si está vacío o el número de caracteres es inferior al límite */
        if (this.nombre.trim().length < limitNombre) {
          this.nombreError = true;
        }
        // Email
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email)) {
          this.emailError = true;
        }
        // Password
        /* Si está vacío o si las contraseñas NO son iguales */
        if (this.password.trim().length == 0 || this.password != this.password2) {
          this.passwordError = true;
        }
        // Si todo es false, si NO hay errores, se muestra la alerta
        if (!this.nombreError && !this.emailError && !this.passwordError) {
          // Save data
          this.createUser();
        }
    },
    createUser: async function() {
      NProgress.start();
      const { user, session, error } = await this.supabase.auth.signUp({
        email: this.email,
        password: this.password,
      })
      if (user === null) {
        // Supabase devuelve un error
        alert(error.message)
      // Si se crea correctamente
      } else {
        // Guardamos el nombre
        await this.supabase
            .from('social_network-profile')
            .insert([
              { name: this.nombre, user_id: session.user.id }
            ])
        // Cambiamos a la vista de Login
        this.$router.push({name: 'login', query: {signup: true}})
      }
      NProgress.done();
      return session;
    }
  },
  mounted() {

  }
}
</script>
