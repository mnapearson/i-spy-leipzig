import Vue from "vue";
import Router from "vue-router";
import Register from "../views/Register";
import About from "../views/About";
import Home from "../views/Home";
import Bye from "../views/Bye";
import Spy from "../views/Spy";
import Verify from "../views/Verify";
import Account from "../views/Account";
import Messages from "../views/Messages";
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
      path: "/messages",
      name: "messages",
      component: Messages,
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
    next("/");
  } else {
    next();
  }
});

export default router;
