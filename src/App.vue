<template>
  <div id="app">
    <header><img src="./assets/ISPYBANNER.png" alt="" /></header>
    <router-view />
    <div id="nav">
      <footer>
        <button><router-link class="link" to="/">HOME</router-link></button>
        <button>
          <router-link class="link" to="/About">INFO</router-link></button
        ><button><router-link class="link" to="spy">SPY</router-link></button
        ><button>
          <router-link class="link" to="/login">HI</router-link>
        </button>
        <button class="link" @click.prevent="signOut">
          BYE
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
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

<style>
* {
  margin: 0 auto;
  font-family: "Roboto Mono", monospace;
}

header img {
  width: 100%;
  height: 100%;
}

footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 4rem;
  width: 50%;
}

.link {
  text-decoration: none;
  color: black;
}
</style>
