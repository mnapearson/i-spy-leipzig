import Vue from "vue";
import Router from "vue-router";
import Register from "../views/Register";
import About from "../views/About";
import Home from "../views/Home";
import Login from "../components/Login";
import Bye from "../views/Bye";
import Spy from "../views/Spy";
import Verify from "../views/Verify";
import Account from "../views/Account";

import Terms from "../views/Terms";
import Privacy from "../views/Privacy";
import viewPost from "../views/viewPost";
import Impressum from "../views/Impressum";
import { auth } from "../firebase";
// import { hasOwnMetadata } from "core-js/fn/reflect";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/view-post:postid",
      name: "viewPost",
      component: viewPost,
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
        navBarColor: "#7101FF",
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
      meta: { navBarColor: "#5FA7E9" },
    },
    {
      path: "/terms",
      name: "terms",
      component: Terms,
    },
    {
      path: "/privacy",
      name: "privacy",
      component: Privacy,
    },
    {
      path: "/impressum",
      name: "impressum",
      component: Impressum,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next("/account");
  } else {
    next();
  }
});

export default router;
