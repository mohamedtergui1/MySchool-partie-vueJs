import { createRouter, createWebHistory } from "vue-router";
import { userAuthStore } from "@/stores/userAuthStore";
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
          path: "/contact",
          name: "contact",
          component: _import_("Contact"),
        },
        {
          path: "/login",
          name: "login",
          component: _import_("Login"),

          meta: {
            noAuth: true,
          },
        },
        {
          path: "/signup",
          name: "signup",
          component: _import_("Signup"),

          meta: {
            noAuth: true,
          },
        },
        {
          path: "/forgot-password",
          name: "forgotpassword",
          component: _import_("ForgotPassword"),
        },
        {
          path: "/reset-password",
          name: "reset-password",
          component: _import_("ResetPassword"),
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
          meta: {
            title: "dashboard",
            role: [1, 4,3,2],
          },
        },
        {
          path: "/students",
          name: "students",
          component: _import_("admin/Students"),
          meta: {
            title: "dashboard",
            role: [1, 4],
          },
        },
        {
          path: "/promos",
          name: "promos",
          component: _import_("admin/Promos"),
          meta: {
            title: "dashboard",
            role: [1, 4],
          },
        },
        {
          path: "/grades",
          name: "grades",
          component: _import_("admin/Grades"),
          meta: {
            title: "dashboard",
            role: [1, 4],
          },
        },
        {
          path: "/classrooms",
          name: "classrooms",
          component: _import_("admin/Classrooms"),
          meta: {
            title: "dashboard",
            role: [1, 4],
          },
        },
        {
          path: "/employees",
          name: "employees",
          component: _import_("admin/Employees"),
          meta: {
            title: "dashboard",
            role: [4, 1],
          },
        },
        {
          path: "/annonces",
          name: "annonces",
          component: _import_("admin/Annonces"),
          meta: {
            title: "dashboard",
            role: [4, 1],
          },
        },
        {
          path: "/lessons",
          name: "lessons",
          component: _import_("teacher/Lessons"),
          meta: {
            title: "dashboard",
            role: [4, 1],
          },
        },
        {
          path: "/exams",
          name: "exams",
          component: _import_("teacher/Exams"),
          meta: {
            title: "dashboard",
            role: [4, 1],
          },
        },
      ],
    },
    {
      path: "/forbidden",
      component: () => import("@/errors/403.vue"),
      name: "403",
    },
    {
      path: "/(.*)",
      component: () => import("@/errors/404.vue"),
      name: "404",
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.role) {
    if (!to.meta.role.includes(userAuthStore().role)) {
      next("/forbidden");
    }  
  }  
  if (to.meta && to.meta.noAuth) {
    if (localStorage.getItem("token")) {
      next("/");
      return;
    }
  }
  next();
});

export default router;
