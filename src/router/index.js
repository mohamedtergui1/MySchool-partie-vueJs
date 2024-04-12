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
          meta: { title: "Home" },
        },
        {
          path: "/about",
          name: "about",
          component: _import_("AboutView"),
          meta: { title: "about" },
        },
        {
          path: "/login",
          name: "login",
          component: _import_("Login"),
          meta: { title: "login" },
        },
        {
          path: "/signup",
          name: "signup",
          component: _import_("Signup"),
        },
        {
          path: "/forgot-password",
          name: "forgotpassword",
          component: _import_("ForgotPassword"),
        },
        {
          path: "/reset-password",
          name: "reset-password",
          component: _import_("ResetPassword")
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
          meta: { title: "dashboard" },
        },
        {
          path: "/students",
          name: "students",
          component: _import_("admin/Students"),
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
      path: "/(.*)",
      component: () => import("@/errors/404.vue"),
      name: "404",
    },
  ],
});

export default router;
