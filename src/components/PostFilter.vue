<template>
  <div class="filter">
    <div>FILTER BY</div>
    <div class="filter-buttons">
      <div class="option date">
        Date
      </div>
      <div class="option place">
        Place
      </div>
      <div class="option gender">Gender</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostFilter",
};
</script>

<style scoped>
.filter {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.post-title {
  display: flex;
  border: 1px solid red;
  background-color: red;
  color: white;
  padding: 0.5rem;
  width: 100%;
}

.filter-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}

.option {
  padding: 0.2rem;
  margin: 1rem 0.5rem 0 0;
  width: 100px;
  border: 1px solid red;
  text-align: center;
  text-transform: uppercase;
}
</style>
