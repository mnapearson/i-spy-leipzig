<template>
  <div id="app">
    <div class="top">
      <!-- <header>
        <div
          class="backdrop"
          :style="{
            'background-image': 'url(' + require('./assets/ispyback.png') + ')',
          }"
        >
          <div class="scroll-left">
            <p class="title">I SPY LEIPZIG</p>
          </div>
        </div>
      </header> -->
      <div class="navigation" v-if="user">
        <nav>
          <router-link class="link" to="/home"
            ><img src="@/assets/pepicons_eyesmall.png"
          /></router-link>

          <router-link class="link" to="spy"
            ><img src="@/assets/postbutton.png"
          /></router-link>
          <!-- <router-link class="link" to="/About"
              ><i class="fas fa-question-circle"></i
            ></router-link> -->

          <router-link class="link" to="/Account">
            <img src="@/assets/accounblack.png"
          /></router-link>

          <button v-if="user" @click.prevent="signOut">
            <img src="@/assets/logout.png" />
          </button>
        </nav>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import firebase from "firebase";
import { mapState } from "vuex";

// !(function(c, h, i, m, p) {
//   (m = c.createElement(h)),
//     (p = c.getElementsByTagName(h)[0]),
//     (m.async = 1),
//     (m.src = i),
//     p.parentNode.insertBefore(m, p);
// })(
//   document,
//   "script",
//   "https://chimpstatic.com/mcjs-connected/js/users/5f78af9fc7357fc23c978ed4e/6adeb96aeca859793e27e77b6.js"
// );

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
  font-family: "Roboto Mono", monospace;
  margin: 0 auto;
}

.a {
  cursor: pointer;
  text-transform: italic;
}

header {
  cursor: zoom-in;
}

button {
  text-transform: uppercase;
  cursor: pointer;
}

.title {
  background-color: white;
  display: flex;
  justify-content: center;
  color: white;
  mix-blend-mode: screen;
  width: 100vw;
  font-size: 70pt;
  font-weight: bold;
  text-align: center;
  -webkit-text-stroke: 4px black;
  flex-wrap: nowrap;
}

.navigation {
  position: fixed;
  bottom: 0;
  margin-top: 2rem;
  width: 100%;
  background-color: white;
  border-top: 1px solid black;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
}

.navigation button {
  background-color: white;
  border: none;
  margin-left: -1rem;
}

.link {
  text-decoration: none;
  text-transform: italic;
  color: black;
}

.validate {
  display: flex;
  justify-content: center;
  align-items: center;
}

#mc_embed_signup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 1rem;
  margin-bottom: 3rem;
  margin-left: 1rem;
}

#mc_embed_signup_scroll {
  display: flex;
  margin-top: 0.5rem;
}
.scroll-left {
  height: 90px;
  overflow: hidden;
  position: relative;
  flex-wrap: nowrap;
  white-space: nowrap;
}
.scroll-left p {
  position: absolute;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  line-height: 82px;
  text-align: center;
  text-shadow: 5px 6px;
  /* Starting position */
  -moz-transform: translateX(100%);
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
  /* Apply animation to this element */
  -moz-animation: scroll-left 10s linear infinite;
  -webkit-animation: scroll-left 10s linear infinite;
  animation: scroll-left 30s linear infinite;
}
/* Move it (define the animation) */
@-moz-keyframes scroll-left {
  0% {
    -moz-transform: translateX(100%);
  }
  100% {
    -moz-transform: translateX(-100%);
  }
}
@-webkit-keyframes scroll-left {
  0% {
    -webkit-transform: translateX(100%);
  }
  100% {
    -webkit-transform: translateX(-100%);
  }
}
@keyframes scroll-left {
  0% {
    -moz-transform: translateX(100%); /* Browser bug fix */
    -webkit-transform: translateX(100%); /* Browser bug fix */
    transform: translateX(100%);
  }
  100% {
    -moz-transform: translateX(-100%); /* Browser bug fix */
    -webkit-transform: translateX(-100%); /* Browser bug fix */
    transform: translateX(-100%);
  }
}
</style>
