<template>
  <div>
    <template>
      <div class="top" v-if="successMessage">
        <h1>Nice work. Head to the spy board to check out your post...</h1>
      </div>
      <header v-if="successMessage == false">Write a Spy</header>
      <div v-if="successMessage == false" class="form">
        <form @submit.prevent>
          <!-- <div class="place">
            <div class="radio">
              <input
                type="radio"
                id="where-north"
                name="place"
                class="custom-control-input"
                value="Nord"
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
                value="Nordost"
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
                value="Ost"
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
                value="Südost"
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
                value="Süd"
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
                value="südwest"
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
                value="West"
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
                value="altwest"
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
                value="nordwest"
                v-model="place"
              />
              <label class="custom-control-label" for="where-northwest">
                Nordwest</label
              >
            </div>
          </div> -->

          <input
            class="title"
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
            <button class="button" @click="submitPost()">
              <img src="@/assets/postbutton.png" alt="" />
            </button>
          </div>
        </form>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { db } from "@/firebase";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "postSpy",
  setup() {
    return { v$: useVuelidate() };
  },
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
        age: this.myProfile.birthdate.toDate(),
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
    validations() {
      return {
        title: { required }, // Matches this.firstName
        dateSpied: { required }, // Matches this.lastName
        text: { required },
      };
    },
  },
};
</script>

<style scoped>
header {
  background-color: #7101ff;
  padding: 0.5rem;
  color: white;
}

form {
  display: flex;
  flex-direction: column;
  color: #7101ff;
  margin-top: 3rem;
}

.place {
  height: 50px;
  width: 150px;
  overflow: scroll;
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
  width: 300px;
  border: 2px solid #7101ff;
  margin-top: 2rem;
  padding: 0.5rem;
  color: #7101ff;
}

textarea {
  display: flex;
  width: 300px;
  border: 2px solid #7101ff;
  margin-top: 2rem;
  padding: 0.5rem;
  color: #7101ff;
}

button {
  margin-top: 3rem;
}

::placeholder {
  color: #7101ff;
}
</style>
