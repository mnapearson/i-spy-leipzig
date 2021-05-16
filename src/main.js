import Vue from "vue";
import App from "@/App.vue";
import { auth } from "@/firebase";
import { firestorePlugin } from "vuefire";
import store from "@/store";
import vSelect from "vue-select";
import Vuelidate from "vuelidate";
import router from "@/routes";

import "vue-select/dist/vue-select.css";

let markProfilesAsBound = null;
let profileBoolean = false;
export const boundProfiles = new Promise((resolve) => {
  markProfilesAsBound = resolve;
});

let markPostsAsBound = null;
let postBoolean = false;
export const boundPosts = new Promise((resolve) => {
  markPostsAsBound = resolve;
});

let markMessagesAsBound = null;
let messageBoolean = false;
export const boundMessages = new Promise((resolve) => {
  markMessagesAsBound = resolve;
});

let markFirebaseAuthAsConnected;
let firebaseAuthBoolean = false;
export const firebaseAuthConnected = new Promise((resolve) => {
  markFirebaseAuthAsConnected = resolve;
});

auth.onAuthStateChanged(async (user) => {
  if (firebaseAuthBoolean == false) {
    markFirebaseAuthAsConnected();
    firebaseAuthBoolean = true;
  }
  store.commit("SET_USER", user);
  if (user) {
    await store.dispatch("bindProfiles");
    if (profileBoolean == false) {
      markProfilesAsBound();
      profileBoolean = true;
    }

    await store.dispatch("bindMessages");
    if (messageBoolean == false) {
      markMessagesAsBound();
      messageBoolean = true;
    }

    await store.dispatch("bindPosts");
    if (postBoolean == false) {
      markPostsAsBound();
      postBoolean = true;
    }
  }
});

Vue.component("v-select", vSelect);

Vue.use(firestorePlugin);
Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
