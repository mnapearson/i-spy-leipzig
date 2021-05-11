<template>
  <div class="home">
    <section>
      <div class="top" v-if="!user">
        <Login></Login>
      </div>
      <div class="main-container">
        <div class="filter">
          <div class="title">Filter By</div>
          <div class="filter-buttons">
            <div class="option date">Date</div>
            <div class="option place">Place</div>
            <div class="option gender">ALL</div>
            <div class="detail">saw</div>
            <div class="option gender">ALL</div>
          </div>
        </div>
        <div class="posts-title">
          <div class="col">Date & Spy</div>
          <div class="col">Post</div>
        </div>
        <div class="posts" v-for="post in $store.state.posts" :key="post.id">
          <div class="row date">
            <div class="post-date">
              <p>{{ post.date.toDate() | formatDate }}</p>
            </div>
            <div class="post-author">
              <p>
                @{{ post.author }} <br />({{ post.age }}, {{ post.gender }})
              </p>
            </div>

            <button class="reply">reply</button>
          </div>
          <div class="row text">
            <div class="post-title">{{ post.title }}</div>
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
import Login from "./Login";

export default {
  name: "Home",
  components: {
    Login,
  },
  computed: {
    ...mapState(["posts", "profiles", "user"]),
    allPosts() {
      const allPosts = this.$store.state.posts;
      return allPosts;
    },
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
  width: 60%;
  margin-bottom: 2rem;
}

.filter {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.title {
  display: flex;
  border: 1px solid red;
  background-color: red;
  color: white;
  padding: 0.5rem;
  width: 100%;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
}

.option:hover {
  background: red;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.option {
  padding: 0.5rem;
  margin: 0.5rem;
  width: 75px;
  border: 1px solid red;
  text-align: center;
}

.posts {
  display: grid;
  grid-template-columns: 2fr 4fr;
  grid-template-rows: auto;
  column-gap: 4rem;
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

.col {
  display: flex;
  background-color: red;
  color: white;
  padding: 0.5rem;
  width: 100%;
}

.post-title {
  text-decoration: underline;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.post-text {
  text-transform: lowercase;
}

.row {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  align-items: center;
  justify-content: center;
}

.row p {
  margin-bottom: 0.5rem;
}
</style>
