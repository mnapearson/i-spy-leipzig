<template>
  <div>
    <div v-if="!user">
      <Login></Login>
    </div>
    <div v-if="user">
      <h2>your account settings</h2>
    </div>
  </div>
</template>

<script>
import Login from "../components/Login";
import { mapState } from "vuex";

export default {
  name: "Account",
  components: {
    Login,
  },
  computed: {
    ...mapState(["user", "posts"]),
  },
};
</script>

<style lang="scss" scoped></style>
