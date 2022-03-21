<template>
  <div></div>
  <div class="search">
    <h1>Buscador</h1>
    <form class="search__form">
      <!-- Buscador -->
      <CustomInput
          label="Buscador"
          type="search"
          placeholder="Escribe aquí"
          v-model="search"
      />
      <custom-button
          @do-click="buscar"
          text="Buscar"
      />
    </form>
    <div class="search__posts">
      <single-post
          v-for="(post, index) in posts"
          :key="index"
          :message="post.text"
          :userName="post.user_id"
          :id="post.id"
      />
    </div>
  </div>
</template>

<script>
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import singlePost from "@/components/SinglePost";
//import NProgress from "nprogress"
import supabase from "@/mixins/supabase.js"
import {formatRelative} from "date-fns";
import {es} from "date-fns/locale";

export default {
  name: "SearchView",
  components: {
    CustomButton,
    CustomInput,
    singlePost
  },
  mixins: [supabase],
  data() {
    return {
      search: "",
      posts: []
    }
  },
  methods: {
    buscar: async function() {
      const { data } = await this.supabase
          .from('social_network-posts')
          .select('text')
          .ilike('text', `%${this.search}%`)
      this.posts = data;
    },
    getFormatDate: function() {
      return formatRelative(new Date(), new Date(), { locale: es })
    },
    getUserName: function(userId) {
      // Devuelvo el primer elemento. El name es opcional
      return this.profiles.filter(profile => profile.user_id == userId)[0]?.name;
    }
  }

}
</script>

<style scoped>

</style>