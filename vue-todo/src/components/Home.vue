<template>
  <div class="row">
    <div class="col col s12 m8 l6  push-m2 push-l3">
      <div class="page-title">
        <h4>Todo list</h4>
      </div>
      <div class="card blue darken-3 bill-card">
        <div class="card-content white-text">
          <div class="card-header">
            <span class="card-title">Tasks</span>
          </div>
          <table>
            <thead>
            <tr>
              <th>Task title</th>
              <th>Status</th>
              <th >Date</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="task in tasks" :class="task.isDone ? 'purple darken-4' : 'indigo lighten-2'">
              <td class="">{{task.title}}</td>
              <td
                style="font-size: 12px;"
                :class="task.isDone ? 'done' : 'notDone'"
              >{{task.isDone ? 'done' : 'notDone'}}</td>
              <td
                style="font-size: 12px;"
              >{{task.date}}</td>
              <td>
                <button
                  v-tooltip="'change status'"
                  @click.prevent="statusChange(task.id)"
                  :class="task.isDone ? 'red' : 'light-green'"
                  class="btn btn-small darken-1"
                >
                  <i class="material-icons small">{{task.isDone ? 'block' : 'check'}}</i>
                </button>
              </td>
              <td>
                <button
                  v-tooltip="'edit task'"
                  @click='$router.push("/task/" + task.id)'
                  class="btn btn-small deep-purple accent-1"
                >
                  <i class="material-icons small">edit</i>
                </button>
              </td>
              <td>
                <button
                  v-tooltip="'delete task'"
                  class="btn btn-small red darken-4">
                  <i class="material-icons small">close</i>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
          paginate
        </div>
      </div>
      <button
        class="light-blue darken-1 btn btn-large waves-effect waves-light"
        type="submit"
        name="action"
        @click='$router.push("/AddTask")'
      >Add new task
        <i class="material-icons right">add</i>
      </button>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      tasks: []
    }),
    async mounted() {
      await this.$store.dispatch('fetchTasks');
      this.tasksUpd
    },
    computed: {
      tasksUpd() {
        this.tasks = this.$store.getters.getTasks

      }
    },
    methods: {
      statusChange(id) {
        let formData = {};
        for(let i = 0; i < this.tasks.length; i++) {
          if(this.tasks[i].id === id) {
            this.tasks[i].isDone = !this.tasks[i].isDone
            formData = this.tasks[i]
            formData.id = id;
          }
        }
        this.$store.dispatch('updateTask', formData)
      }
    }
  }
</script>
<style scoped>
  .notDone{
    color: #d50000;
    font-weight: bold;
  }
  .done {
    color: #b9f6ca ;
    font-weight: bold;
  }
  .page-title{-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding-bottom:1rem;
    border-bottom:solid 1px rgba(51,51,51,.12)}
  .page-title a{color:#000;opacity:.8}
</style>
