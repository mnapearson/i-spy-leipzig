<template>
  <div id="app">
    <div class="top">
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
    </div>
    <router-view />
  </div>
</template>

<script>
import firebase from "firebase";
import { mapState } from "vuex";

!(function(c, h, i, m, p) {
  (m = c.createElement(h)),
    (p = c.getElementsByTagName(h)[0]),
    (m.async = 1),
    (m.src = i),
    p.parentNode.insertBefore(m, p);
})(
  document,
  "script",
  "https://chimpstatic.com/mcjs-connected/js/users/5f78af9fc7357fc23c978ed4e/6adeb96aeca859793e27e77b6.js"
);

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
  margin: 1rem;
}

.title {
  background-color: white;
  display: flex;
  justify-content: center;
  color: black;
  mix-blend-mode: screen;
  width: 100vw;
  font-size: 70pt;
  text-align: center;
  -webkit-text-stroke: 4px black;
}

footer {
  display: flex;

  justify-content: center;
  margin-top: 4rem;
}

.link {
  text-decoration: none;
  color: black;
}
</style>
