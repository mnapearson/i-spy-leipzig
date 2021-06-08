<template>
  <div>
    <div v-if="!user">
      <Login></Login>
    </div>
    <div class="account" v-if="user">
      <h2>your account settings</h2>
      <div class="account-info">
        <div class="input email">
          <p>email:</p>
          <p>{{ this.user.email }}</p>
        </div>
        <div class="input name">
          <p>name:</p>
          <p>{{ this.$store.getters.myProfile.name }}</p>
        </div>
        <div class="input username">
          <p>username:</p>
          <p>{{ this.$store.getters.myProfile.userName }}</p>
        </div>
        <div class="input age">
          <p>age:</p>
          <p>{{ this.$store.getters.myProfile.age }}</p>
        </div>
        <div class="input gender">
          <p>gender:</p>
          <p>{{ this.$store.getters.myProfile.gender }}</p>
        </div>
      </div>
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
  mounted() {
    this.myProfile = this.$store.getters.myProfile;
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

.account-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.input {
  display: flex;
  justify-content: flex-end;
  margin: 2rem;
}

.input p {
  padding: 0 0.5rem;
  display: flex;
}
</style>
