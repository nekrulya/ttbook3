<template>
  <div class="pageContentGD">
    <!-- <div class="pageText"></div> -->
    <iframe
      class="pageTextGD"
      src="https://docs.google.com/document/d/e/2PACX-1vSmHBej_wXDPa0EbYIwBStU6crVAZsKKsW17lakbaQgAw1f6ktRCfq7iRMeRCen4YltEN0Lz2woXVRW/pub?embedded=true"
    ></iframe>
  </div>
</template>

<script>
import Editor from "@/components/Editor.vue";
export default {
  props: {},
  data() {
    return {
      headings: [],
    };
  },

  components: {
    Editor,
  },

  computed: {},

  methods: {},

  mounted() {
    // const inter = setInterval(function () {
    //   const headings = [];
    //   console.log(document.querySelector("iframe").contentWindow);
    // }, 1000);
  },

  updated() {},
};
</script>

<style scoped>
.pageContentGD {
  width: 100%;

  display: flex;
  justify-content: center;
  column-gap: 48px;
}

.pageTextGD {
  width: 768px;
  height: 100%;

  text-align: left;
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
  align-items: center;

  color: #000000;
}

.pageHeadings {
  width: 272px;
  height: 100%;

  display: flex;

  border-left: 2px solid #d9d9d9;
  border-radius: 0.5px;
}
</style>
