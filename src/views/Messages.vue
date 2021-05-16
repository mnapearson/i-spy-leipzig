<template>
  <div>
    <div class="title">
      Title: <br />
      <input type="text" placeholder="Title" v-model="title" />
    </div>
    <div class="message">
      Message:<br />
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="New Message"
        v-model="message"
      ></textarea>
    </div>
    <button @click="sendMessage">send</button>
    <div class="top" v-if="successMessage">
      <h1>Message sent.</h1>
    </div>
    <div class="messages">
      <h3>Messages</h3>
      <div v-for="message in $store.state.messages" :key="message.id">
        <strong>{{ message.title }}</strong>
        <p>{{ message.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { mapState } from "vuex";
export default {
  name: "messages",
  data() {
    return {
      title: "",
      message: "",
      successMessage: false,
    };
  },
  methods: {
    sendMessage() {
      const message = {
        title: this.title,
        text: this.message,
        date: new Date(),
        author: this.myProfile.userName,
      };
      db.collection("message").add(message);
      this.message = "";
      this.title = "";
      this.successMessage = true;
    },
  },
  computed: {
    ...mapState(["posts", "profiles", "user", "messages"]),
    userMessages() {
      const userMessages = this.$store.state.messages;
      return userMessages;
    },
  },
  mounted() {
    this.myProfile = this.$store.getters.myProfile;
    this.$store.dispatch("bindMessages");
  },
};
</script>

<style scoped>
* {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  color: red;
}
</style>
