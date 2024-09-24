<template>
  <div class="editor">
    <p style="display: none">{{ this.file.code }}</p>
    <ckeditor :editor="editor" v-model="editorData" @input="func"></ckeditor>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  props: [],
  data() {
    return {
      editor: ClassicEditor,
      editorData: this.getCode,
    };
  },

  components: {
    ckeditor: CKEditor.component,
  },

  computed: {
    ...mapState({
      file: (state) => state.file,
    }),
    ...mapGetters({ getFileCode: "getFileCode" }),
  },

  methods: {
    ...mapMutations({
      setFileCode: "setFileCode",
    }),

    func() {
      this.setFileCode(this.editorData);
    },
  },

  mounted() {
    setTimeout(() => {
      this.editorData = this.getFileCode;
    }, 1000);
  },

  updated() {
    this.editorData = this.getFileCode;
  },
};
</script>

<style>
.editor {
  width: 800px;
}

.editor h2 {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 42px;
  display: flex;
  align-items: center;

  color: #000000;
}

.editor h3 {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: start;

  color: #000000;
}

.editor h4 {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  display: flex;
  align-items: start;

  color: #000000;
}
</style>
