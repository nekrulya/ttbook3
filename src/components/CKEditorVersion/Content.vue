<template>
  <div class="pageContent">
    <div class="pageContentText">
      <div class="pageText" v-html="pageHTML"></div>
      <Editor />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import Editor from "@/components/Editor.vue";
export default {
  props: {},
  data() {
    return {};
  },

  components: {
    Editor,
  },

  computed: {
    ...mapState({
      pageHTML: (state) => state.pageHTML,
      editingMode: (state) => state.editingMode,
    }),
    ...mapGetters({ getHeadingsFromPageHTML: "getHeadingsFromPageHTML" }),
  },

  methods: {
    ...mapMutations({
      setPageHTML: "setPageHTML",
    }),
  },

  mounted() {},
};
</script>

<style>
.pageContent {
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;

  padding-top: 16px;
}

.pageContentText {
  overflow-y: scroll;
}

.pageText {
  /* background-color: #c6c6c6; */

  width: 100%;

  text-align: left;
  line-height: 1.5;
}

.pageText h2 {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 42px;
  display: flex;
  align-items: center;

  color: #000000;
}

.pageText h3 {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: start;

  color: #000000;
}
</style>
