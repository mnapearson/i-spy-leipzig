<template>
  <div>
    <div v-if="successMessage">
      <header>Success</header>
      <p>Nice work. Head to the spy board to check out your post...</p>
    </div>

    <header v-if="successMessage == false">Write a Spy</header>
    <!-- <vue-dropdown class="dropdown" :config="config"></vue-dropdown> -->
    <div v-if="successMessage == false" class="form">
      <!-- <p v-if="error">
          {{ error }}
        </p> -->
      <form @submit.prevent>
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
        <div class="place">
          <p>
            Location
          </p>
          <div class="options">
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
          </div>
        </div>
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
  </div>
</template>

<script>
import { mapState } from "vuex";
import { db } from "@/firebase";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
// import VueDropdown from "vue-dynamic-dropdown";

export default {
  name: "postSpy",
  // components: {
  //   VueDropdown,
  // },
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
      config: {
        options: [
          {
            value: "nord",
          },
          {
            value: "sud",
          },
          {
            value: "ost",
          },
        ],

        backgroundColor: "#fff",
        border: "2px solid #7101ff",
        textColor: "black",
        width: 300,
        placeholder: "place",
      },
    };
  },
  validations() {
    return {
      title: { required }, // Matches this.firstName
      dateSpied: { required }, // Matches this.lastName
      text: { required },
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
      const result = await this.v$.$validate();
      if (!result) {
        this.error = "please fill in all fields";
        return;
      }
      const dataBase = await db.collection("posts").doc();
      const post = {
        id: dataBase.id,
        title: this.title,
        text: this.text,
        date: new Date(),
        place: this.place,
        dateSpied: this.dateSpied,
        author: this.myProfile.userName,
        age: this.myProfile.birthdate.toDate(),
        gender: this.myProfile.gender,
        email: this.myProfile.email,
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
header {
  background-color: #7101ff;
  padding: 0.5rem;
  color: white;
}

p {
  width: 300px;
  text-align: center;
  margin-top: 4rem;
}

form {
  display: flex;
  flex-direction: column;
  color: #7101ff;
  margin-top: 3rem;
}

.place {
  overflow: scroll;
  border: 2px solid #7101ff;
  width: 315px;
  height: 40px;
  margin-top: 2rem;
}

.place p {
  text-align: left;
  margin: 0.5rem;
  font-size: 14px;
}

.options {
  display: flex;
  flex-direction: column;
  color: #7101ff;
  display: flex;
  align-items: center;
  text-align: center;
  padding-bottom: 1rem;
  font-size: 14px;
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

.dropdown {
  margin-top: 2rem;
  width: 315px;
  border: 2px solid #7101ff;
  border-radius: 0;
  color: #7101ff;
}
</style>
