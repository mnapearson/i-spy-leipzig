<template>
  <div>
    <header>Your Account info</header>
    <div class="account-info">
      <div class="input email">
        <p>email:</p>
        {{ this.user.email }}
      </div>
      <div class="input firstname">
        <p>first name:</p>
        {{ this.$store.getters.myProfile.firstName }}
      </div>
      <div class="input lastname">
        <p>last name:</p>
        {{ this.$store.getters.myProfile.lastName }}
      </div>
      <div class="input username">
        <p>username:</p>
        {{ this.$store.getters.myProfile.userName }}
      </div>
      <div class="input age">
        <p>birthdate:</p>
        {{ this.$store.getters.myProfile.birthdate.toDate() | formatBirthdate }}
      </div>
      <div class="input gender">
        <p>gender:</p>
        {{ this.$store.getters.myProfile.gender }}
      </div>
      <button v-if="user" @click.prevent="signOut">
        <img src="@/assets/Focusaccountlogout.png" />
      </button>
      <router-link class="extras" to="/about"
        >WANT TO EDIT YOUR INFO? <br />
        CONTACT US.</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase";

export default {
  name: "Account",

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
header {
  background-color: #5fa7e9;
  padding: 0.5rem;
}

.extras {
  margin-top: 4rem;
  color: black;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
}

.extras:hover {
  text-decoration: underline;
}

.account-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.input {
  min-width: 300px;
  max-width: 700px;
  padding: 0.5rem;
  background-color: #5fa7e9;
  border: none;
  margin-top: 1rem;
  color: black;
}

p {
  margin-bottom: 0.1rem;
  text-transform: uppercase;
  font-size: 12px;
}

button {
  background: none;
  border: none;
  margin-top: 3rem;
}
</style>
