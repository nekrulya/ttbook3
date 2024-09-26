<template>
  <Header />
  <div class="book">
    <Scrollbar />
    <EmptyContent />
    <Headings />
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
};
</script>
