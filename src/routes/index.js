import Vue from "vue";
import Router from "vue-router";
import Login from "../components/Login";
import Register from "../components/Register";
import About from "../components/About";
import Home from "../components/Home";
import Bye from "../components/Bye";
import Spy from "../components/Spy";

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
    },
    {
      path: "/spy",
      name: "Spy",
      component: Spy,
    },
  ],
});

export default router;
