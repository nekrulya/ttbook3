<template>
  <div class="book">
    <Content />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import Content from "@/components/UserViewer/Content.vue";
import Headings from "@/components/Headings.vue";

export default {
  props: [],
  data() {
    return {};
  },

  components: {
    Content,
    Headings,
  },

  computed: {},

  methods: {},
};
</script>

<style></style>
