<template>
  <div>
    <div v-if="!username">
      You can't chat without a name. What's your name? <br />
      <input type="text" placeholder="Name" v-on:keyup.enter="updateUsername" />
    </div>
    <div v-else>
      From : {{ username }}<br />
      Message:<br />
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="New Message"
        v-on:keyup.enter="sendMessage"
      ></textarea>
    </div>
    <div class="messages">
      <h3>Messages</h3>
      <div :key="message.id" v-for="message in messages">
        <strong>{{ message.username }}</strong>
        <p>{{ message.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import fire from "firebase";
export default {
  name: "messages",
  data() {
    return {
      username: "",
      messages: [],
    };
  },
  methods: {
    updateUsername(e) {
      e.preventDefault();
      if (e.target.value) {
        this.username = e.target.value;
      }
    },
    sendMessage(e) {
      e.preventDefault();
      if (e.target.value) {
        const message = {
          username: this.username,
          text: e.target.value,
        };
        // To-Do: Push message to firebase
        fire
          .database()
          .ref("messages")
          .push(message);

        e.target.value = "";
      }
    },
  },
  mounted() {
    let vm = this;
    const itemsRef = fire.database().ref("messages");
    itemsRef.on("value", (snapshot) => {
      let data = snapshot.val();
      let messages = [];
      Object.keys(data).forEach((key) => {
        messages.push({
          id: key,
          username: data[key].username,
          text: data[key].text,
        });
      });
      vm.messages = messages;
    });
  },
};
</script>

<style scoped></style>
