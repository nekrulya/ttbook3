<template>
  <Header />
  <div class="book">
    <PageNamesScrollbar />
    <Content />
    <Headings />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import Header from "@/components/Header.vue";
import PageNamesScrollbar from "@/components/Scrollbar.vue";
import Content from "@/components/NewFileViewer/Content.vue";
import Headings from "@/components/Headings.vue";

export default {
  name: "NewFileView",
  props: ["section_id"],
  components: {
    Header,
    PageNamesScrollbar,
    Content,
    Headings,
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
