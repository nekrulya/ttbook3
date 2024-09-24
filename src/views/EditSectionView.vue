<template>
  <Header />
  <Book />
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import axios from "axios";
import Header from "@/components/Header.vue";
import Book from "@/components/EditSectionViewer/Book.vue";

export default {
  name: "EditSectionView",
  props: ["section_id"],
  components: {
    Header,
    Book,
  },

  computed: {
    ...mapState({
      api: (state) => state.api,
      section: (state) => state.section,
    }),
  },

  methods: {
    ...mapMutations({
      setSection: 'setSection',
      setFilesWithoutSection: 'setFilesWithoutSection',
    }),

    loading(){
      const token = localStorage.accessToken;

      axios({
        method: "get",
        url: this.api.getSectionInfo + this.section_id,
        params: {},
        data: {},
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ` + token,
        },
      })
        .then((response) => {
          let receivedSection = response.data;
          this.setSection(receivedSection);
        })
        .catch(function (error) {
          console.log(error);
        });

      axios({
        method: "get",
        url: this.api.getFilesWithoutSection,
        params: {},
        data: {},
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ` + token,
        },
      })
        .then((response) => {
          let files = response.data;
          this.setFilesWithoutSection(files);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },

  updated() {
    this.$nextTick(() => {
      this.loading()
    });
  },

  mounted() {
    this.$nextTick(() => {
      this.loading()
    });
  },
};
</script>