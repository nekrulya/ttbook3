<template>
  <div class="pageContent">
    <div class="pageContentText">
      <div class="received_file__name">{{ file.name }}</div>
      <div class="received_file__code ck-content" v-html="file.code"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  props: {},
  data() {
    return {};
  },

  // components: { CKEditor, ClassicEditor },

  computed: {
    ...mapState({
      file: (state) => state.file,
    }),
  },

  methods: {},

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

  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 42px;

  text-align: left;

  color: #000000;
}

.received_file__name {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 42px;

  text-align: center;

  color: #000000;

  margin-bottom: 20px;
}

.pageText {
  /* background-color: #c6c6c6; */

  width: 100%;

  text-align: left;
  line-height: 1.5;
}

.pageContentText h2 {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 42px;
  display: flex;
  align-items: center;

  color: #000000;
}

.pageContentText h3 {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: start;

  color: #000000;
}

.pageContentText h4 {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  display: flex;
  align-items: start;

  color: #000000;
}

.pageContentText table {
  border: 1px solid black;
  border-collapse: collapse;
}

.pageContentText table {
  border: 1px solid black;
}

.pageContentText td {
  border: 1px solid black;
  padding: 8px;
}

.pageContentText ol,
.pageContentText ul {
  margin: 1em 0;
  padding-left: 40px;
}

.pageContentText ol {
  list-style-type: decimal;
}

.pageContentText ul {
  list-style-type: disc;
}

.pageContentText ol ol,
.pageContentText ul ul {
  list-style-type: lower-alpha;
}

.pageContentText ol ul,
.pageContentText ul ol {
  list-style-type: circle;
}

.pageContentText li {
  margin-bottom: 0.5em;
  line-height: 1.5;
  font-family: "Roboto Mono", monospace;
  color: #000000;
}
</style>
