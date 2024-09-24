<template>
  <ul class="pageHeadings">
    <template v-for="heading in getHeadingsFromPageHTML" :key="heading.id">
      <li class="parentHeading">
        <a :href="heading.link">{{ heading.name }}</a>
      </li>

      <li
        v-for="childHeading in heading.children"
        :key="childHeading.id"
        class="childHeading"
      >
        <a :href="childHeading.link"> {{ childHeading.name }}</a>
      </li>
    </template>
  </ul>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  props: {},
  data() {
    return {};
  },

  components: {},

  computed: {
    ...mapState({}),
    ...mapGetters({ getHeadingsFromPageHTML: "getHeadingsFromPageHTML" }),
  },

  methods: {
    ...mapMutations({}),
  },

  mounted() {},
};
</script>

<style>
.pageHeadings {
  width: 100%;
  max-width: 272px;
  height: 100%;

  display: flex;
  flex-direction: column;

  border-left: 2px solid #d9d9d9;
  border-radius: 0.5px;

  padding-left: 15px;

  /* background-color: red; */
}

.parentHeading {
  margin-top: 8px;
  margin-left: 6px;
  margin-bottom: 16px;
  cursor: pointer;
  text-align: left;

  /* background-color: red; */
}

.parentHeading a {
  text-decoration: none;

  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;

  color: #000000;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
}

.parentHeading a:hover {
  color: rgba(52, 109, 219);
}

.childHeading {
  margin-left: 22px;
  margin-bottom: 8px;
  text-align: left;
}

.childHeading a {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: #898989;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
}

.childHeading a:hover {
  color: rgb(52, 109, 219, 0.72);
}
</style>
