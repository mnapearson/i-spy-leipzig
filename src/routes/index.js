import Vue from "vue";
import Router from "vue-router";
import Login from "../components/Login";
import Register from "../components/Register";
import About from "../components/About";
import Home from "../components/Home";
import Bye from "../components/Bye";
import Spy from "../components/Spy";
import Verify from "../components/Verify";
import Account from "../components/Account";
import { auth } from "../firebase";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },

    {
      path: "/bye",
      name: "Bye",
      component: Bye,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/spy",
      name: "Spy",
      component: Spy,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/verify",
      name: "Verify",
      component: Verify,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/account",
      name: "account",
      component: Account,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
