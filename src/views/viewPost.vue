<template>
  <div>
    {{ this.currentPost[0].title }}
    {{ this.currentPost[0].author }}
    {{ this.currentPost[0].age.toDate() | getAge }}
    {{ this.currentPost[0].gender }}
    {{ this.currentPost[0].text }}
  </div>
</template>

<script>
export default {
  name: "viewPost",
  data() {
    return {
      currentPost: null,
    };
  },
  async mounted() {
    this.currentPost = await this.$store.state.posts.filter((post) => {
      return post.id === this.$route.params.postid;
    });
  },
};
</script>

<style scoped></style>
