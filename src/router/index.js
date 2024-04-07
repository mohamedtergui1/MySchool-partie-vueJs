import { createRouter, createWebHistory } from "vue-router";

import GuestLayout from "@/layouts/GuestLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

const _import_ = (file) => () => import("../views/" + file + ".vue");
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/r",
      component: GuestLayout,
      redirect: "/",
      children: [
        {
          path: "/",
          name: "home",
          component: _import_("HomeView"),
        },
        {
          path: "/about",
          name: "about",
          component: _import_("AboutView"),
        },
        {
          path: "/login",
          name: "login",
          component: _import_("Login"),
        },
        {
          path: "/signup",
          name: "signup",
          component: _import_("Signup"),
        },
      ],
    },
    {
      path: "/admin",
      component: AdminLayout,
      redirect: "/dashboard",
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: _import_("admin/Dashboard"),
        },
        {
          path: "/users",
          name: "users",
          component: _import_("admin/Users"),
        },
        {
          path: "/promos",
          name: "promos",
          component: _import_("admin/Promos"),
        },
        {
          path: "/grades",
          name: "grades",
          component: _import_("admin/Grades"),
        },
        {
          path: "/classrooms",
          name: "classrooms",
          component: _import_("admin/Classrooms"),
        },
      ],
    },
    {
      path: "/test",
      component: _import_("Applaoding"),
      name: "test",
    },
  ],
});

export default router;
