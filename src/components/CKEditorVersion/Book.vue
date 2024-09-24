<template>
  <div class="book">
    <PageNamesScrollbar />
    <PageContent />
    <PageHeadings />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import Editor from "@/components/Editor.vue";
import PageNamesScrollbar from "@/components/Scrollbar.vue";
import PageContent from "@/components/CKEditorVersion/Content.vue";
import PageHeadings from "@/components/Headings.vue";

export default {
  props: {},
  data() {
    return {};
  },

  components: {
    Editor,
    PageNamesScrollbar,
    PageContent,
    PageHeadings,
  },

  computed: {
    ...mapState({
      editingMode: (state) => state.editingMode,
    }),
  },

  methods: {},
};
</script>

<style></style>
