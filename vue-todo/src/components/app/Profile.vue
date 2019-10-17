<template>
  <div class="row">
    <div class="card col col s12 m8 l6  push-m2 push-l3 blue darken-3">
      <div class="popup" v-if="showChangeInp">
        <input id="name" type="text" v-model="name">
        <label for="name">Name</label>
      </div>
      <div class="card-header white-text">
        <h4 class="page-title">
          Profile
          <span class="card-title">
            {{name}}
          </span>
          <i class="material-icons small" @click="editName">edit</i>
        </h4>
      </div>
      <div class="card-content white-text">
        <table>
          <tr>
            <th>tsk complited: </th>
            <th>000</th>
          </tr>
          <tr>
            <th>days planning:</th>
            <th>000</th>
          </tr>
          <tr>
            <th>now tsks</th>
            <th>000</th>
          </tr>
          <tr>
            <th>Day is planning</th>
            <th>true</th>
          </tr>
        </table>
      </div>

    </div>
  </div>
</template>
<script>

  export default {
    data: () => ({
      showChangeInp: false,
      name: ''
    }),
    mounted() {
        this.name = this.$store.getters.info.name
    },
    methods: {
      editName() {
        this.showChangeInp = !this.showChangeInp
      }
    }
  }
</script>
