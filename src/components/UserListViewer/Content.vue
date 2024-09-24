<template>
  <div class="backToDocs" @click="backToDocs">
    <img src="@/assets/BackToDocsArrow.png" alt="user photo" />
    <span>Назад к документам</span>
  </div>
  <div class="users">
    <div class="users_header">
      <div class="totalUsers">Все пользователи: {{ this.users.length }}</div>
      <div class="addUser" @click="OpenAddUser()">+ Добавить пользователя</div>
    </div>
    <table class="users_table">
      <thead class="users_table_head">
        <tr class="users_table_head_tr">
          <th class="users_table_th">фото</th>
          <th class="users_table_th">ФИО, Почта</th>
          <th class="users_table_th">Телефон</th>
          <th class="users_table_th">Статус</th>
          <th class="users_table_th"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in this.users" :key="user.id">
          <td class="users_table_td">
            <img class="user_photo" src="@/assets/user.png" alt="user photo" />
          </td>
          <td class="users_table_td">
            <span>{{ user.fullname }}</span>
            <br />
            <span>{{ user.email }}</span>
          </td>
          <td class="users_table_td">
            <span>{{ user.phone }}</span>
            <br />
            <span>{{ user.office_phone }}</span>
          </td>
          <td class="users_table_td">
            <span class="user_status">{{ user.status }}</span>
          </td>
          <td
            v-if="user.id"
            class="users_table_td"
            :id="user.id"
            @click="openUserEdit(user.id)"
            style="cursor: pointer"
            :user_id="user.id"
          >
            <img class="editUser" src="@/assets/editUser.png" alt="edit user" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Modal v-model:visible="showModal">
    <div class="modalContent">
      <div class="modalContentHead"></div>
      <div class="userEditAvatar">
        <img class="user_photo" src="@/assets/user.png" alt="user photo" />
      </div>
      <!-- <div class="usernameUserToEdit">
        {{ this.userToEdit.fullname }}
      </div>
      <div class="emailUserToEdit">
        {{ this.userToEdit.email }}
      </div> -->
      <div class="nameSurnameMiddlename">
        <div>ФИО</div>
        <div class="inputs">
          <input
            type="text"
            class="surname_input modal-input"
            v-model="this.surname"
          />
          <input type="text" class="name_input modal-input" v-model="name" />
          <input
            type="text"
            class="middlename_input modal-input"
            v-model="middlename"
          />
        </div>
      </div>
      <div class="email">
        <div>Почта</div>
        <div class="inputs">
          <input type="text" class="email_input modal-input" v-model="email" />
        </div>
      </div>
      <div class="phones">
        <div>Тел.</div>
        <div class="inputs">
          <input type="text" class="phone_input modal-input" v-model="phone" />
          <input
            type="text"
            class="office_phone_input modal-input"
            v-model="office_phone"
          />
        </div>
      </div>
      <div class="companySelectors">
        <div>Орг.</div>
        <div class="inputs">
          <select v-model="companyOption" class="modal-input">
            <option
              v-for="company in companies"
              :key="company.id"
              :value="company.id"
            >
              {{ company.name }}
            </option>
          </select>
          <select v-model="departmentOption" class="modal-input">
            <option
              v-for="department in companies.find(
                (company) => company.id === companyOption
              )?.departments"
              :key="department.id"
              :value="department.id"
            >
              {{ department.name }}
            </option>
          </select>
          <select v-model="positionOption" class="modal-input">
            <option
              v-for="position in companies
                .find((company) => company.id === companyOption)
                ?.departments.find((dep) => dep.id === departmentOption)
                ?.positions"
              :key="position.id"
              :value="position.id"
            >
              {{ position.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="status">
        <div>Статус</div>
        <div class="inputs">
          <select v-model="statusOption" class="modal-input">
            <option value="Работает">Работает</option>
            <option value="Отпуск">Отпуск</option>
            <option value="Больничный">Больничный</option>
            <option value="УВОЛЕН">УВОЛЕН</option>
          </select>
        </div>
      </div>
      <div class="adminStatus">
        <div>Админ.</div>
        <div class="inputs">
          <input type="checkbox" v-model="isAdminStatus" />
        </div>
      </div>
      <div class="userPassword">
        <div class="userPasswordLabel">
          <label for="user_password">Пароль</label
          ><input
            type="checkbox"
            name="user_password"
            id="user_password"
            v-model="showPasswordInput"
          />
        </div>
        <div class="inputs">
          <input
            type="password"
            class="password_input modal-input"
            v-model="userPassword"
            v-if="showPasswordInput"
            required
          />
        </div>
      </div>
      <div class="buttons" v-if="userEditing">
        <div class="deleteButton" @click="deleteUser()">
          <img src="@/assets/delete red.png" alt="delete user" />
          Удалить пользователя
        </div>
        <div class="cancelButton" @click="cancelEditing()">Отмена</div>
        <div class="submitButton" @click="updateUser()">Сохранить</div>
      </div>
      <div class="buttons" v-else>
        <div class="cancelButton" @click="cancelEditing()">Отмена</div>
        <div class="submitButton" @click="addUser()">Сохранить</div>
      </div>
    </div>
  </Modal>
</template>

<script>
import axios from "axios";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import Modal from "../Modal.vue";

export default {
  props: {},
  data() {
    return {
      showModal: false,
      user_id: -1,
      surname: "",
      name: "",
      middlename: "",
      email: "",
      phone: "",
      office_phone: "",
      companyOption: "",
      departmentOption: "",
      positionOption: "",
      statusOption: "",
      isAdminStatus: false,
      userPassword: "",
      showPasswordInput: false,
      userEditing: false,
    };
  },

  components: {
    Modal,
  },

  computed: {
    ...mapState({
      api: (state) => state.api,
      users: (state) => state.users,
      userToEdit: (state) => state.userToEdit,
      companies: (state) => state.companies,
    }),
  },

  methods: {
    ...mapMutations({
      setAllUsers: "setAllUsers",
      setUserToEdit: "setUserToEdit",
      setCompanies: "setCompanies",
      setDepartments: "setDepartments",
      setPositions: "setPositions",
    }),

    backToDocs() {
      this.$router.push("/home");
    },

    openUserEdit(user_id) {
      this.showModal = true;
      this.userEditing = true;
      this.userPassword = "";
      this.showPasswordInput = false;
      console.log(user_id);

      const token = localStorage.accessToken;
      console.log(this.api.getUserInfoById + user_id);

      axios({
        method: "get",
        url: this.api.getUserInfoById + user_id,
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
          this.setUserToEdit(user);
          console.log(user);

          this.user_id = user.id;
          this.surname = user.lname;
          this.name = user.fname;
          this.middlename = user.mname;
          this.email = user.email;
          this.phone = user.phone;
          this.office_phone = user.office_phone;
          this.companyOption = user.company_id;
          this.departmentOption = user.department_id;
          this.positionOption = user.position_id;
          this.statusOption = user.status;
          this.isAdminStatus = user.is_admin;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    deleteUser() {
      const token = localStorage.getItem("accessToken");
      if (
        confirm(
          `Вы уверены, что хотите удалить пользователя ${this.userToEdit.fullname}?`
        )
      ) {
        axios({
          method: "delete",
          url: this.api.deleteUser + this.userToEdit.id,
          params: {},
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ` + token,
          },
        })
          .then((response) => {
            console.log(response.data);
            axios({
              method: "get",
              url: this.api.getAllUsers,
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
                this.setAllUsers(users);
                this.cancelEditing();
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
    cancelEditing() {
      this.showModal = false;
      this.userEditing = false;
    },
    updateUser() {
      const token = localStorage.getItem("accessToken");

      let newUserInfo = {
        firstname: this.name,
        lastname: this.surname,
        middlename: this.middlename,
        phone: this.phone,
        company_id: this.companyOption,
        department_id: this.departmentOption,
        position_id: this.positionOption,
        email: this.email,
        office_phone: this.office_phone,
        is_admin: this.isAdminStatus,
        status: this.statusOption,
      };

      axios({
        method: "put",
        url: this.api.updateUser + this.user_id,
        params: {},
        data: newUserInfo,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ` + token,
        },
      })
        .then((response) => {
          this.showModal = false;
          this.userEditing = false;
          axios({
            method: "get",
            url: this.api.getAllUsers,
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
              this.setAllUsers(users);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
      if (this.showPasswordInput) {
        axios({
          method: "put",
          url: this.api.changeUserPasswordById + this.user_id,
          params: {},
          data: { password: this.userPassword },
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ` + token,
          },
        })
          .then((response) => {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      this.$router.push("/userlist");
    },

    OpenAddUser() {
      this.surname = "";
      this.name = "";
      this.middlename = "";
      this.email = "";
      this.phone = "";
      this.office_phone = "";
      this.companyOption = "";
      this.departmentOption = "";
      this.positionOption = "";
      this.statusOption = "";
      this.isAdminStatus = false;
      this.userPassword = "";

      this.showModal = true;
      this.userEditing = false;
    },

    addUser() {
      let newUserInfo = {
        firstname: this.name,
        lastname: this.surname,
        middlename: this.middlename,
        phone: this.phone,
        company_id: this.companyOption,
        department_id: this.departmentOption,
        position_id: this.positionOption,
        email: this.email,
        office_phone: this.office_phone,
        is_admin: this.isAdminStatus,
        status: this.statusOption,
        password: this.userPassword,
      };

      console.log(newUserInfo);

      // "firstname": "string",
      // "lastname": "string",
      // "middlename": "string",
      // "company_id": 0,
      // "department_id": 0,
      // "position_id": 0,
      // "email": "user@example.com",
      // "password": "string",
      // "office_phone": "string",
      // "phone": "string",
      // "is_admin": false,
      // "status": "string"

      const token = localStorage.getItem("accessToken");

      axios({
        method: "post",
        url: this.api.addUser,
        params: {},
        data: newUserInfo,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ` + token,
        },
      })
        .then((response) => {
          const token = localStorage.accessToken;
          axios({
            method: "get",
            url: this.api.getAllUsers,
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
              this.setAllUsers(users);
              this.showModal = false;
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  mounted() {
    const token = localStorage.accessToken;
    axios({
      method: "get",
      url: this.api.getAllUsers,
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
        this.setAllUsers(users);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios({
      method: "get",
      url: this.api.getAllCopmpanies,
      params: {},
      data: {},
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ` + token,
      },
    })
      .then((response) => {
        let companies = response.data;
        this.setCompanies(companies);
        for (let company of companies) {
          axios({
            method: "get",
            url: this.api.getDepartments + company.id,
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
              this.setDepartments([company.id, departments]);

              for (let dep of company.departments) {
                axios({
                  method: "get",
                  url: this.api.getPositions + dep.id,
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
                    this.setPositions([company.id, dep.id, positions]);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.users {
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 20px auto;

  font-family: "Roboto Mono";
}

.users_header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-bottom: 8px;
}

.addUser {
  padding: 8px;

  border-radius: 5px;

  background-color: #373737;
  color: #ffffff;

  cursor: pointer;
}

.users_body {
  width: 100%;
}

.users_table_th {
  padding: 8px 10px;
}

.users_table_td {
  padding: 8px 10px;

  border-bottom: 1px solid #ebebeb;
}

.user_photo {
  width: 50px;
}

/* .user_status {
  margin-right: 80px;
} */

.editUser {
  height: 20px;
  cursor: pointer;
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

.modalContent {
  position: relative;
  width: 420px;
  height: auto;

  padding: 20px;

  border-radius: 20px;

  background-color: #fff;
  font-family: "Roboto Mono";
}

.modalContentHead {
  position: absolute;
  height: 56px;
  width: 420px;

  margin-bottom: 48px;

  border-radius: 20px 20px 0 0;

  background-color: #ebebeb;

  top: 0;
  left: 0;
  z-index: 10;
}

.userEditAvatar {
  position: absolute;

  background-color: #fff;
  border-radius: 50%;

  padding: 3px;

  z-index: 15;
}

.usernameUserToEdit {
  margin-top: 60px;
  font-weight: bold;
  text-align: left;
}

.emailUserToEdit {
  padding: 10px 0;
  margin-bottom: 10px;

  border-bottom: 1px solid #ebebeb;

  font-weight: lighter;
  text-align: left;

  color: #898989;
}

.nameSurnameMiddlename {
  width: 100%;
  display: flex;
  justify-content: space-between;

  padding-bottom: 10px;
  margin-top: 60px;
  margin-bottom: 10px;

  border-bottom: 1px solid #ebebeb;
}

.inputs {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  row-gap: 10px;
}

.modal-input {
  width: 283px;

  padding: 5px;
  border: 1px solid #c6c6c6;
  border-radius: 8px;
}

.email {
  display: flex;
  justify-content: space-between;

  padding-bottom: 10px;
}

.phones {
  display: flex;
  justify-content: space-between;

  padding-bottom: 10px;
  margin-bottom: 10px;

  border-bottom: 1px solid #ebebeb;
}

.companySelectors {
  display: flex;
  justify-content: space-between;

  padding-bottom: 10px;
  margin-bottom: 10px;

  border-bottom: 1px solid #ebebeb;
}

.status {
  display: flex;
  justify-content: space-between;

  padding-bottom: 10px;
  margin-bottom: 10px;

  border-bottom: 1px solid #ebebeb;
}

.adminStatus {
  display: flex;
  justify-content: space-between;

  padding-bottom: 10px;
  margin-bottom: 10px;

  border-bottom: 1px solid #ebebeb;
}

.userPassword {
  display: flex;
  justify-content: space-between;

  padding-bottom: 10px;
  margin-bottom: 10px;

  border-bottom: 1px solid #ebebeb;
}

.userPasswordLabel {
  display: flex;
  align-items: center;
  column-gap: 10px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  column-gap: 8px;

  font-size: 14px;
}

.deleteButton {
  padding: 7px;

  border-radius: 7px;

  color: #fc0005;
  background-color: #ffd0d0;

  cursor: pointer;
}

.cancelButton {
  padding: 7px;

  border-radius: 7px;

  border: 1px solid #000;

  cursor: pointer;
}

.submitButton {
  padding: 7px;

  border-radius: 7px;

  color: #fff;
  background-color: #000;

  cursor: pointer;
}
</style>
