<template>
  <div id="app">
    <header>
      <div
        class="backdrop"
        :style="{
          'background-image': 'url(' + require('./assets/ispyback.png') + ')',
        }"
      >
        <p class="title">I SPY LEIPZIG</p>
      </div>
    </header>
    <footer>
      <button>
        <router-link class="link" to="/">SPY BOARD</router-link>
      </button>
      <button>
        <router-link class="link" to="spy">SPY SUM1</router-link></button
      ><button>
        <router-link class="link" to="/About">INFO</router-link>
      </button>

      <button v-if="user">
        <router-link class="link" to="/Account">Account</router-link>
      </button>
    </footer>
    <router-view />
  </div>
</template>

<script>
import firebase from "firebase";
import { mapState } from "vuex";

export default {
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
  mounted() {
    this.$store.dispatch("bindPosts");
  },
};
</script>

<style>
* {
  margin: 0 auto;
  font-family: "Roboto Mono", monospace;
}

button {
  text-transform: uppercase;
}

.backdrop {
}

.title {
  background-color: #ebebeb;
  display: flex;
  justify-content: center;
  color: black;
  mix-blend-mode: screen;
  width: 100vw;
  font-size: 60pt;
  font-weight: bolder;
  text-align: center;
  -webkit-text-stroke: 4px red;
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
