<template>
  <nav v-if="this.isAdmin">
    <router-link to="/home">Home</router-link> |
    <router-link to="/auth">Auth</router-link> |
    <router-link to="/GoogleDocTest">GoogleDocTest</router-link> |
    <router-link to="/userlist">UserList</router-link> |
    <a href="http://192.168.102.201:8000/docs">backend docs</a>
  </nav>
  <router-view />
</template>

<script>
export default {
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

<style>
@import "../public/css/main.css";

#app {
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
