<template>
  <Header />
  <div class="book">
    <Scrollbar />
    <EmptyContent />
    <div class="emptyHeadings"></div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Scrollbar from "@/components/Scrollbar.vue";
import EmptyContent from "@/components/EmptyComponents/EmptyContent.vue";
import Headings from "@/components/Headings.vue";

export default {
  name: "HomeView",
  components: {
    Header,
    Scrollbar,
    EmptyContent,
    Headings,
  },

  data() {
    return {
      isAdmin: false,
    };
  },

  mounted() {
    this.isAdmin = localStorage.isAdmin === "true" ? true : false;
  },
};
</script>

<style scoped>
.emptyHeadings {
  width: 100%;
  max-width: 272px;
  height: 100%;

  display: flex;
  flex-direction: column;

  border-left: 2px solid #d9d9d9;
  border-radius: 0.5px;
  padding-left: 15px;
}
</style>
