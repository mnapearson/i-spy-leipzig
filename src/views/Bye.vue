<template>
  <div>
    <header>Logged Out</header>
    <Login></Login>
  </div>
</template>

<script>
import Login from "@/components/Login";
export default {
  components: {
    Login,
  },
  name: "Bye",
};
</script>

<style scoped>
header {
  background-color: red;
  padding: 0.5rem;
}

h1,
p {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}
</style>
