<template>
  <Header />
  <div class="book">
    <Scrollbar />
    <Content />
    <div class="emptyHeadings"></div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import axios from "axios";
import Header from "@/components/Header.vue";
import Scrollbar from "@/components/Scrollbar.vue";
import Content from "@/components/EditSectionViewer/Content.vue";
import Headings from "@/components/Headings.vue";

export default {
  name: "EditSectionView",
  props: ["section_id"],
  components: {
    Header,
    Scrollbar,
    Content,
    Headings,
  },

  computed: {
    ...mapState({
      api: (state) => state.api,
      section: (state) => state.section,
    }),
  },

  methods: {
    ...mapMutations({
      setSection: "setSection",
      setFilesWithoutSection: "setFilesWithoutSection",
    }),

    loading() {
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

<style scoped>
.emptyHeadings {
  width: 100%;
  max-width: 272px;
  height: 100%;

  display: flex;
  flex-direction: column;

  border-left: 2px solid #d9d9d9;
  border-radius: 0.5px;
  padding-left: 15px;
}
</style>
