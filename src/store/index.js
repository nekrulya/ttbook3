import { createStore } from "vuex";
import axios from "axios";

const serverIp = "http:/192.168.102.201:8000/";
axios.defaults.baseURL = "http://192.168.102.201:8000/";

export default createStore({
  state: {
    HTMLWithSelectors: "",
    fileNames: [],
    api: {
      login: "user/auth",
      test: "user/checkAuth",
      gelAllowedFiles: "user/getAllowedFiles",
      createFile: "file/create",
      deleteFile: "file/delete/",
      viewFile: "file/getInfo/",
      editFile: "file/update/",
      getAllCopmpanies: "company/getAllCopmpanies",
      getDepartments: "company/getDepartments/",
      getPositions: "department/getPositions/",
      getUsers: "position/getUsers/",
      addAllowedCompany: "file/addAllowedCompany",
      removeAllowedCompany: "file/removeAllowedCompany",
      addAllowedDepartment: "file/addAllowedDepartment",
      removeAllowedDepartment: "file/removeAllowedDepartment",
      addAllowedPosition: "file/addAllowedPosition",
      removeAllowedPosition: "file/removeAllowedPosition",
      addAllowedUser: "file/addAllowedUser",
      removeAllowedUser: "file/removeAllowedUser",
      getSectionInfo: "section/getInfo/",
      getFilesWithoutSection: "file/getFilesBySectionID?section_id=0",
      delFileFromSection: "section/removeFile",
      addFileToSection: "section/addFile",
      editSection: "section/update/",
      createSection: "section/create",
      deleteSection: "section/delete/",
      getCurrentUser: "user/getInfo",
      getAllUsers: "user/getAllUsers",
      getUserInfoById: "user/getInfo/",
      deleteUser: "user/delete/",
      updateUser: "user/update/",
      changeUserPasswordById: "user/changePass/",
      addUser: "user/add",
    },
    file: {
      name: "Без названия",
      code: "пусто",
      id: -1,
      url: "",
      allowed_all: false,
      section_id: null,
    },
    section: {
      id: -1,
      name: "пусто",
      file_list: [],
      allowed_all: false,
      allowed_users: [],
      allowed_positions: [],
      allowed_departments: [],
      allowed_companies: [],
    },
    user: {
      id: -1,
      fname: "",
      lname: "",
      mname: "",
      fullname: "",
      company: "",
      department: "",
      position: "",
      email: "",
      office_phone: "",
      phone: "",
      status: "",
      is_admin: false,
    },
    userToEdit: {
      id: -1,
      fname: "",
      lname: "",
      mname: "",
      fullname: "",
      company: "",
      department: "",
      position: "",
      email: "",
      office_phone: "",
      phone: "",
      status: "",
      is_admin: false,
    },
    users: [],
    files_without_section: [],
    companies: [],
    currentFileUsers: [],
    newSection: { name: "Новый раздел", allowed_all: false },
  },
  getters: {
    getPageHTML(state) {
      return state.pageHTML;
    },
    getHTMLWithSelectors(state) {
      return state.HTMLWithSelectors;
    },
    getFileCode(state) {
      return state.file.code;
    },
    getHeadingsFromPageHTML(state) {
      let text = state.HTMLWithSelectors ? state.HTMLWithSelectors : "";
      const headings = [];
      let counter = 0;
      let parentCounter = 0;
      let childCounter = 0;
      while (text.includes("<h2") || text.includes("<h3")) {
        const h3Start = text.indexOf("<h2");
        const h3End = text.indexOf("</h2>");
        const h4Start = text.indexOf("<h3");
        const h4End = text.indexOf("</h3>");
        const heading = {
          name: "untitled",
          id: 0,
          link: "#",
          tag: "",
          children: [],
        };
        if ((h3Start !== -1 && h3Start < h4Start) || h4Start === -1) {
          heading.name = text
            .slice(h3Start, h3End + 5)
            .replaceAll("<h2>", "")
            .replaceAll("</h2>", "")
            .replaceAll("<h3>", "")
            .replaceAll("</h3>", "")
            .replaceAll("<strong>", "")
            .replaceAll("</strong>", "")
            .replaceAll("<i>", "")
            .replaceAll("</i>", "");
          heading.name = heading.name.slice(heading.name.indexOf(">") + 1);
          heading.id = `parent` + parentCounter;
          heading.link = "#parent" + parentCounter;
          heading.tag = "h2";
          headings.push(heading);

          text = text.slice(h3End + 5);

          parentCounter++;
        } else if ((h4Start !== -1 && h4Start < h3Start) || h3Start === -1) {
          heading.name = text
            .slice(h4Start, h4End + 5)
            .replaceAll("<h2>", "")
            .replaceAll("</h2>", "")
            .replaceAll("<h3>", "")
            .replaceAll("</h3>", "")
            .replaceAll("<strong>", "")
            .replaceAll("</strong>", "")
            .replaceAll("<i>", "")
            .replaceAll("</i>", "");
          heading.name = heading.name.slice(heading.name.indexOf(">") + 1);
          heading.id = `child` + childCounter;
          heading.link = "#child" + childCounter;
          heading.tag = "h3";

          const parent = headings[headings.length - 1];
          parent.children.push(heading);

          text = text.slice(h4End + 5);

          childCounter++;
        }
        if (counter > 1000) {
          break;
        }

        counter++;
      }
      return headings;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUserToEdit(state, user) {
      state.userToEdit = user;
    },
    setAllUsers(state, users) {
      state.users = users;
    },
    setfileNames(state, content) {
      state.fileNames = content;
    },
    setEditingMode(state, value) {
      state.editingMode = value;
    },
    setFileName(state, value) {
      state.file.name = value;
    },
    setFileSectionId(state, value) {
      if (value !== null) {
        state.file.section_id = +value;
      } else {
        state.file.section_id = value;
      }
    },
    setFileCode(state, value) {
      state.file.code = value;
    },
    setFileId(state, value) {
      state.file.id = value;
    },
    setFile(state, value) {
      state.file = value;
    },
    setHTMLWithSelectors(state, text) {
      if (
        !text.includes("<h2>") &&
        !text.includes("<h3>") &&
        !text.includes("<h4>")
      ) {
        state.HTMLWithSelectors = text;
      } else {
        let h2Counter = 0;
        let h3Counter = 0;
        let h4Counter = 0;
        // while (text.includes("<h2>")) {
        //   const start = text.indexOf("<h2>");
        //   text =
        //     text.slice(0, start + 3) +
        //     ` id='greatparent` +
        //     h2Counter +
        //     `'` +
        //     text.slice(start + 3);
        //   h2Counter++;
        // }
        while (text.includes("<h2>")) {
          const start = text.indexOf("<h2>");
          text =
            text.slice(0, start + 3) +
            ` id='parent` +
            h2Counter +
            `'` +
            text.slice(start + 3);
          h2Counter++;
        }
        while (text.includes("<h3>")) {
          const start = text.indexOf("<h3>");
          text =
            text.slice(0, start + 3) +
            ` id='child` +
            h3Counter +
            `'` +
            text.slice(start + 3);
          h3Counter++;
        }
        state.HTMLWithSelectors = text;
        state.file.code = text;
      }
    },
    setHTMLWithSelectorsFromServer(state, text) {
      state.HTMLWithSelectors = text;
    },
    setCompanies(state, companies) {
      state.companies = companies;
    },
    setDepartments(state, tuple) {
      let companyId = tuple[0];
      let departments = tuple[1];
      let company = state.companies.filter(
        (company) => company.id == companyId
      )[0];
      company.departments = departments;
    },
    setPositions(state, tuple) {
      let companyId = tuple[0];
      let departmentId = tuple[1];
      let positions = tuple[2];
      let company = state.companies.filter(
        (company) => company.id == companyId
      )[0];
      let department = company.departments.filter(
        (dep) => dep.id == departmentId
      )[0];
      department.positions = positions;
    },
    setUsers(state, tuple) {
      let companyId = tuple[0];
      let departmentId = tuple[1];
      let positionId = tuple[2];
      let users = tuple[3];
      let company = state.companies.filter(
        (company) => company.id == companyId
      )[0];
      let department = company.departments.filter(
        (dep) => dep.id == departmentId
      )[0];
      let position = department.positions.filter(
        (pos) => pos.id == positionId
      )[0];
      position.users = users;
    },
    setSection(state, section) {
      section.file_list.sort();
      state.section = section;
    },
    setFilesWithoutSection(state, files_without_section) {
      files_without_section.sort();
      state.files_without_section = files_without_section;
    },
    setSectionName(state, name) {
      state.section.name = name;
    },
    setNewSection(state, tuple) {
      state.newSection.name = tuple.name;
      state.newSection.allowed_all = tuple.allowed_all;
    },
  },
  actions: {},
  modules: {},
});
