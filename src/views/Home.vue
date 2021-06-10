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

    <footer></footer>
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
</style>
