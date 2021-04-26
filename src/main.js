import Vue from "vue";
import App from "./App.vue";
import router from "./routes/index";
import { firebase } from "@firebase/app";
import store from "./store";

Vue.config.productionTip = false;

// Your web app's Firebase configuration
var configOptions = {
  apiKey: "AIzaSyCIODgULKOSJiUDQ-VryqAW2UMMF1qBH94",
  authDomain: "fir-auth-e18f6.firebaseapp.com",
  projectId: "fir-auth-e18f6",
  storageBucket: "fir-auth-e18f6.appspot.com",
  messagingSenderId: "194089822349",
  appId: "1:194089822349:web:43c273b46b7207d9721ac4",
};
// Initialize Firebase
firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
