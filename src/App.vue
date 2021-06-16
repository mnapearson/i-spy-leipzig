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
      <div v-if="!user">
        <!-- Begin Mailchimp Signup Form -->
        <div id="mc_embed_signup">
          <p>get fresh spies and hot tips in your inbox weekly</p>
          <form
            action="https://Ispyleipzig.us6.list-manage.com/subscribe/post?u=5f78af9fc7357fc23c978ed4e&amp;id=955aeb0b5c"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            class="validate"
            target="_blank"
            novalidate
          >
            <div id="mc_embed_signup_scroll">
              <div id="mce-responses" class="clear">
                <div
                  class="response"
                  id="mce-error-response"
                  style="display:none"
                ></div>
                <div
                  class="response"
                  id="mce-success-response"
                  style="display:none"
                ></div>
              </div>
              <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
              <div
                style="position: absolute; left: -5000px;"
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="b_5f78af9fc7357fc23c978ed4e_955aeb0b5c"
                  tabindex="-1"
                  value=""
                />
              </div>
              <div class="clear">
                <input
                  type="submit"
                  value="YES"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  class="button"
                />
              </div>
            </div>
          </form>
        </div>

        <!--End mc_embed_signup-->
      </div>
      <nav>
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
      </nav>
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

header {
  cursor: pointer;
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

nav {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.link {
  text-decoration: none;
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
  margin-bottom: 3rem;
}

#mc_embed_signup_scroll {
  display: flex;
  margin-top: 0.5rem;
}
</style>
