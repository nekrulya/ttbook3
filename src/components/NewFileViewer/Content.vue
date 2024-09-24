<template>
  <div class="newFile">
    <div class="filename__inputbtn">
      <div>
        {{
          this.fileNames.filter((f) => f.section_id === this.file?.section_id)
            .length > 0
            ? this.fileNames.filter(
                (f) => f.section_id === this.file?.section_id
              )[0].sectionName
            : "Без раздела"
        }}
      </div>
      <input
        type="text"
        v-model="filename"
        class="filename"
        placeholder="Название файла"
        @keydown.enter="saveFileName"
      />
      <button class="filename__btn" @click="saveFileName">Применить</button>
    </div>
    <Editor />
    <button class="saveBtn" @click.prevent="addNewFile">СОХРАНИТЬ</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import axios from "axios";
import Editor from "@/components/Editor.vue";
export default {
  props: {},
  data() {
    return { filename: "" };
  },

  components: {
    Editor,
  },

  computed: {
    ...mapState({
      editingMode: (state) => state.editingMode,
      fileNames: (state) => state.fileNames,
      file: (state) => state.file,
      HTMLWithSelectors: (state) => state.HTMLWithSelectors,
      api: (state) => state.api,
    }),
    ...mapGetters({ getHeadingsFromPageHTML: "getHeadingsFromPageHTML" }),
  },

  methods: {
    ...mapMutations({
      setPageHTML: "setPageHTML",
      setFileName: "setFileName",
      setHTMLWithSelectors: "setHTMLWithSelectors",
      setFileCode: "setFileCode",
    }),
    saveFileName() {
      this.setFileName(this.filename);
    },

    addNewFile() {
      this.setHTMLWithSelectors(this.file.code);
      this.setFileCode(this.HTMLWithSelectors);
      this.saveFileName();
      const token = localStorage.accessToken;
      // console.log({
      //   name: this.file.name,
      //   url: null,
      //   code: this.file.code,
      //   allowed_all: true,
      //   section_id: this.file.section_id,
      // });
      axios({
        method: "post",
        url: this.api.createFile,
        params: {},
        data: {
          name: this.file.name,
          url: null,
          code: this.file.code,
          allowed_all: true,
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
  },

  mounted() {},
};
</script>

<style>
.newFile {
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 2px solid #6c6c6c;
  margin: 0 auto;
}

.pageContent {
  width: 100%;

  display: flex;
  justify-content: center;

  padding-top: 16px;
}

.pageContentText {
  width: 100%;
}

.pageText {
  width: 100%;

  text-align: left;
  line-height: 1.5;
}

.pageText h2 {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 42px;
  display: flex;
  align-items: center;

  color: #000000;
}

.pageText h3 {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: start;

  color: #000000;
}

.filename__inputbtn {
  display: flex;
  align-items: center;
  column-gap: 16px;

  margin-top: 30px;
  margin-bottom: 20px;
}

.filename {
  width: 272px;
  height: 32px;

  display: flex;
  align-items: center;
  column-gap: 8px;

  padding: 8px;

  border: 1px solid #c6c6c6;
  border-radius: 8px;

  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;

  color: #000;
}

.filename__btn {
  height: 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 8px;
  border: 1px solid #c6c6c6;
  border-radius: 8px;

  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 32px;

  color: #000;
}

.saveBtn {
  margin-top: 10px;
  padding: 8px;

  border: 3px solid #c6c6c6;
  border-radius: 5px;

  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 24px;

  color: #000;
}
</style>
