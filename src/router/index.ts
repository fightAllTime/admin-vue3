import { createRouter, createWebHistory } from "vue-router";

import Layout from "@/components/Layout/index.vue";

import Dashboard from "@/pages/dashboard/DashBoardMain.vue";

import Users from "@/pages/user/UserMain.vue";
import RoleManage from "@/pages/roleManage/index.vue";

import Prommit from "@/pages/prommit/PrommitMain.vue";

import System from "@/pages/system/SystemMain.vue";

import Login from "@/pages/login/loginPage/index.vue";

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        redirect: "/dashboard",
      },
      {
        path: "dashboard",
        component: Dashboard,
        meta: { title: "仪表盘" },
      },
      {
        path: "users",
        component: Users,
        meta: { title: "用户管理" },
      },
      {
        path: "roleManage",
        component: RoleManage,
        meta: { title: "角色管理" },
      },
      { path: "prommit", component: Prommit, meta: { title: "权限管理" } },
      { path: "system", component: System, meta: { title: "系统管理" } },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  // ✅ 拦截首页
  if (to.path === "/" && !token) {
    return next("/login");
  }

  // ✅ 拦截后台页面
  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }

  next();
});

export default router;
