<template>
  <div>
    <ul class="companies">
      <p>Файлы в данном разделе</p>
      <li v-for="file in this.section.file_list" :key="file.id" class="file">
        <input
          type="checkbox"
          :id="file.name"
          :checked="true"
          @change="delFile(file.id)"
        />
        <label :for="file.name">{{ file.name }}</label>
      </li>
    </ul>
    <ul class="companies">
      <p>Файлы без раздела</p>
      <li
        v-for="file in this.files_without_section"
        :key="file.id"
        class="file"
      >
        <input
          type="checkbox"
          :id="file.name"
          :checked="false"
          @change="addFile(file.id)"
        />
        <label :for="file.name">{{ file.name }}</label>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import axios from "axios";
export default {
  props: {},
  data() {
    return {};
  },

  components: {},

  computed: {
    ...mapState({
      api: (state) => state.api,
      section: (state) => state.section,
      files_without_section: (state) => state.files_without_section,
    }),
  },

  methods: {
    ...mapMutations({
      setFilesWithoutSection: "setFilesWithoutSection",
      setSection: "setSection",
      setfileNames: "setfileNames",
    }),

    loading() {
      const token = localStorage.accessToken;

      axios({
        method: "get",
        url: this.api.getSectionInfo + this.section.id,
        params: {},
        data: {},
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ` + token,
        },
      })
        .then((response) => {
          let receivedSection = response.data;
          this.setSection(receivedSection);
        })
        .catch(function (error) {
          console.log(error);
        });

      axios({
        method: "get",
        url: this.api.getFilesWithoutSection,
        params: {},
        data: {},
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ` + token,
        },
      })
        .then((response) => {
          let files = response.data;
          this.setFilesWithoutSection(files);
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

    delFile(file_id) {
      const token = localStorage.accessToken;

      axios({
        method: "delete",
        url: this.api.delFileFromSection,
        params: {},
        data: {
          section_id: this.section.id,
          file_id: file_id,
        },
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ` + token,
        },
      })
        .then((response) => {
          this.loading();
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    addFile(file_id) {
      const token = localStorage.accessToken;

      axios({
        method: "post",
        url: this.api.addFileToSection,
        params: {},
        data: {
          section_id: this.section.id,
          file_id: file_id,
        },
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ` + token,
        },
      })
        .then((response) => {
          this.loading();
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
  },

  mounted() {},
};
</script>

<style>
.user_rights {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-top: 2px solid black;
  margin-top: 20px;
  padding-top: 10px;
}

.file {
  height: 30px;
  display: flex;
  column-gap: 10px;
}

.file label {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
