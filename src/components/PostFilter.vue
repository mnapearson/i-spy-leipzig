<template>
  <div>
    <div class="filter">
      <div class="title">Filter By</div>
      <div class="filter-buttons">
        <div class="option date">Date Spied</div>
        <div class="option place">Place</div>
        <div class="option gender">Gender</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostFilter",
};
</script>

<style scoped>
* {
  width: 60%;
}

.filter {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.title {
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

.option:hover {
  background: red;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.option {
  padding: 0.5rem;
  margin: 1rem 0.5rem 0 0;
  width: 100px;
  border: 1px solid red;
  text-align: center;
  text-transform: uppercase;
}
</style>
