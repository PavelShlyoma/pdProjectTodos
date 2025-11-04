import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import login from "../views/Login.vue"
import register from "../views/Register.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/login",
      name: "login",
      component: login,
      // redirect: () => {
      //   const authStore = useAuthStore();
      //   if (authStore.token) {
      //     return {
      //       path: "/home",
      //     }
      //   }
      // },
    },
    {
      path: "/register",
      name: "register",
      component: register,
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});
router.beforeEach(  (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const authStore = useAuthStore();
    if (!authStore.token) {
      authStore.refresh().finally(() => next());
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
