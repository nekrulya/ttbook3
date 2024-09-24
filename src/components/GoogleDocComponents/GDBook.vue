<template>
  <div class="book">
    <PageNamesScrollbar />
    <GDPageContent />
    <Headings />
  </div>
</template>

<script>
import PageNamesScrollbar from "@/components/Scrollbar.vue";
import GDPageContent from "@/components/GoogleDocComponents/GDPageContent.vue";
import Headings from "@/components/Headings.vue";
export default {
  props: {},
  data() {
    return {};
  },

  components: {
    PageNamesScrollbar,
    GDPageContent,
    Headings,
  },

  computed: {},

  methods: {},
};
</script>

<style></style>
