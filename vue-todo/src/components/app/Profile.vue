<template>
  <div class="row">
    <div class="card col col s12 m8 l6  push-m2 push-l3 blue darken-3">
      <div class="card-header white-text">
        <h4 class="page-title">
          Profile
          <span class="card-title">
            {{name}}
          </span>
        </h4>
      </div>
      <div class="card-content">
        table: tsks_complited: 000, daysPlaning complited: 000, nowTasks: 000, nowDaysPLanings: 000
      </div>

    </div>
  </div>
</template>
<script>

  export default {
    computed: {
      name() {
        return this.$store.getters.info.name
      }
    }
  }
</script>
