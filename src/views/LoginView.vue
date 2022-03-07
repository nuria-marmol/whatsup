<template>
  <div class="login">
    <h1>Identifícate</h1>
    <p>¿Todavía no tienes cuenta? <router-link :to="{ 'name': 'signup' }">Regístrate</router-link>.</p>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  components: {

  }
}
</script>
