<template>
  <div>
    <div v-if="!user">
      <Login></Login>
    </div>
    <div class="message-form" v-if="user">
      <div class="message-to">
        <input type="text" placeholder="to" v-model="email" />
      </div>
      <div class="message-title">
        <input type="text" placeholder="Subject" v-model="subject" />
      </div>
      <div class="message-text">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Message"
          v-model="text"
        ></textarea>
      </div>
      <button @click="sendMessage">send</button>
      <div class="top" v-if="successMessage">
        <h1>Message sent.</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import Login from "../components/Login";
import { mapState } from "vuex";
export default {
  name: "messages",
  data() {
    return {
      email: "",
      subject: "",
      text: "",
      successMessage: false,
    };
  },
  components: {
    Login,
  },
  methods: {
    sendMessage() {
      db.collection("messages").add({
        to: this.email,
        message: { subject: this.subject, text: this.text },
      });
      this.email = "";
      this.text = "";
      this.subject = "";
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  color: red;
}

.message-form {
  margin-top: 3rem;
}

.message-title input {
  margin-bottom: 1rem;
  width: 250px;
}
</style>
