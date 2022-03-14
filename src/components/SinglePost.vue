<template>
  <!-- Se añade esta clase si cumple -->
  <article v-if="isShow" class="single-post" :class="{'mine': isMyPost}">
    <header class="single-post__header">
      <p class="text-semibold"> {{ userName}} </p>
      <p class="text-s"> {{ date }} </p>
    </header>
    <p class="single-post__content"> {{ message }} </p>
    <custom-button
      v-if="isMyPost"
      text="Borrar"
      @do-click="borrarMensaje"
    />
  </article>
</template>

<script>
import CustomButton from "@/components/CustomButton";
import supabase from "@/mixins/supabase";

export default {
  name: "SinglePost",
  components: {
    CustomButton
  },
  mixins: [supabase],
  props: {
    userName: String,
    date: String,
    message: String,
    isMyPost: Boolean,
    // Para poder borrar el mensaje. Le pasaremos la id también al padre
    id: Number
  },
  data() {
    return {
      // Para ocultar el article
      isShow: true
    }
  },
  methods: {
    borrarMensaje: async function() {
      // Ocultamos el mensaje
      this.isShow = false;
      const { data, error } = await this.supabase
          .from('social_network-posts')
          .delete()
          // Me borrará el que tenga ese id de la base
          .eq('id', this.id)
      if (error) {
        alert(error);
      }
      return data;
    }
  }
}
</script>

<style scoped>

</style>