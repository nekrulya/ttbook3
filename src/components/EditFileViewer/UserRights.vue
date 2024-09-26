<template>
  <div :class="[this.file.allowed_all ? 'allowedAllChecked' : 'allowedAll']">
    <input
      type="checkbox"
      @change="allow_all($event)"
      id="allowedAll"
      :checked="this.file.allowed_all"
    />
    <label for="allowedAll">Доступен всем</label>
  </div>
  <div class="user_rights" v-if="!this.file.allowed_all">
    <ul class="companies">
      <li v-for="company in companies" :key="company.id" class="company">
        <div class="company_header">
          <input
            type="checkbox"
            :id="company.name"
            :checked="this.file.allowed_companies?.includes(company.id)"
            @change="changeCompany(company, $event)"
          />
          <label :for="company.name">{{ company.name }}</label>
          <img
            class="arrow_down"
            src="@/assets/chevron.png"
            alt="open departments"
            :id="company.id"
            @click.stop="openDepartments"
            open="false"
          />
        </div>

        <ul class="departments" v-if="company.departments?.length > 0">
          <li
            v-for="dep in company.departments"
            :key="dep.id"
            class="department"
          >
            <div class="department_header">
              <input
                type="checkbox"
                :id="dep.name"
                :checked="this.file.allowed_departments.includes(dep.id)"
                @change="changeDepartment(dep, $event)"
              />
              <label :for="dep.name">{{ dep.name }}</label>
              <img
                class="arrow_down"
                src="@/assets/chevron.png"
                alt="open positions"
                :id="dep.id"
                @click.stop="openPositions(company, $event)"
                open="false"
              />
            </div>

            <ul class="positions" v-if="dep.positions?.length > 0">
              <li v-for="pos in dep.positions" :key="pos.id" class="position">
                <div class="position_header">
                  <input
                    type="checkbox"
                    :id="pos.name"
                    :checked="this.file.allowed_positions.includes(pos.id)"
                    @change="changePosition(pos, $event)"
                  />
                  <label :for="pos.name">{{ pos.name }}</label>
                  <img
                    class="arrow_down"
                    src="@/assets/chevron.png"
                    alt="open users"
                    :id="pos.id"
                    @click.stop="openUsers(company, dep, $event)"
                    open="false"
                  />
                </div>

                <ul class="users" v-if="pos.users?.length > 0">
                  <li v-for="user in pos.users" :key="user.id" class="user">
                    <div class="user_header">
                      <input
                        type="checkbox"
                        :id="user.name"
                        :checked="this.file.allowed_users.includes(user.id)"
                        @change="changeUser(user, $event)"
                      />
                      <label :for="user.name">{{ user.fullname }}</label>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
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
    return {
      fileAllowedAll: false,
    };
  },

  components: {},

  computed: {
    ...mapState({
      api: (state) => state.api,
      companies: (state) => state.companies,
      file: (state) => state.file,
    }),
    ...mapGetters({ getHeadingsFromPageHTML: "getHeadingsFromPageHTML" }),
  },

  methods: {
    ...mapMutations({
      setFileCode: "setFileCode",
      setDepartments: "setDepartments",
      setPositions: "setPositions",
      setUsers: "setUsers",
      setFile: "setFile",
    }),

    openDepartments(event) {
      if (event.target.getAttribute("open") === "false") {
        event.target.setAttribute("open", "true");
        event.target.style.transform = "rotate(-90deg)";

        const token = localStorage.accessToken;
        axios({
          method: "get",
          url: this.api.getDepartments + event.target.id,
          params: {},
          data: {},
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ` + token,
          },
        })
          .then((response) => {
            let departments = response.data;
            this.setDepartments([event.target.id, departments]);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        event.target.setAttribute("open", "false");
        event.target.style.transform = "rotate(0deg)";
        this.setDepartments(event.target.id, []);
      }
    },

    openPositions(company, event) {
      if (event.target.getAttribute("open") === "false") {
        event.target.setAttribute("open", "true");
        event.target.style.transform = "rotate(-90deg)";

        const token = localStorage.accessToken;

        axios({
          method: "get",
          url: this.api.getPositions + event.target.id,
          params: {},
          data: {},
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ` + token,
          },
        })
          .then((response) => {
            let positions = response.data;
            this.setPositions([company.id, event.target.id, positions]);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        event.target.setAttribute("open", "false");
        event.target.style.transform = "rotate(0deg)";
        this.setPositions([company.id, event.target.id, []]);
      }
    },

    openUsers(company, department, event) {
      if (event.target.getAttribute("open") === "false") {
        event.target.setAttribute("open", "true");
        event.target.style.transform = "rotate(-90deg)";

        const token = localStorage.accessToken;

        axios({
          method: "get",
          url: this.api.getUsers + event.target.id,
          params: {},
          data: {},
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ` + token,
          },
        })
          .then((response) => {
            let users = response.data;
            console.log(users);
            this.setUsers([company.id, department.id, event.target.id, users]);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        event.target.setAttribute("open", "false");
        event.target.style.transform = "rotate(0deg)";
        this.setUsers([company.id, department.id, event.target.id, []]);
      }
    },

    changeCompany(company, event) {
      const token = localStorage.accessToken;

      if (event.target.checked == false) {
        axios({
          method: "delete",
          url: this.api.removeAllowedCompany,
          params: {},
          data: {
            target_id: company.id,
            file_id: this.file.id,
          },
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ` + token,
          },
        })
          .then((response) => {
            let res = response.data;
            this.setFile(res);
            console.log(res);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios({
          method: "post",
          url: this.api.addAllowedCompany,
          params: {},
          data: {
            target_id: company.id,
            file_id: this.file.id,
          },
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ` + token,
          },
        })
          .then((response) => {
            let res = response.data;
            this.setFile(res);
            console.log(res);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    changeDepartment(dep, event) {
      const token = localStorage.accessToken;

      if (event.target.checked == false) {
        axios({
          method: "delete",
          url: this.api.removeAllowedDepartment,
          params: {},
          data: {
            target_id: dep.id,
            file_id: this.file.id,
          },
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ` + token,
          },
        })
          .then((response) => {
            let res = response.data;
            this.setFile(res);
            console.log(res);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios({
          method: "post",
          url: this.api.addAllowedDepartment,
          params: {},
          data: {
            target_id: dep.id,
            file_id: this.file.id,
          },
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ` + token,
          },
        })
          .then((response) => {
            let res = response.data;
            this.setFile(res);
            console.log(res);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    changePosition(pos, event) {
      const token = localStorage.accessToken;

      if (event.target.checked == false) {
        axios({
          method: "delete",
          url: this.api.removeAllowedPosition,
          params: {},
          data: {
            target_id: pos.id,
            file_id: this.file.id,
          },
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ` + token,
          },
        })
          .then((response) => {
            let res = response.data;
            this.setFile(res);
            console.log(res);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios({
          method: "post",
          url: this.api.addAllowedPosition,
          params: {},
          data: {
            target_id: pos.id,
            file_id: this.file.id,
          },
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ` + token,
          },
        })
          .then((response) => {
            let res = response.data;
            this.setFile(res);
            console.log(res);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    changeUser(user, event) {
      const token = localStorage.accessToken;

      if (event.target.checked == false) {
        axios({
          method: "delete",
          url: this.api.removeAllowedUser,
          params: {},
          data: {
            target_id: user.id,
            file_id: this.file.id,
          },
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ` + token,
          },
        })
          .then((response) => {
            let res = response.data;
            this.setFile(res);
            console.log(res);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios({
          method: "post",
          url: this.api.addAllowedUser,
          params: {},
          data: {
            target_id: user.id,
            file_id: this.file.id,
          },
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ` + token,
          },
        })
          .then((response) => {
            let res = response.data;
            this.setFile(res);
            console.log(res);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    allow_all(event) {
      const token = localStorage.accessToken;
      if (event.target.checked) {
        this.fileAllowedAll = true;
        axios({
          method: "put",
          url: this.api.editFile + this.file.id,
          params: {},
          data: {
            name: this.file.name,
            url: "",
            code: this.file.code,
            allowed_all: this.fileAllowedAll,
            section_id: this.file.section_id,
          },
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ` + token,
          },
        })
          .then((response) => {
            let res = response.data;
            this.setFile(res);
            console.log(res);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        this.fileAllowedAll = false;
        axios({
          method: "put",
          url: this.api.editFile + this.file.id,
          params: {},
          data: {
            name: this.file.name,
            url: "",
            code: this.file.code,
            allowed_all: this.fileAllowedAll,
            section_id: this.file.section_id,
          },
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ` + token,
          },
        })
          .then((response) => {
            let res = response.data;
            this.setFile(res);
            console.log(res);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },

  mounted() {
    this.fileAllowedAll = this.file.allowed_all;
  },
};
</script>

<style scoped>
.user_rights {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  border-top: 2px solid black;
  margin-top: 20px;
  padding-top: 10px;
}

.company {
  display: flex;
  flex-direction: column;
  column-gap: 5px;
}

.company_header {
  height: 25px;
  display: flex;
  align-items: center;
  column-gap: 5px;
  line-height: 25px;
}

.department_header {
  height: 25px;
  display: flex;
  align-items: center;
  column-gap: 5px;
  line-height: 25px;

  margin-left: 20px;
}

.arrow_down {
  height: 15px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.position_header {
  height: 25px;
  display: flex;
  align-items: center;
  column-gap: 5px;
  line-height: 25px;

  margin-left: 40px;
}

.user_header {
  height: 25px;
  display: flex;
  align-items: center;
  column-gap: 5px;
  line-height: 25px;

  margin-left: 60px;
}

.allowedAll {
  margin-top: 30px;
}

.allowedAllChecked {
  margin-top: 30px;
  margin-bottom: 200px;
}

.allowedAll input,
.allowedAllChecked input {
  margin-right: 10px;
}
</style>
