import { auth, db } from "@/firebase";
import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import moment from "moment";
import router from "@/routes";

Vue.use(Vuex);
Vue.use(moment);

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD.MM.YY");
  }
});

Vue.filter("formatBirthdate", function(value) {
  if (value) {
    return moment(String(value)).format("DD.MM.YY");
  }
});

Vue.filter("getAge", function(value) {
  var birthday = +new Date(value);
  return ~~((Date.now() - birthday) / 31557600000);
});

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
        state.messages = [];
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
    bindMessages: firestoreAction(({ bindFirestoreRef }) =>
      bindFirestoreRef("messages", db.collection("messages"))
    ),
    bindChat: firestoreAction(({ bindFirestoreRef }) =>
      bindFirestoreRef("chat", db.collection("chat"))
    ),
  },
});
