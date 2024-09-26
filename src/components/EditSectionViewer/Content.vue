<template>
  <div class="pageContent">
    <div class="pageContentText">
      <div class="receivedFileName">{{ section.name }}</div>
      <div class="filename__inputbtn">
        <input
          type="text"
          v-model="sectionName"
          class="filename"
          placeholder="Название раздела"
          @input="inputSectionNameFunc"
          @keydown.enter="saveSectionName"
        />
        <button class="filename__btn" @click="saveSectionName">
          Применить
        </button>
      </div>
      <SectionFileList />
      <UserRights />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import axios from "axios";
import UserRights from "./UserRights.vue";
import SectionFileList from "./SectionFileList.vue";
export default {
  props: [],
  data() {
    return { sectionName: "" };
  },

  components: { UserRights, SectionFileList },

  computed: {
    ...mapState({
      section: (state) => state.section,
      api: (state) => state.api,
    }),
  },

  methods: {
    ...mapMutations({
      setSectionName: "setSectionName",
      setSection: "setSection",
      setfileNames: "setfileNames",
    }),
    saveSectionName() {
      this.setSectionName(this.sectionName);

      const token = localStorage.accessToken;

      axios({
        method: "put",
        url: this.api.editSection + String(this.section.id),
        params: {},
        data: {
          id: this.section.id,
          name: this.section.name,
          file_list: this.section.file_list,
          allowed_all: this.section.allowed_all,
          allowed_users: this.section.allowed_users,
          allowed_positions: this.section.allowed_positions,
          allowed_departments: this.section.allowed_departments,
          allowed_companies: this.section.allowed_companies,
        },
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ` + token,
        },
      })
        .then((response) => {
          this.setSection(response.data);

          setTimeout(() => {
            const token = localStorage.getItem("accessToken");
            axios({
              method: "get",
              url: this.api.gelAllowedFiles,
              params: {},

              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ` + token,
              },
            })
              .then((response) => {
                this.setfileNames(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
          }, 100);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    inputSectionNameFunc(e) {
      this.setSectionName(e.target.value);
    },
  },

  updated() {
    (async () => {
      await this.$nextTick();
      setTimeout(() => {
        this.sectionName = this.section.name;
      }, 50);
    })();
  },

  mounted() {
    (async () => {
      await this.$nextTick();
      this.sectionName = this.section.name;
    })();
  },
};
</script>

<style>
.pageContent {
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;

  padding-top: 16px;
}

.pageContentText {
  overflow-y: scroll;

  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 42px;

  text-align: left;

  color: #000000;
}

.received_section__name {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 42px;

  text-align: center;

  color: #000000;

  margin-bottom: 20px;
}

.pageText {
  /* background-color: #c6c6c6; */

  width: 100%;

  text-align: left;
  line-height: 1.5;
}

.pageContentText h2 {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 42px;
  display: flex;
  align-items: center;

  color: #000000;
}

.pageContentText h3 {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: start;

  color: #000000;
}

.pageContentText h4 {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  display: flex;
  align-items: start;

  color: #000000;
}
</style>
