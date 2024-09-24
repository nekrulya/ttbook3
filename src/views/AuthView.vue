<template class="auth">
  <div class="auth_container">
    <Auth />
  </div>
</template>

<script>
import Auth from "@/components/Auth.vue";
export default {
  name: "HomeView",
  components: { Auth },
};
</script>

<style scoped>
.auth_container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
