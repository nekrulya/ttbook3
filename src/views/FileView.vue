<template>
  <Header />
  <Book />
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import axios from "axios";
import Header from "@/components/Header.vue";
import Book from "@/components/FileViewer/Book.vue";

export default {
  name: "HomeView",
  props: ["file_id"],
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
      setFile: "setFile",
      setHTMLWithSelectorsFromServer: "setHTMLWithSelectorsFromServer",
    }),
  },

  updated() {
    const token = localStorage.accessToken;
    axios({
      method: "get",
      url: this.api.viewFile + this.file_id,
      params: {},
      data: {},
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ` + token,
      },
    })
      .then((response) => {
        let receivedFile = response.data;
        this.setFile(receivedFile);
        this.setHTMLWithSelectorsFromServer(receivedFile.code);
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  mounted() {
    const token = localStorage.accessToken;
    axios({
      method: "get",
      url: this.api.viewFile + this.file_id,
      params: {},
      data: {},
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ` + token,
      },
    })
      .then((response) => {
        let receivedFile = response.data;
        this.setFile(receivedFile);
        this.setHTMLWithSelectorsFromServer(receivedFile.code);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>
