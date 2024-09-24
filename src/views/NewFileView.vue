<template>
  <Header />
  <Book />
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import Header from "@/components/Header.vue";
import Book from "@/components/NewFileViewer/Book.vue";

export default {
  name: "NewFileView",
  props: ["section_id"],
  components: {
    Header,
    Book,
  },
  methods: {
    ...mapMutations({
      setFileSectionId: "setFileSectionId",
    }),
  },
  mounted() {
    this.setFileSectionId(this.section_id === "null" ? null : this.section_id);
  },
};
</script>
