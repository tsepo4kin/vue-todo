<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="row">
      <div class="col col s12 m8 l6  push-m2 push-l3">
        <div class="page-title">
          <h4>Task edit</h4>
        </div>
        <div class="card blue darken-3 bill-card">
          <div class="card-content white-text">
            <div class="card-header">
              <span class="card-title">Task</span>
            </div>
            <form action="">
              <div class="row">
                <div class="input-field col l12 ">
                  <input
                    v-model="task.title"
                    id="taskName"
                    type="text"
                    class="validate"
                  />
                  <label for="taskName" class="">Task Name</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col l12">
                  <textarea
                    ref="taskDescription"
                    v-model="task.description"
                    id="taskDescription"
                    type="text"
                    class="materialize-textarea"
                  ></textarea>
                  <label for="taskDescription">Task Description</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col  l4">
                  <input
                    v-model="task.date"
                    id="dateline"
                    type="text"
                    class="datepicker"
                  />
                  <label for="dateline">Date</label>
                </div>
                <div class="input-field col push-l4 l4">
                  <input
                    v-model="task.time"
                    id="timeline"
                    type="text"
                    class="timepicker"
                  />
                  <label for="timeline">Time</label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <button
          @click.prevent="updateTsk"
          class="light-blue darken-1 btn btn-large waves-effect waves-light"
          type="submit"
          name="action"
        >
          Confirm
          <i class="material-icons right">check</i>
        </button>
        <router-link
          tag="button"
          :to="'/'"
          v-tooltip="'Back to todo list'"
          class="right red darken-1 btn btn-large waves-effect waves-light"
          type="submit"
          name="action"
          >Close
          <i class="material-icons right">close</i>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    task: {},
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id;
    this.task = await this.$store.dispatch("taskById", id);
    setTimeout(() => {
      M.updateTextFields();
      M.textareaAutoResize(this.$refs["taskDescription"]);
    });
    this.loading = false;
  },
  methods: {
    async updateTsk() {
      await this.$store.dispatch("updateTask", this.task);
      this.$message("Task success update");
    }
  }
};
</script>
<style scoped>
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
.input-field label {
  font-weight: bold;
  color: white;
}
.input-field input {
  border-bottom: 1px solid white !important;
  box-shadow: 0 0px 0 0 white !important;
}
.input-field textarea {
  border-bottom: 1px solid white !important;
  box-shadow: 0 0px 0 0 white !important;
}
/* label focus color */
.input-field input[type="text"]:focus + label {
  color: white;
}
.input-field label .active {
  color: white;
}
/* label underline focus color */
.input-field input[type="text"]:focus {
  border-bottom: 1px solid white;
  box-shadow: 0 1px 0 0 white;
}
/* valid color */
.input-field input[type="text"].valid {
  border-bottom: 1px solid white;
  box-shadow: 0 1px 0 0 white;
}
/* invalid color */
.input-field input[type="text"].invalid {
  border-bottom: 1px solid white;
  box-shadow: 0 1px 0 0 white;
}
/* icon prefix focus color */
.input-field .prefix.active {
  color: white;
}

label.active {
  font-weight: bold;
  color: white !important;
  border-color: white !important;
}

input {
  font-weight: bold;
}

textarea {
  font-weight: bold;
}
input:focus,
textarea:focus {
  font-weight: bold;
  border-color: white !important;
  box-shadow: 0 1px 0 0 white !important;
}
</style>
