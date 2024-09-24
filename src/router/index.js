import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TestHomeView from "../views/GDHomeView.vue";
import FileView from "../views/FileView.vue";
import NewFileView from "../views/NewFileView.vue";
import EditFileView from "../views/EditFileView.vue";
import EditSectionView from "@/views/EditSectionView.vue";
import axios from "axios";
import UserView from "@/views/UserView.vue";
import UserListView from "@/views/UserListView.vue";

const serverIp = "http://192.168.102.201:8000/";

async function isAuthenticated() {
  const token = localStorage.getItem("accessToken");
  let p = await axios({
    method: "get",
    url: serverIp + "user/checkAuth",
    params: {},
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ` + token,
    },
  })
    .then((response) => {
      // console.log(response.data);
      return true;
    })
    .catch(function (error) {
      return false;
    });
  return p;
}

const routes = [
  {
    path: "/",
    name: "start",
    component: HomeView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/GoogleDocTest",
    name: "GoogleDocTest",
    component: TestHomeView,
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/views/AuthView.vue"),
  },
  {
    path: "/file/:file_id",
    component: FileView,
    props: true,
  },
  {
    path: "/create_file/:section_id",
    component: NewFileView,
    props: true,
  },
  {
    path: "/edit_file/:file_id",
    component: EditFileView,
    props: true,
  },
  {
    path: "/edit_section/:section_id",
    component: EditSectionView,
    props: true,
  },
  {
    path: "/user",
    component: UserView,
    props: false,
  },
  {
    path: "/userlist",
    component: UserListView,
    props: false,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authResult = !(await isAuthenticated());
  if (to.name !== "auth" && authResult) {
    next({ name: "auth", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
