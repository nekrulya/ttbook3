<template>
  <div class="book">
    <PageNamesScrollbar />
    <Content />
    <Headings />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import PageNamesScrollbar from "@/components/Scrollbar.vue";
import Content from "@/components/NewFileViewer/Content.vue";
import Headings from "@/components/Headings.vue";

export default {
  props: [],
  data() {
    return {};
  },

  components: {
    PageNamesScrollbar,
    Content,
    Headings,
  },

  computed: {
    ...mapState({}),
  },

  methods: {},
};
</script>

<style></style>
