<template>
  <div class="row">
    <div class="col col s12 m8 l6  push-m2 push-l3">
      <div class="page-title">
        <h4>Add task</h4>
      </div>
      <form action="">
        <div class="row">
          <div class="input-field col l12 ">
            <input id="taskName" type="text" class="validate" v-model="title" />
            <label for="taskName" class="">Task Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col l12">
            <textarea
              id="taskDescription"
              type="text"
              class="materialize-textarea"
              v-model="description"
            ></textarea>
            <label for="taskDescription">Task Description</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col  l4">
            <input
              id="dateline"
              type="text"
              class="datepicker"
              v-model="date"
            />
            <label for="dateline">Date</label>
          </div>
          <div class="input-field col push-l4 l4">
            <input
              id="timeline"
              type="text"
              class="timepicker"
              v-model="time"
            />
            <label for="timeline">Time</label>
          </div>
        </div>
      </form>
      <button
        class="light-blue darken-1 btn btn-large waves-effect waves-light"
        type="submit"
        name="action"
        @click.prevent="onSubmit"
      >
        Add
        <i class="material-icons right">create</i>
      </button>
      <button
        @click.prevent="onClear"
        class="right red darken-1 btn btn-large waves-effect waves-light"
        type="submit"
        name="action"
      >
        Clear
        <i class="material-icons right">close</i>
      </button>
    </div>
  </div>
</template>
<script>
// import {required} from 'vuelidate/lib/validators'
export default {
  data: () => ({
    title: "",
    description: "",
    time: "",
    date: ""
  }),
  methods: {
    async onSubmit() {
      const taskData = {
        title: this.title,
        description: this.description,
        time: this.time,
        date: this.date,
        isDone: false
      };
      try {
        await this.$store.dispatch("createTask", taskData);
        this.$message("Задача успешно добавлена");
        this.title = "";
        this.description = "";
        this.time = "";
        this.date = "";
      } catch (e) {
        throw e;
      }
    },
    onClear() {
      this.title = "";
      this.description = "";
      this.time = "";
      this.date = "";
    }
  }
};</script
>"
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
/* label color */
.input-field label {
  font-weight: bold;
  color: #5e35b1;
}
.input-field input {
  border-bottom: 1px solid #5e35b1 !important;
  box-shadow: 0 0px 0 0 #5e35b1 !important;
}
.input-field textarea {
  border-bottom: 1px solid #5e35b1 !important;
  box-shadow: 0 0px 0 0 #5e35b1 !important;
}
/* label focus color */
.input-field input[type="text"]:focus + label {
  color: #5e35b1;
}
.input-field label .active {
  color: #5e35b1;
}
/* label underline focus color */
.input-field input[type="text"]:focus {
  border-bottom: 1px solid #5e35b1;
  box-shadow: 0 1px 0 0 #5e35b1;
}
/* valid color */
.input-field input[type="text"].valid {
  border-bottom: 1px solid #5e35b1;
  box-shadow: 0 1px 0 0 #5e35b1;
}
/* invalid color */
.input-field input[type="text"].invalid {
  border-bottom: 1px solid #5e35b1;
  box-shadow: 0 1px 0 0 #5e35b1;
}
/* icon prefix focus color */
.input-field .prefix.active {
  color: #5e35b1;
}

label.active {
  font-weight: bold;
  color: #9c27b0 !important;
  border-color: #9c27b0 !important;
}

input:focus,
textarea:focus {
  font-weight: bold;
  border-color: #9c27b0 !important;
  box-shadow: 0 1px 0 0 #9c27b0 !important;
}
</style>
