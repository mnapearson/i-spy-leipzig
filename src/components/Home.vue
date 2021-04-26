<template>
  <div class="home">
    <template v-if="user.loggedIn">
      <h1>Hi, {{ user.data.displayName }}.</h1>
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
        <div class="posts">
          <div class="col">Date & User</div>

          <div class="col">Post</div>
          <div class="row date">
            <p>@Manbun</p>
            <p>25.04.21</p>
            <button>reply</button>
          </div>
          <div class="row text">
            Saw you at OMAD. Fell in love with your swag ways. Wish I had the
            guts to say so then. Still thinking of you now.
          </div>
          <div class="row date">
            <p>@SexyMicha</p>
            <p>22.04.21</p>
            <button>reply</button>
          </div>
          <div class="row text">
            you said you would paint me. but you still haven't come thru. don't
            leave me wanting more from you.
          </div>
        </div>
      </div>
    </section>
    <footer></footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  name: "Home",
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
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
};
</script>

<style scoped>
* {
  margin: 0 auto;
  font-family: "Roboto Mono", monospace;
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
