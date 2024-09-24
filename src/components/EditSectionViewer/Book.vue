<template>
  <div class="book">
    <Scrollbar />
    <Content />
    <Headings />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import Scrollbar from "@/components/Scrollbar.vue";
import Content from "@/components/EditSectionViewer/Content.vue";
import Headings from "@/components/Headings.vue";

export default {
  props: ["section_id"],
  data() {
    return {};
  },

  components: {
    Scrollbar,
    Content,
    Headings,
  },

  computed: {},

  methods: {},
};
</script>

<style></style>
