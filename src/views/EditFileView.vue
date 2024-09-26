<template>
  <Header />
  <div class="book">
    <Scrollbar />
    <Content />
    <Headings />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import axios from "axios";
import Header from "@/components/Header.vue";
import Scrollbar from "@/components/Scrollbar.vue";
import Content from "@/components/EditFileViewer/Content.vue";
import Headings from "@/components/Headings.vue";

export default {
  name: "EditFileView",
  props: ["file_id"],
  components: {
    Header,
    Scrollbar,
    Content,
    Headings,
  },

  computed: {
    ...mapState({
      api: (state) => state.api,
      file: (state) => state.file,
    }),
  },

  methods: {
    ...mapMutations({
      setFileId: "setFileId",
      setFile: "setFile",
      setHTMLWithSelectorsFromServer: "setHTMLWithSelectorsFromServer",
      setCompanies: "setCompanies",
    }),

    loading() {
      this.setFileId(this.file_id);

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

      axios({
        method: "get",
        url: this.api.getAllCopmpanies,
        params: {},
        data: {},
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ` + token,
        },
      })
        .then((response) => {
          let companies = response.data;
          this.setCompanies(companies);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  updated() {
    this.$nextTick(() => {
      this.loading();
    });
  },

  mounted() {
    this.$nextTick(() => {
      this.loading();
    });
  },
};
</script>
