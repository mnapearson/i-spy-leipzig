<template>
  <div>
    <template>
      <div class="top" v-if="successMessage">
        <h1>Nice work. Head to the spy board to check out your post...</h1>
        <button><router-link to="/">GO</router-link></button>
      </div>

      <div class="form" v-if="successMessage == false">
        <form @submit.prevent>
          <input
            class="mb-4"
            v-model="title"
            type="text"
            name="Title"
            placeholder="Insert title here"
            required
          />
          <datepicker
            :value="value"
            type="date"
            v-model="dateSpied"
            name="Date Spied"
            placeholder="When did you spy this special sum1..."
            required
          />

          <textarea
            rows="10"
            v-model="text"
            class="font-mono p-4 "
            type="text"
            name="Create Post"
            placeholder="flex ur inner shakespeare..."
            required
          ></textarea>
          <div class="button">
            <button class="button" @click="submitPost()">post</button
            ><button @click="addPost = false">nah</button>
          </div>
        </form>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { db } from "@/firebase";
import Datepicker from "vuejs-datepicker";

export default {
  name: "postSpy",
  data() {
    return {
      myProfile: undefined,
      successMessage: false,
      title: "",
      dateSpied: "",
      text: "",
    };
  },
  props: {
    value: Date,
  },
  components: {
    Datepicker,
  },
  computed: {
    ...mapState(["posts, profiles"]),
    author() {
      return this.profiles.find((profile) => profile.id == this.post.author);
    },
    sortedPosts() {
      return this.posts.slice().sort((a, b) => {
        return b.date.seconds - a.date.seconds;
      });
    },
  },
  mounted() {
    this.myProfile = this.$store.getters.myProfile;
    this.$store.dispatch("bindPosts");
  },

  methods: {
    async submitPost() {
      const post = {
        title: this.title,
        dateSpied: this.dateSpied,
        text: this.text,
        date: new Date(),
        author: this.myProfile.userName,
      };
      try {
        await db.collection("posts").add(post);
      } catch (error) {
        console.log(error);
        this.$store.dispatch("notify", {
          type: "error",
          text: "Ooops! Something went wrong...",
        });
      }
      this.text = "";
      this.dateSpied = "";
      this.title = "";
      this.successMessage = true;
    },
  },
};
</script>

<style scoped>
h1 {
  margin: 2rem;
}

form {
  display: flex;
  flex-direction: column;
  margin: 2rem 3rem;
  color: red;
}

input {
  display: flex;
  margin: 2rem;
  color: red;
}

textarea {
  display: flex;
  margin: 2rem;
  color: red;
}
</style>
