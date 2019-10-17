<template>
  <div>
    <Loader v-if='loading' />
    <div v-else class="row">
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
              <tr v-for="task in items" :class="task.isDone ? 'purple darken-4' : 'indigo lighten-2'">
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
                  <router-link
                    tag="button"
                    :to="'/task/' + task.id"
                    v-tooltip="'edit task'"
                    class="btn btn-small deep-purple accent-1"
                    :exact='false'
                  >
                    <i class="material-icons small">edit</i>
                  </router-link>
                </td>
                <td>
                  <button
                    @click.prevent="deleteTask(task.id)"
                    v-tooltip="'delete task'"
                    class="btn btn-small red darken-4">
                    <i class="material-icons small">close</i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
            <paginate
              v-model='page'
              :page-count='pageCount'
              :click-handler='pageChangeHandler'
              :prev-text="'prev'"
              :next-text="'next'"
              :container-class="'pagination'"
              :page-class="'waves-effect'"
            />
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
  </div>
</template>
<script>
  import paginationMixin from '@/mixins/pagination.mixin'
  export default {
    mixins: [paginationMixin],
    data: () => ({
      tasks: [],
      loading: true
    }),
    async mounted() {
      await this.$store.dispatch('fetchTasks');
      await this.tasksUpd;
      this.setupPagination(this.tasks)
      this.loading = false
    },
    computed: {
      tasksUpd() {
        this.tasks = this.$store.getters.getTasks
      }
    },
    methods: {
      async statusChange(id) {
        let formData = {};
        for(let i = 0; i < this.tasks.length; i++) {
          if(this.tasks[i].id === id) {
            this.tasks[i].isDone = !this.tasks[i].isDone
            formData = this.tasks[i]
            formData.id = id;
          }
        }
        await this.$store.dispatch('updateTask', formData)
      },
      async deleteTask(id) {
        await this.$store.dispatch('deleteTask', id)
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
