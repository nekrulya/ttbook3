<template>
  <form class="auth_form" @keydown.enter="login">
    <div class="auth_img"><img src="@/assets/authlogo.png" alt="logo" /></div>
    <div class="auth_login">
      <input
        type="text"
        placeholder="login"
        required
        autocomplete="on"
        v-model="username"
      />
      <img
        class="star_img"
        src="@/assets/star.png"
        alt="required"
        v-if="IsUsernameEmpty"
      />
    </div>
    <div class="auth_password">
      <input
        type="password"
        placeholder="password"
        required
        autocomplete="on"
        v-model="password"
      />
      <img
        class="star_img"
        src="@/assets/star.png"
        alt="required"
        v-if="IsPasswordEmpty"
      />
    </div>
    <div class="auth_btn" @click="login">Войти</div>
  </form>
</template>

<script></script>

<script>
import axios from "axios";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

axios.defaults.baseURL = "http://192.168.102.201:8000/";

export default {
  props: [],

  data() {
    return {
      username: "",
      password: "",
    };
  },

  components: {},

  computed: {
    IsUsernameEmpty() {
      return this.username.length === 0;
    },
    IsPasswordEmpty() {
      return this.password.length === 0;
    },
    ...mapState({
      api: (state) => state.api,
    }),
  },

  methods: {
    ...mapMutations({
      setUser: "setUser",
    }),

    login() {
      axios({
        method: "post",
        url: this.api.login,
        params: {},
        data: {
          username: this.username,
          password: this.password,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => {
          this.password = "";
          localStorage.accessToken = response.data.access_token;
          localStorage.username = this.username;
          localStorage.isAdmin = response.data.isAdmin;

          const token = localStorage.accessToken;
          axios({
            method: "get",
            url: this.api.getCurrentUser,
            params: {},
            data: {},
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ` + token,
            },
          })
            .then((response) => {
              let user = response.data;
              console.log(user);
              this.setUser(user);
              setTimeout(() => {
                this.$router.push("/home");
              }, 100);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });

      if (this.$route.query.redirect) {
        setTimeout(() => {
          this.$router.push(this.$route.query.redirect);
        }, 100);
      } else {
        this.$router.push("/home");
      }
    },
  },
};
</script>

<style scoped>
.auth__container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth_form {
  max-width: 256px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.auth_login,
.auth_password {
  width: 100%;
  height: 24px;
  background-color: #f5f5f5;

  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 21px;
  display: flex;
  align-items: center;

  /* color: #a9a9a9; */
  color: black;
  position: relative;

  padding: 4px;

  border-bottom: 1px solid #1758ff;
}

.auth_login {
  margin-top: 53px;
}

.auth_password {
  margin-top: 24px;
}

.auth_btn {
  width: 92px;
  height: 24px;

  margin-top: 56px;

  background: #f5f5f5;
  border: 1px solid #1758ff;

  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 21px;
  text-align: center;

  color: #1758ff;

  cursor: pointer;
  user-select: none;
}

.star_img {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 5px;
}
</style>
