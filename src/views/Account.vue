<template>
  <div>
    <div v-if="!user">
      <Login></Login>
    </div>
    <div class="account" v-if="user">
      <h2>your account settings</h2>
      <button @click.prevent="signOut">BYE</button>
    </div>
  </div>
</template>

<script>
import Login from "../components/Login";
import { mapState } from "vuex";
import firebase from "firebase";

export default {
  name: "Account",
  components: {
    Login,
  },
  computed: {
    ...mapState(["user", "posts"]),
  },

  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({
            name: "Bye",
          });
        });
    },
  },
};
</script>

<style scoped>
.account {
  margin: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button {
  margin-top: 3rem;
  height: 30px;
  width: 50px;
}
</style>
