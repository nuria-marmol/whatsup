<template>
  <div></div>
  <!--<div class="search">
    <h1>Buscador</h1>
    <p><router-link :to="{ 'name': 'home '}">Salir</router-link></p>
    <form class="search__form">
      --><!-- Buscador -->
      <!--<CustomInput
          label="Buscador"
          type="search"
          placeholder="Escribe aquí"
          v-model="search"
      />
      <custom-button
          @do-click=""
          text="Buscar"
      />
    </form>
    <div class="search__posts">
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
  </div>-->
</template>

<script>
//import CustomInput from "@/components/CustomInput";
//import CustomButton from "@/components/CustomButton";
//import singlePost from "@/components/SinglePost";
//import NProgress from "nprogress"
//import supabase from "@/mixins/supabase.js"

export default {
  name: "SearchView",
  components: {
    //CustomButton,
    //CustomInput,
    //singlePost
  },
  //mixins: [supabase]
}
</script>

<style scoped>

</style>