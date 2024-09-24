<template>
  <Header />
  <GDBook />
</template>

<script>
import Header from "@/components/Header.vue";
import GDBook from "@/components/GoogleDocComponents/GDBook.vue";

export default {
  name: "HomeView",
  components: {
    Header,
    GDBook,
  },
};
</script>
