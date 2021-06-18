<template>
  <div class="home">
    <section>
      <div class="top" v-if="user">
        Hi, {{ this.$store.getters.myProfile.userName }}, have you been spied?
      </div>
      <PostFilter></PostFilter>
      <div class="main-container">
        <div class="posts-title">
          <div class="col">Spy</div>
          <div class="col">Post</div>
        </div>
        <div class="posts" v-for="post in sortedPosts" :key="post.id">
          <div class="row date">
            <div class="post-date">
              <p>{{ post.date.toDate() | formatDate }}</p>
            </div>
            <div class="post-author">
              <p>
                @{{ post.author }} <br />({{ post.age.toDate() | getAge }},
                {{ post.gender }})
              </p>
            </div>

            <button class="reply">
              <router-link to="/messages">reply</router-link>
            </button>
          </div>
          <div class="row text">
            <div class="post-title">
              "{{ post.title }}"
              <div class="post-details">
                <p>{{ post.dateSpied | formatDate }}</p>
                <p class="post-place">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="red"
                  >
                    <path
                      d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
                    /></svg
                  >{{ post.place }}
                </p>
              </div>
            </div>
            <div class="post-text">{{ post.text }}</div>
          </div>
        </div>
      </div>
    </section>
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
            <div style="position: absolute; left: -5000px;" aria-hidden="true">
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
    <footer>
      <div class="footer-left">
        <p>
          <a class="link" href="https://www.instagram.com/ispyleipzig/"
            >instagram</a
          >
        </p>
        <p>
          <a class="link" href="https://twitter.com/ISPYLEIPZIG">twitter</a>
        </p>
      </div>

      <div class="footer-right">
        <p>
          <router-link to="/privacy" class="link">privacy policy</router-link>
        </p>
        <p>
          <router-link to="/impressum" class="link">impressum</router-link>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PostFilter from "../components/PostFilter";

export default {
  name: "Home",

  components: {
    PostFilter,
  },
  computed: {
    ...mapState(["posts", "profiles", "user"]),
    allPosts() {
      const allPosts = this.$store.state.posts;
      return allPosts;
    },
    sortedPosts() {
      return this.posts.slice().sort((a, b) => {
        return b.date.seconds - a.date.seconds;
      });
    },
    author() {
      return this.profiles.find((profile) => profile.id == this.post.author);
    },
  },
  mounted() {
    this.myProfile = this.$store.getters.myProfile;
  },
};
</script>

<style scoped>
* {
  margin: 0 auto;
  font-family: "Roboto Mono", monospace;
}

h1 {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.top {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 2rem;
}

.top button {
  margin-top: 1rem;
}

.post-author {
  text-align: center;
}

.post-details {
  display: flex;
}

.post-details p {
  margin-right: 1rem;
}

.post-place {
  font-style: italic;
  text-transform: lowercase;
}

.post-spy {
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

section {
  margin-top: 3rem;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: red;
  text-transform: uppercase;
  width: 70%;
  margin-bottom: 2rem;
}

.posts {
  display: grid;
  grid-template-columns: 2fr 4fr;
  grid-template-rows: auto;
  column-gap: 3rem;
  width: 100%;
  margin-top: 2rem;
  align-items: flex-start;
  border-bottom: 2px red solid;
}

.posts-title {
  display: grid;
  grid-template-columns: 2fr 4fr;
  grid-template-rows: auto;
  column-gap: 4rem;
  width: 100%;
  margin-top: 2rem;
  align-items: flex-start;
}

.reply {
  margin: 1rem 0 2rem;
}

.reply a {
  text-decoration: none;
  color: black;
}

.col {
  display: flex;
  background-color: red;
  color: white;
  padding: 0.5rem;
  width: 100%;
}

.post-title p {
  font-weight: normal;
}

.post-title {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.post-text {
  text-transform: lowercase;
}

.row {
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  align-items: center;
  justify-content: center;
}

.row p {
  margin-bottom: 0.5rem;
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

footer {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 2rem 0 0;
  text-align: center;
}

.footer-left,
.footer-right {
  margin-bottom: 1rem;
  display: flex;
}

.footer-left p,
.footer-right p {
  margin: 0 1rem;
}
</style>
