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
            :showErrors="false"
            :errorsList="['Nombre obligatorio']"
        />
        <CustomInput label="Correo" placeholder="Tu correo" type="email"/>
        <CustomInput label="Contraseña" placeholder="Tu contraseña" type="password"/>
        <CustomInput label="Repite contraseña" type="password"/>
        <CustomInput type="submit" value="Registrar"/>
      </form>
    </section>
    <router-link :to="{ 'name': 'login' }">Volver atrás</router-link>
  </div>
</template>

<script>
// Importamos el componente del input
import CustomInput from "@/components/CustomInput";

export default {
  name: 'SignupView',
  components: {
      CustomInput
  }
}
</script>
