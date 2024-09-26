<template>
  <div class="scrollbar">
    <div
      class="create_section"
      v-if="!isCreatingSection && isAdmin"
      @click="openCreateSection"
    >
      Добавить раздел
    </div>
    <div class="newSectionCreating" v-if="isCreatingSection">
      <input
        type="text"
        class="newSectionName"
        placeholder="Название раздела"
        v-model="newSectionName"
        @keydown.enter="acceptNewSection"
      />
      <div class="newSectionBtns">
        <div class="newSectionAccept" @click="acceptNewSection">✅</div>
        <div class="newSectionDecline" @click="cancelCreationSection">❌</div>
      </div>
    </div>
    <ul>
      <li
        class="sectionListItem"
        v-for="namesObj in this.fileNames"
        :key="namesObj.section_id"
      >
        <h3 class="sectionName">
          {{
            namesObj.sectionName !== "None"
              ? namesObj.sectionName
              : "Без раздела"
          }}
          <div
            class="section_add_and_edit"
            v-if="namesObj.sectionName != 'Без раздела'"
          >
            <div class="section__edit" v-if="isAdmin">
              <img
                src="@/assets/editing.png"
                alt="edit section"
                @click.stop="editSection(namesObj.section_id, $event)"
              />
            </div>
            <div class="section__addfile" v-if="isAdmin">
              <a
                :href="'/create_file/' + namesObj.section_id"
                @click="setSectionID(namesObj.section_id)"
              >
                <img src="@/assets/add.png" alt="add file"
              /></a>
            </div>
            <div class="section__delete" v-if="isAdmin">
              <a @click="deleteSection(namesObj)">
                <img src="@/assets/delete.png" alt="delete section"
              /></a>
            </div>
          </div>
        </h3>

        <ul>
          <li
            class="pageName"
            v-for="page in namesObj.pages"
            :key="page.pageId"
            :class="{ 'pageName--selected': page.pageId == this.file.id }"
            @click.stop="chooseFile(page.pageId, $event)"
          >
            <span>{{ page.pageName }}</span>
            <div class="edit_and_delete" v-if="isAdmin">
              <img
                src="@/assets/editing.png"
                alt="edit file"
                @click.stop="editFile(page.pageId, $event)"
              />
              <img
                src="@/assets/delete.png"
                alt="delete file"
                @click.stop="deleteFile(page.pageId, page.pageName)"
              />
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  props: {},
  data() {
    return {
      isAdmin: false,
      isCreatingSection: false,
      newSectionName: "",
    };
  },

  components: {},

  computed: {
    ...mapState({
      fileNames: (state) => state.fileNames,
      api: (state) => state.api,
      file: (state) => state.file,
      newSection: (state) => state.newSection,
    }),
  },

  methods: {
    ...mapMutations({
      setfileNames: "setfileNames",
      setPageHTML: "setPageHTML",
      setFile: "setFile",
      setFileSectionId: "setFileSectionId",
      setNewSection: "setNewSection",
    }),

    chooseFile(fileId, e) {
      let choosedPages = document.querySelectorAll(".pageName--selected");
      for (const cp of choosedPages) {
        cp.classList.remove("pageName--selected");
      }
      e.target.closest(".pageName").classList.add("pageName--selected");

      const token = localStorage.accessToken;

      this.$router.push(`/file/${fileId}`);
    },

    editSection(section_id, event) {
      const token = localStorage.accessToken;

      this.$router.push(`/edit_section/${section_id}`);
    },

    setSectionID(section_id) {
      this.setFileSectionId(section_id);
    },

    deleteFile(fileId, fileName) {
      if (confirm(`Вы уверены, что хотите удалить файл ${fileName}?`)) {
        const token = localStorage.accessToken;
        axios({
          method: "delete",
          url: this.api.deleteFile + fileId,
          params: {},
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ` + token,
          },
        })
          .then((response) => {
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
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        console.log("pass");
      }
    },

    editFile(file_id, e) {
      let choosedPages = document.querySelectorAll(".pageName--selected");
      for (const cp of choosedPages) {
        cp.classList.remove("pageName--selected");
      }
      e.target.closest(".pageName").classList.add("pageName--selected");

      this.$router.push(`/edit_file/${file_id}`);
    },

    openCreateSection() {
      this.isCreatingSection = true;
    },

    cancelCreationSection() {
      this.isCreatingSection = false;
    },

    acceptNewSection() {
      this.setNewSection({ name: this.newSectionName, allowed_all: false });
      const token = localStorage.getItem("accessToken");
      axios({
        method: "post",
        url: this.api.createSection,
        params: {},
        data: {
          name: this.newSection.name,
          allowed_all: this.newSection.allowed_all,
        },
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ` + token,
        },
      })
        .then((response) => {
          let res = response.data;
          console.log(res);
          this.isCreatingSection = false;

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
                this.newSectionName = "";
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
    deleteSection(section) {
      if (
        confirm(`Вы уверены, что хотите удалить раздел ${section.sectionName}?`)
      ) {
        const token = localStorage.accessToken;
        axios({
          method: "delete",
          url: this.api.deleteSection + section.section_id,
          params: {},
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ` + token,
          },
        })
          .then((response) => {
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
                  this.$router.push(`/home`);
                })
                .catch(function (error) {
                  console.log(error);
                });
            }, 100);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        console.log("pass");
      }
    },
  },

  mounted() {
    this.isAdmin = localStorage.isAdmin === "true" ? true : false;
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
  },
};
</script>

<style>
.scrollbar {
  max-width: 304px;
  width: 100%;
  height: 100vh;

  padding: 16px 8px;

  overflow-y: scroll;
}

.sectionListItem {
  margin-bottom: 16px;
}

.sectionName {
  display: flex;
  justify-content: space-between;
  align-self: start;
  margin-bottom: 12px;

  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  text-align: left;

  color: #000000;
}

.pageName {
  width: 260px;
  max-width: 260px;

  display: flex;
  justify-content: space-between;

  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 21px;
  display: flex;
  align-items: left;

  color: #898989;

  text-align: left;

  padding: 8px;

  transition: 0.5s background-color;
  overflow-wrap: break-all;
  hyphens: auto;
}

.pageName span {
  max-width: 200px;
  hyphens: auto;
  overflow-wrap: break-word;
}

.pageName:hover {
  background-color: #f0f0f0;

  cursor: pointer;
}

.pageName--selected {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;

  color: #1758ff;
}

.pageName img {
  height: 20px;
}

.section_add_and_edit {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
}

.section__edit {
  width: 20px;

  cursor: pointer;
}

.section__addfile {
  width: 15px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
}

.section__addfile a {
  width: 15px;
  height: 15px;
}

.section__delete {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.edit_and_delete {
  width: 40px;
  display: flex;
}

.create_section {
  padding: 8px;
  border: 1px solid black;
  border-radius: 10px;
  margin: 20px auto;
  cursor: pointer;
}

.newSectionName {
  padding: 8px;
  margin: 20px auto;
  border: 1px solid black;
  border-radius: 10px;
}

.newSectionCreating {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.newSectionBtns {
  display: flex;
}

.newSectionAccept {
  cursor: pointer;
}

.newSectionDecline {
  cursor: pointer;
}
</style>
