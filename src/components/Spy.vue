<template>
  <div>
    <template v-if="user.loggedIn">
      <h1>Hi, {{ user.data.displayName }}. Did you spy someone?</h1>
    </template>
    <template v-if="!user.loggedIn"
      ><h1>
        Hi, you. Click 'hi' to login or register to start spying...
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

<style lang="scss" scoped></style>
