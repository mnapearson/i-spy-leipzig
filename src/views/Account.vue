<template>
  <div>
    <div v-if="!user">
      <Login></Login>
    </div>
    <div v-if="user">
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

<style lang="scss" scoped></style>
