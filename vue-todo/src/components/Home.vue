<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="row">
      <div class="col col s12 m8 l6  push-m2 push-l3">
        <div class="page-title">
          <h4>Planinng</h4>
        </div>
        <div class="card blue darken-3 bill-card">
          <div class="card-content white-text">
            <div class="card-header">
              <span class="card-title left">Tasks</span>
              <button
                v-if="isGoal"
                @click="isGoal = !isGoal"
                class=" btn btn-small right"
              >
                Goals
              </button>
              <button
                v-else
                @click="isGoal = !isGoal"
                class=" btn btn-small right"
              >
                Todos
              </button>
            </div>

            <div class="goals" v-if="isGoal">
              <table>
                <thead>
                  <tr>
                    <th>Task title</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="task in items"
                    :key="task.id"
                    :class="
                      task.isDone ? 'purple darken-4' : 'indigo lighten-2'
                    "
                  >
                    <td class="">{{ task.title }}</td>
                    <td
                      style="font-size: 12px;"
                      :class="task.isDone ? 'done_home' : 'notDone_home'"
                    >
                      {{ task.isDone ? "done" : "notDone" }}
                    </td>
                    <td style="font-size: 12px;">{{ task.date }}</td>
                    <td>
                      <button
                        v-tooltip="'change status'"
                        @click.prevent="statusChange(task.id)"
                        :class="task.isDone ? 'red' : 'light-green'"
                        class="btn btn-small darken-1"
                      >
                        <i class="material-icons small">{{
                          task.isDone ? "block" : "check"
                        }}</i>
                      </button>
                    </td>
                    <td>
                      <router-link
                        v-if="!task.isDone"
                        tag="button"
                        :to="'/task/' + task.id"
                        v-tooltip="'edit task'"
                        class="btn btn-small deep-purple accent-1"
                        :exact="false"
                      >
                        <i class="material-icons small">edit</i>
                      </router-link>
                    </td>
                    <td>
                      <button
                        v-if="!task.isDone"
                        @click.prevent="deleteTask(task.id)"
                        v-tooltip="'delete task'"
                        class="btn btn-small red darken-4"
                      >
                        <i class="material-icons small">close</i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <paginate
                v-model="page"
                :page-count="pageCount"
                :click-handler="pageChangeHandler"
                :prev-text="'<<'"
                :next-text="'>>'"
                :container-class="'pagination center'"
                :page-class="'waves-effect'"
              />
            </div>

            <div class="planning" v-else>
              <table>
                <thead>
                  <tr>
                    <th>Task title</th>
                    <th>Status</th>
                    <th>Time</th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  <!--<tr v-for="task in tasks" :class="task.isDone ? 'purple darken-4' : 'indigo lighten-2'">-->
                  <!--<td class="">{{task.title}}</td>-->
                  <!--<td-->
                  <!--style="font-size: 12px;"-->
                  <!--:class="task.isDone ? 'done' : 'notDone'"-->
                  <!--&gt;{{task.isDone ? 'done' : 'notDone'}}</td>-->
                  <!--<td-->
                  <!--style="font-size: 12px;"-->
                  <!--&gt;{{task.date}}</td>-->
                  <!--<td>-->
                  <!--<button-->
                  <!--v-tooltip="'change status'"-->
                  <!--@click.prevent="statusChange(task.id)"-->
                  <!--:class="task.isDone ? 'red' : 'light-green'"-->
                  <!--class="btn btn-small darken-1"-->
                  <!--&gt;-->
                  <!--<i class="material-icons small">{{task.isDone ? 'block' : 'check'}}</i>-->
                  <!--</button>-->
                  <!--</td>-->
                  <!--<td>-->
                  <!--<router-link-->
                  <!--tag="button"-->
                  <!--:to="'/task/' + task.id"-->
                  <!--v-tooltip="'edit task'"-->
                  <!--class="btn btn-small deep-purple accent-1"-->
                  <!--:exact='false'-->
                  <!--&gt;-->
                  <!--<i class="material-icons small">edit</i>-->
                  <!--</router-link>-->
                  <!--</td>-->
                  <!--<td>-->
                  <!--<button-->
                  <!--@click.prevent="deleteTask(task.id)"-->
                  <!--v-tooltip="'delete task'"-->
                  <!--class="btn btn-small red darken-4">-->
                  <!--<i class="material-icons small">close</i>-->
                  <!--</button>-->
                  <!--</td>-->
                  <!--</tr>-->
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button
          class="indigo darken-3 btn btn-large waves-effect waves-light"
          type="submit"
          name="action"
          @click="$router.push('/AddTask')"
        >
          Add new task
          <i class="material-icons right">add</i>
        </button>

        <button
          class="indigo darken-3 btn btn-large waves-effect waves-light right"
        >
          Commit done tasks
          <i class="material-icons right">bookmark</i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import paginationMixin from "@/mixins/pagination.mixin";
export default {
  mixins: [paginationMixin],
  data: () => ({
    tasks: [],
    loading: true,
    isGoal: true
  }),
  async mounted() {
    await this.$store.dispatch("fetchTasks");
    this.tasks = await this.tasksUpd;
    this.setupPagination(this.tasks);
    this.loading = false;
  },
  computed: {
    tasksUpd(tasks = this.$store.getters.getTasks) {
      return tasks;
    }
  },
  methods: {
    async statusChange(id) {
      let formData = {};
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].id === id) {
          this.items[i].isDone = !this.items[i].isDone;
          formData = this.items[i];
          await this.$store.dispatch("updateTask", formData);
        }
      }
    },
    async deleteTask(id) {
      await this.$store.dispatch("deleteTask", id);
    }
  }
};
</script>
<style>
.pagination li a {
  color: white !important;
}

.card-title {
  width: 80%;
}

.notDone_home {
  color: #d50000;
  font-weight: bold;
}
.done_home {
  color: #b9f6ca;
  font-weight: bold;
}
.page-title {
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: solid 1px rgba(51, 51, 51, 0.12);
}
.page-title a {
  color: #000;
  opacity: 0.8;
}
</style>
