<template>
  <div class="home">
    <template>
      <h1>Hi,</h1>
    </template>

    <section>
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
        <div class="posts" v-for="post in $store.state.posts" :key="post.id">
          <div class="col">Date & User</div>

          <div class="col">Post</div>
          <div class="row date">
            <p>@{{ post.author }}</p>
            <p>{{ post.dateSpied.toDate().toLocaleDateString() }}</p>
            <button>reply</button>
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

export default {
  name: "Home",
  computed: {
    ...mapState(["posts"]),
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
  column-gap: 2rem;
  width: 100%;
  margin-top: 2rem;
}

.col {
  display: flex;
  background-color: red;
  color: white;
  padding: 0.5rem;
  width: 100%;
}

.post-date {
  margin-top: 1rem;
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
  margin-top: 2rem;
}

.row p {
  margin-bottom: 0.5rem;
}
</style>
