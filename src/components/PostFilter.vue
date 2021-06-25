<template>
  <div>
    <div class="filter">
      <div class="post-title">FILTER BY <i class="fas fa-filter"></i></div>
      <div class="filter-buttons">
        <div class="option date">
          Date Spied <i class="fas fa-calendar-day"></i>
        </div>
        <div class="option place">
          Place <i class="fas fa-map-marker-alt"></i>
        </div>
        <div class="option gender">
          Gender <i class="fas fa-venus-mars"></i>
        </div>
        <div class="search"></div>
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
  width: 70%;
}

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
