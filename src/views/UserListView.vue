<template>
  <Header />
  <Book />
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import axios from "axios";
import Header from "@/components/Header.vue";
import Book from "@/components/UserListViewer/Book.vue";

export default {
  name: "UserView",
  props: [],
  components: {
    Header,
    Book,
  },

  computed: {
    ...mapState({
      api: (state) => state.api,
      file: (state) => state.file,
    }),
  },

  methods: {
    ...mapMutations({
      setUser: "setUser",
    }),
  },

  updated() {},

  mounted() {
    const token = localStorage.accessToken;
    axios({
      method: "get",
      url: this.api.getCurrentUser,
      params: {},
      data: {},
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ` + token,
      },
    })
      .then((response) => {
        let user = response.data;
        this.setUser(user);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>
