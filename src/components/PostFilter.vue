<template>
  <div>
    <p>filter by</p>
    <div class="filter-buttons">
      <div class="option date">
        <img src="@/assets/date.png" alt="" />
      </div>
      <div class="option place">
        <img src="@/assets/place.png" alt="" />
      </div>
      <div class="option gender"><img src="@/assets/gender.png" alt="" /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostFilter",
};
</script>

<style scoped>
p {
  margin: 1rem;
  text-transform: none;
  font-size: 14px;
}

.filter-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
