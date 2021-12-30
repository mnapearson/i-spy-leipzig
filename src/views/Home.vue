<template>
  <div>
    <header>Spy Board</header>
    <div class="main-container">
      <section>
        <PostFilter></PostFilter>
        <div class="posts" v-for="post in sortedPosts" :key="post.id">
          <div class="row">
            <div class="post-date">
              <!-- <p>{{ post.date.toDate() | formatDate }}</p> -->
              <p>{{ post.dateSpied | formatDate }}</p>
            </div>
            <div class="post-author">
              <p>
                @{{ post.author }} <br />({{ post.age.toDate() | getAge }},
                {{ post.gender }})
              </p>
            </div>

            <div class="reply-button">
              <button class="reply">
                <router-link to="/messages"
                  ><img src="@/assets/reply.png" alt=""
                /></router-link>
              </button>
            </div>
          </div>
          <div class="row text">
            <div class="post-title">
              {{ post.title }}
              <!-- <div class="post-details">
                <p class="post-place">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="black"
                  >
                    <path
                      d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
                    /></svg
                  >{{ post.place }}
                </p>
              </div> -->
            </div>
            <div class="post-text">
              {{ post.text }}
            </div>
            <button @click="addLike" class="like-button">
              <img src="@/assets/likebutton.png" alt="" />
            </button>
          </div>
        </div>
      </section>
    </div>
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
header {
  background-color: red;
  padding: 0.5rem;
  color: white;
}

button {
  margin-top: 1rem;
}

.post-author {
  font-size: 14px;
  text-transform: none;
  margin: 0.2rem 0;
}

.post-details {
  margin-top: 0.5rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.post-details {
  margin-right: 1rem;
}

.post-place {
  font-style: italic;
  text-transform: lowercase;
}

.post-spy {
  text-decoration: none;
  color: black;
}

section {
  margin-top: 1rem;
}

.main-container {
  color: black;
  text-transform: uppercase;
  margin-bottom: 4rem;
  max-width: 700px;
}

.posts {
  display: grid;
  grid-template-columns: 2fr 4fr;
  grid-template-rows: 2fr;
  column-gap: 1rem;
  width: 100%;
  margin-top: 1rem;
  align-items: flex-start;
  border-top: 1px dotted red;
}

.reply a {
  text-decoration: none;
  color: black;
}

.post-title p {
  font-weight: normal;
}

.post-title {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  text-transform: none;
  font-size: 14px;
}

.post-text {
  display: flex;
  align-items: flex-start;
  margin-top: 1rem;
  text-transform: none;
  font-size: 12px;
}

.row {
  margin: 0.5rem;
}

.like-button {
  position: absolute;
  right: 5%;
}
</style>
