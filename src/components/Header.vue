<template>
  <header class="header">
    <div class="header__content">
      <div class="logo">
        <img src="@/assets/logo.png" alt="logo" />
      </div>
      <div class="account">
        <div class="username" @click="openUser">
          {{ username }}
        </div>
        <div class="logout__btn" @click="logout">
          <img src="@/assets/logout_v2.png" alt="logout" />
        </div>
      </div>
      <div class="search">
        <img src="@/assets/search.png" alt="search" />
        <input type="text" placeholder="Поиск" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: [],

  data() {
    return {
      username: localStorage.username,
    };
  },

  components: {},

  computed: {},

  methods: {
    logout() {
      localStorage.accessToken = "";
      localStorage.username = "";
      this.$router.push("/auth");
    },
    openUser() {
      this.$router.push("/user");
    },
  },
};
</script>

<style>
.header {
  width: 100%;

  display: flex;
  justify-content: center;

  margin: 0 auto;
  padding: 15px;

  border-bottom: 1px solid #efefef;
}

.header__content {
  max-width: 1536px;
  width: 100%;

  display: flex;
  justify-content: space-between;

  margin: 0 20px;
}

.search {
  width: 272px;
  height: 32px;

  display: flex;
  align-items: center;
  column-gap: 8px;

  padding: 8px;

  background-color: #ebebeb;
  border: 1px solid #c6c6c6;
  border-radius: 8px;

  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 21px;

  color: #000;
}

.account {
  height: 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  column-gap: 10px;
}

.username {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  display: flex;
  align-items: start;

  color: #000000;
}

.logout__btn {
  width: 18px;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
}

.username {
  cursor: pointer;
}
</style>
