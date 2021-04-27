<template>
  <div>
    <template v-if="user.loggedIn">
      <h1>Hi, {{ user.data.displayName }}. Did you spy someone?</h1>
      <div class="form">
        <form action="">
          <input type="text" placeholder="SUBJECT" />

          <input type="DATE" placeholder="DATE" />

          <textarea
            placeholder="FLEX UR INNER SHAKESPEARE..."
            style="height: 100px;"
          ></textarea>
          <div class="button">
            <button class="button">post</button>
          </div>
        </form>
      </div>
    </template>
    <template v-if="!user.loggedIn"
      ><h1>
        Hi, you. Click 'hi' to start spying...
      </h1></template
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "spy",
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
};
</script>

<style scoped>
h1 {
  display: flex;
  justify-content: center;
  margin: 2rem;
}

form {
  display: flex;
  flex-direction: column;
  margin: 2rem;
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
