<template>
  <div>
    <div v-if="!user">
      <Login></Login>
    </div>
    {{ userChat }}
    <div class="message-form" v-if="user">
      <h2>Write your reply to</h2>
      <div class="message-to">
        <input type="text" placeholder="Email" v-model="email" />
      </div>
      <div class="message-subject">
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
        to: "marratoon@gmail.com",
        message: {
          subject:
            "You have a reply from @" +
            this.$store.getters.myProfile.userName +
            "!",
          text: this.text,
        },
      }),
        db.collection("chat").add({ text: this.text });
      this.email = "";
      this.text = "";
      this.subject = "";
      this.successMessage = true;
    },
  },
  computed: {
    ...mapState(["posts", "profiles", "user", "chat"]),
    userChat() {
      const userChat = this.$store.state.chat;
      return userChat;
    },
  },
  mounted() {
    this.myProfile = this.$store.getters.myProfile;
    this.$store.dispatch("bindMessages");
    this.$store.dispatch("bindChat");
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
  margin: 2rem;
  color: red;
}

h2 {
  margin-bottom: 2rem;
}

.message-to,
.message-subject {
  display: none;
}

.message-form {
  margin-top: 3rem;
}

input {
  margin-bottom: 1rem;
  width: 250px;
  color: red;
}

textarea {
  color: red;
}
</style>
