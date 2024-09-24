<template>
  <div class="backToDocs" @click="backToDocs">
    <img src="@/assets/BackToDocsArrow.png" alt="user photo" />
    <span>Назад к документам</span>
  </div>
  <div class="userInfo">
    <div class="userAvatar">
      <img src="@/assets/user.png" alt="user photo" />
    </div>
    <div class="user_descr">
      <div class="nameAndEmail">
        <span class="userName">{{ this.user.fullname }}</span>
        <span class="userEmail">{{ this.user.email }}</span>
      </div>
      <div class="phones">
        <span class="userPhone">{{ this.user.phone }}</span>
        <span class="UserOfficePhone">{{ this.user.office_phone }}</span>
      </div>
      <!-- <div class="companyDepartmentPosition">
        <span class="userCompany">{{ this.user.company }}/</span>
        <span class="userDepartment">{{ this.user.department }}/</span>
        <span class="userPosition">{{ this.user.position }}</span>
      </div> -->
      <div class="userFullPosition">
        {{
          this.user.company +
          "/" +
          this.user.department +
          "/" +
          this.user.position
        }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  props: {},
  data() {
    return {};
  },

  computed: {
    ...mapState({
      file: (state) => state.file,
      api: (state) => state.api,
      user: (state) => state.user,
    }),
  },

  methods: {
    backToDocs() {
      this.$router.push("/home");
    },
  },

  mounted() {},
};
</script>

<style scoped>
.userInfo {
  width: 730px;
  height: auto;
  display: flex;
  justify-content: space-between;
  column-gap: 20px;

  margin: 0 auto;
  padding-top: 20px;

  font-family: "Roboto Mono";
  color: #000000;
}

.user_descr {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  background-color: #ebebeb;

  text-align: left;
}

.nameAndEmail,
.phones,
.companyDepartmentPosition {
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
}

.userName,
.userPhone {
  font-weight: bold;
}

.userEmail,
.UserOfficePhone,
.userPosition {
  color: #898989;
}

.backToDocs {
  position: absolute;
  height: 20px;
  display: flex;
  align-items: center;
  column-gap: 8px;
  padding-top: 20px;
  padding-left: 40px;

  color: #898989;

  cursor: pointer;
}
</style>
