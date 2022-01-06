<template>
  <div>
    <header>Your Account info</header>
    <div class="verify">
      <p>
        Hi, {{ this.$store.getters.myProfile.userName }}. Go verify your email
        please.
      </p>
      <p>Check your inbox, spam, etc.</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Verify",
  computed: {
    ...mapState(["posts", "profiles", "user"]),
  },
};
</script>

<style scoped>
header {
  background-color: #5fa7e9;
  padding: 0.5rem;
}

.verify {
  width: 300px;
  margin-top: 4rem;
  text-align: center;
}

p {
  margin-top: 1rem;
}
</style>
