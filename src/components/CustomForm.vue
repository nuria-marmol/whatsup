<template>
  <form>
    <custom-textarea
        label="Tu mensaje"
        placeholder="Escribe aquí"
        v-model="mensaje"
    />
    <custom-button
        @do-click="enviar"
        type="submit"
        text="Enviar"
        :button-disabled="disableSend"
    />
  </form>
</template>

<script>
// Importamos el componente del textarea y el botón
import CustomTextarea from "@/components/CustomTextarea";
import CustomButton from "@/components/CustomButton";
// Supabase
import supabase from "@/mixins/supabase";

export default {
  name: "CustomForm",
  components: {
    "custom-textarea": CustomTextarea,
    "custom-button": CustomButton
  },
  mixins: [supabase],
  props: {
    userId: String
  },
  data() {
    return {
      mensaje: ""
    }
  },
  computed: {
    disableSend: function() {
      // Devuelve true si está vacío, si no, devolverá false
      return this.mensaje.length === 0;
    }
  },
  methods: {
    enviar: async function() {
      const { error } = await this.supabase
          // En la tabla de mensajes (Supabase), metemos nuevas filas
          .from('social_network-posts')
          .insert([
            { text: this.mensaje, user_id: this.userId }
          ])
      // Si hay un error, lo mostramos
      if (error) {
        alert(error.message);
      } else {
        alert("Mensaje enviado!");
        this.mensaje = "";
      }
      console.log(this.userId);
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>