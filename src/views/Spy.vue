<template>
  <div>
    <template>
      <div class="top" v-if="successMessage">
        <h1>Nice work. Head to the spy board to check out your post...</h1>
      </div>
      <div v-if="successMessage == false" class="top">
        <h1>Write your spy...</h1>
      </div>
      <div v-if="successMessage == false" class="form">
        <form @submit.prevent>
          <input
            class="mb-4"
            v-model="title"
            type="text"
            name="Title"
            placeholder="Who, what, where..."
            required
          />
          <input
            class="mb-4"
            v-model="dateSpied"
            type="date"
            name="DateSpied"
            placeholder="When did you spy this person?"
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
            <button class="button" @click="submitPost()">post</button>
          </div>
        </form>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { db } from "@/firebase";
import { required } from "vuelidate/lib/validators";

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
  validations: {
    title: {
      required,
    },
    text: {
      required,
    },
  },
  props: {
    value: Date,
  },

  computed: {
    ...mapState(["posts, profiles", "users"]),
    author() {
      return this.profiles.find((profile) => profile.id == this.post.author);
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
        text: this.text,
        date: new Date(),
        dateSpied: this.dateSpied,
        author: this.myProfile.userName,
        age: this.myProfile.age,
        gender: this.myProfile.gender,
      };
      try {
        await db.collection("posts").add(post);
      } catch (error) {
        console.log(error);
      }
      this.text = "";
      this.title = "";
      this.dateSpied = "";
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
  padding: 0 3rem;
  margin: 0 4rem;
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

.top {
  display: flex;
  max-width: 50%;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
