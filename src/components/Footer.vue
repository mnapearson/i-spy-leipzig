<template>
  <div>
    <footer>
      <button><router-link class="link" to="/">HOME</router-link></button>
      <button>
        <router-link class="link" to="/About">INFO</router-link></button
      ><button><router-link class="link" to="spy">SPY</router-link></button
      ><button>
        <router-link class="link" to="/login">HI</router-link>
      </button>
      <button class="link" @click.prevent="signOut">
        BYE
      </button>
    </footer>
  </div>
</template>

<script>
export default {
  name: "footer",
};
</script>

<style lang="scss" scoped></style>
