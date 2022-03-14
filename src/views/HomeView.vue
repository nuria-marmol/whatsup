<template>
  <div class="home container--padding">
      <h1>Hola! c:</h1>
      <div class="home__posts">
        <single-post
            v-for="(post, index) in posts"
            :key="index"
            :message="post.text"
            :userName="getUserName(post.user_id)"
            :date="getFormatDate(post.created_at)"
            :is-my-post="isMyPost(post.user_id)"
            :id="post.id"
        />
      </div>
      <!-- Este componente incluye otros 2 componentes ya creados: textarea y botón -->
      <!-- Lo vinculamos con el id del componente -->
      <custom-form :user-id="myId" />
      <!-- Paginador -->
      <customButton @do-click="pag = pag - 1" text="Atrás" v-if="pag > 1" />
      <customButton @do-click="pag = pag + 1" text="Delante" v-if="pag < getLastPage()" />
  </div>
</template>

<script>
// Importamos barra de progreso
//import NProgress from "nprogress"
// Date-fns
import { formatRelative } from 'date-fns'
import { es } from 'date-fns/locale'


// Mixins
import supabase from "@/mixins/supabase.js"
import privateLogin from "@/mixins/private.js"

// Componentes
import SinglePost from "@/components/SinglePost"
// Formulario y botón
import CustomForm from "@/components/CustomForm";
import CustomButton from "@/components/CustomButton";

export default {
  name: "HomeView",
  mixins: [supabase, privateLogin],
  components: {
    "custom-form": CustomForm,
    SinglePost,
    CustomButton
  },
  data() {
    return {
      myId: "",
      userName: "",
      profiles: [],
      // Donde iremos guardando los mensajes para hacer el bucle
      posts: [],
      numMessagePage: 5,
      pag: 1,
      // De momento
      countMessage: 0
    }
  },
  methods: {
    getFormatDate: function() {
      return formatRelative(new Date(), new Date(), { locale: es })
    },
    mostrarMensajes: async function() {
      const start = (this.pag - 1) * this.numMessagePage;
      const end = start + this.numMessagePage - 1;

      const {data, error} = await this.supabase
          // En la tabla de mensajes (Supabase), seleccionamos todas
          .from('social_network-posts')
          .select('*')
          .order('created_at', {ascending: false} )
          .range(start, end)
      // Llamamos a la función que cuenta los mensajes
      this.getCountMessages();
      // Si hay un error, lo mostramos
      if (error) {
        alert(error.message);
      } else {
        this.posts = data.reverse();
      }
    },
    getCountMessages: async function() {
      const {data, error} = await this.supabase
          // En la tabla de mensajes (Supabase), seleccionamos todas
          .from('social_network-posts')
          .select('*')
      // Si hay un error, lo mostramos
      if (error) {
        alert(error.message);
      } else {
        this.countMessage = data.length;
      }
    },
    getLastPage: function() {
      // El total de mensajes entre 5, los elementos por página
      return Math.ceil(this.countMessage / this.numMessagePage);
    },
    // Nos suscribimos a cambios para no tener que actualizar
    refrescoAutomaticoMensajes: function() {
      this.supabase
          .from('social_network-posts')
          .on('*', () => {
            this.mostrarMensajes();
          })
          .subscribe()
    },
    getUsers: async function() {
      const {data, error} = await this.supabase
          // En la tabla de mensajes (Supabase), metemos nuevas filas
          .from('social_network-profile')
          .select("name, user_id")
      // Si hay un error, lo mostramos
      if (error) {
        alert(error.message);
      } else {
        // Los guardamos en el array users
        this.profiles = data;
      }
    },
    getUserName: function(userId) {
      // Devuelvo el primer elemento. El name es opcional
      return this.profiles.filter(profile => profile.user_id == userId)[0]?.name;
    },
    isMyPost: function(postOwnerId) {
      // Devuelve un booleano
      return this.myId === postOwnerId;
    }
  },
  watch: {
    pag: function() {
      this.mostrarMensajes();
    }
  },
  async mounted() {
      this.myId = await this.supabase.auth.user().id;
      this.mostrarMensajes();
      this.getUsers();
      this.refrescoAutomaticoMensajes();
  }
}
</script>

<style scoped>

</style>