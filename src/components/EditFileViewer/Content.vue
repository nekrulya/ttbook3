<template>
  <div class="pageContent">
    <div class="pageContentText">
      <div class="receivedFileName">{{ file.name }}</div>
      <div class="filename__inputbtn">
        <input
          type="text"
          v-model="filename"
          class="filename"
          placeholder="Название файла"
          @input="inputFilenameFunc"
          @keydown.enter="saveFileName"
        />
        <button class="filename__btn" @click="saveFileName">Применить</button>
      </div>
      <Editor />
      <button class="saveBtn" @click.prevent="SaveEditiedNewFile">
        СОХРАНИТЬ
      </button>
      <UserRights />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import axios from "axios";
import Editor from "@/components/Editor.vue";
import UserRights from "../EditFileViewer/UserRights.vue";
export default {
  props: [],
  data() {
    return { filename: "" };
  },

  components: { Editor, UserRights },

  computed: {
    ...mapState({
      HTMLWithSelectors: (state) => state.HTMLWithSelectors,
      file: (state) => state.file,
      api: (state) => state.api,
    }),
  },

  methods: {
    ...mapMutations({
      setFileName: "setFileName",
      setFile: "setFile",
    }),

    saveFileName() {
      this.setFileName(this.filename);

      const token = localStorage.accessToken;

      axios({
        method: "put",
        url: this.api.editFile + this.file.id,
        params: {},
        data: {
          name: this.file.name,
          url: this.file.url,
          code: this.file.code,
          allowed_all: this.file.allowed_all,
          section_id: this.file.section_id,
        },
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ` + token,
        },
      })
        .then((response) => {
          this.$router.push("/home");
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    SaveEditiedNewFile() {
      const token = localStorage.accessToken;
      // console.log({
      //   name: this.file.name,
      //   url: this.file.url,
      //   code: this.file.code,
      //   allowed_all: this.file.allowed_all,
      //   section_id: this.file.section_id,
      // });
      axios({
        method: "put",
        url: this.api.editFile + this.file.id,
        params: {},
        data: {
          name: this.file.name,
          url: this.file.url,
          code: this.file.code,
          allowed_all: this.file.allowed_all,
          section_id: this.file.section_id,
        },
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ` + token,
        },
      })
        .then((response) => {
          this.$router.push(`/file/${response.data.id}`);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    inputFilenameFunc(e) {
      const token = localStorage.accessToken;

      axios({
        method: "put",
        url: this.api.editFile + this.file.id,
        params: {},
        data: {
          name: e.target.value,
          url: this.file.url,
          code: this.file.code,
          allowed_all: this.file.allowed_all,
          section_id: this.file.section_id,
        },
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ` + token,
        },
      })
        .then((response) => {
          this.setFile(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  updated() {
    (async () => {
      await this.$nextTick();
      setTimeout(() => {
        this.filename = this.file.name;
      }, 50);
      // this.filename = this.file.name;
    })();
  },

  mounted() {
    (async () => {
      await this.$nextTick();
      this.filename = this.file.name;
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

.receivedFileName {
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
