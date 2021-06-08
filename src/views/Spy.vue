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
          <div class="place">
            <div class="radio">
              <input
                type="radio"
                id="where-north"
                name="place"
                class="custom-control-input"
                value="place"
                v-model="place"
              />
              <label class="custom-control-label" for="where-north">
                Nord</label
              >
            </div>
            <div class="radio">
              <input
                type="radio"
                id="where-northeast"
                name="place"
                class="custom-control-input"
                value="place"
                v-model="place"
              />
              <label class="custom-control-label" for="where-northeast">
                Nordost</label
              >
            </div>
            <div class="radio">
              <input
                type="radio"
                id="where-east"
                name="place"
                class="custom-control-input"
                value="place"
                v-model="place"
              />
              <label class="custom-control-label" for="where-east"> Ost</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="where-southeast"
                name="place"
                class="custom-control-input"
                value="place"
                v-model="place"
              />
              <label class="custom-control-label" for="where-southeast">
                Südost</label
              >
            </div>

            <div class="radio">
              <input
                type="radio"
                id="where-south"
                name="place"
                class="custom-control-input"
                value="south"
                v-model="place"
              />
              <label class="custom-control-label" for="gender-m"> Süd</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="where-southwest"
                name="place"
                class="custom-control-input"
                value="place"
                v-model="place"
              />
              <label class="custom-control-label" for="where-southwest">
                Südwest</label
              >
            </div>
            <div class="radio">
              <input
                type="radio"
                id="where-west"
                name="place"
                class="custom-control-input"
                value="place"
                v-model="place"
              />
              <label class="custom-control-label" for="where-west"> West</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="where-altwest"
                name="place"
                class="custom-control-input"
                value="place"
                v-model="place"
              />
              <label class="custom-control-label" for="where-altwest">
                Altwest</label
              >
            </div>
            <div class="radio">
              <input
                type="radio"
                id="where-northwest"
                name="place"
                class="custom-control-input"
                value="place"
                v-model="place"
              />
              <label class="custom-control-label" for="where-northwest">
                Nordwest</label
              >
            </div>
          </div>
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
      place: null,
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
        place: this.place,
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
      this.place = null;
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

.place {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
}

.radio {
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: small;
  padding: 0 0.2rem;
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
