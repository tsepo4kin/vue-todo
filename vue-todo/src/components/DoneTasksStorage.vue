<template>
  <div class="row">
    <div class="col s6 m5 l3">
      <div class="card indigo lighten-2">
        <div class="card-content white-text">
          <span class="card-title">date</span>
          <p>efficiency</p>
        </div>
        <div class="card-action">
          <a href="#">Open</a>
          <a href="#">Delete</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    complitedTasks: [],
    complitedGoals: []
  }),
  async mounted() {}
};
</script>

<style scoped>
.card {
  margin-top: 1rem;
}
</style>
