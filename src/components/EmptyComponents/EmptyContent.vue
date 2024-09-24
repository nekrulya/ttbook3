<template>
  <div class="pageContent">
    <div class="pageContentText"></div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  props: {},
  data() {
    return {};
  },

  components: {},

  computed: {},

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
  width: 100%;
  overflow: auto;
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
