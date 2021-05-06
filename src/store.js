import { auth, db } from "@/firebase";
import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";

import router from "@/routes";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    profiles: [],
    posts: [],
  },
  getters: {
    myProfile: (state) => {
      return state.profiles.find((profile) => profile.id == state.user.uid);
    },
    getProfileById: (state) => (id) => {
      return state.profiles.find((profile) => profile.id == id);
    },
  },
  mutations: {
    ...vuexfireMutations,
    SET_USER(state, user) {
      state.user = user;
      if (!user) {
        state.profiles = [];
        state.posts = [];
      }
    },
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
  },
  actions: {
    async signInAgain() {
      await router.push({
        name: "Login",
      });
      await auth.signOut();
    },
    bindProfiles: firestoreAction(({ bindFirestoreRef }) =>
      bindFirestoreRef("profiles", db.collection("profiles"), { wait: true })
    ),
    bindPosts: firestoreAction(({ bindFirestoreRef }) =>
      bindFirestoreRef("posts", db.collection("posts"))
    ),
  },
});
