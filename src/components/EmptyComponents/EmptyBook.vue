<template>
  <div class="book">
    <Scrollbar />
    <EmptyContent />
    <Headings />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import Scrollbar from "@/components/Scrollbar.vue";
import EmptyContent from "@/components/EmptyComponents/EmptyContent.vue";
import Headings from "@/components/Headings.vue";

export default {
  props: {},
  data() {
    return {};
  },

  components: {
    Scrollbar,
    EmptyContent,
    Headings,
  },

  computed: {
    ...mapState({}),
  },

  methods: {},
};
</script>

<style></style>
