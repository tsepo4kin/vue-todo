<template>
  <div class="row">
    <div class="popup col col l1 m3 s6" v-if="showChangeInp">
      <input id="name" type="text" v-model="name">
      <label for="name">Name</label>
    </div>
    <div class="card col col s12 m8 l6  push-m2 push-l3 blue darken-3">
      <div class="card-header white-text">
        <h4 class="page-title">
          Profile
          <span class="card-title">
            {{getName}}
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
    methods: {
      editName() {
        if(!this.showChangeInp) {
          this.name = this.getName
        }
        this.showChangeInp = !this.showChangeInp
      }
    },
    computed: {
      getName() {
        return this.$store.getters.info.name
      }
    },
  }
</script>
<style scoped>
  .popup {
    position: absolute;
  }
</style>
