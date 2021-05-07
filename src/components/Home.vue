<template>
  <div class="home">
    <template>
      <h1>Hi,</h1>
    </template>

    <postSpy v-for="post in sortedPosts" :key="post.id"></postSpy>

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
        <div class="posts">
          <div class="col">Date & User</div>

          <div class="col">Post</div>
          <div class="row date">
            <p>@Frenchie</p>
            <p>25.04.21</p>
            <button>reply</button>
          </div>
          <div class="row text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis,
            doloribus at totam iste unde iusto enim odit molestiae dicta ad
            magni officia animi ullam laboriosam in soluta fuga accusantium sint
            consectetur? Dicta sit impedit iste, aliquid voluptatum, repudiandae
            ab magnam officiis reiciendis quisquam dolores necessitatibus ipsum
            perspiciatis qui itaque optio.
          </div>
          <div class="row date">
            <p>@SexyMicha</p>
            <p>22.04.21</p>
            <button>reply</button>
          </div>
          <div class="row text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
            tempora ex consectetur necessitatibus? Inventore, magni voluptatibus
            iste blanditiis reprehenderit sapiente.
          </div>
        </div>
      </div>
    </section>

    <footer></footer>
  </div>
</template>

<script>
import postSpy from "../components/Spy";
import { mapState } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState(["posts"]),
    sortedPosts() {
      return this.posts.slice().sort((a, b) => {
        return b.date.seconds - a.date.seconds;
      });
    },
  },
  components: {
    postSpy: postSpy,
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

.row {
  margin-top: 2rem;
}

.row p {
  margin-bottom: 0.5rem;
}
</style>
