<template>
  <div>
    <header>Reply to Spy</header>
    <div class="post">
      <div class="author-details">
        <p>
          {{ this.currentPost[0].dateSpied | formatDate }}
        </p>
        <p>@{{ this.currentPost[0].author }}</p>
        <p>
          {{ this.currentPost[0].age.toDate() | getAge }}
          {{ this.currentPost[0].gender }}
        </p>
      </div>
      <div class="post-text">
        <p>
          {{ this.currentPost[0].title }}
        </p>
        <p>
          {{ this.currentPost[0].text }}
        </p>
      </div>
    </div>
    <div class="message-form" v-if="user">
      <div class="message-subject">
        <input type="text" placeholder="Subject" v-model="subject" />
      </div>
      <div class="message-text">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="write your reply..."
          v-model="text"
        ></textarea>
      </div>

      <div class="button">
        <button class="button" @click="sendMessage">
          <img src="@/assets/replyspy.png" alt="" />
        </button>
      </div>
      <div class="top" v-if="successMessage">
        <h1>Message sent.</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { mapState } from "vuex";
export default {
  name: "viewPost",

  data() {
    return {
      currentPost: null,
      subject: "",
      text: "",
      successMessage: false,
    };
  },
  async mounted() {
    this.currentPost = await this.$store.state.posts.filter((post) => {
      return post.id === this.$route.params.postid;
    });
    this.currentChat = await this.$store.state.chat;
    this.myProfile = this.$store.getters.myProfile;
    this.$store.dispatch("bindMessages");
    this.$store.dispatch("bindChat");
  },
  methods: {
    sendMessage() {
      // const email = this.currentPost[0].email;
      // db.collection("messages").add({
      //   to: { email },
      //   message: {
      //     subject:
      //       "You have a reply from @" +
      //       this.$store.getters.myProfile.userName +
      //       "!",
      //     text: this.text,
      //   },
      // }),
      db.collection("chat").add({
        message: this.text,
        chatId: this.$route.params.postid,
      });
      this.text = "";
      // this.subject = "";
      // this.successMessage = true;
    },
  },
  computed: {
    ...mapState(["posts", "profiles", "user", "chat"]),
    userChat() {
      const userChat = this.$store.state.chat;
      return userChat;
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

.post {
  display: flex;
  margin-top: 4rem;
  font-size: 14px;
  padding: 1rem;
}

.author-details {
  margin-right: 2rem;
}

message-to,
.message-subject {
  display: none;
}

.message-form {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
  border-top: 1px dotted #7101ff;
  margin-bottom: 5rem;
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
