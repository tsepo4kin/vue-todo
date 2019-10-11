import firebase from 'firebase/app'
export default {
  state: {
    tasks: []
  },
  mutations: {
    addTask(state, tsk) {
      state.tasks.push(tsk)
    },
    refreshTasks(state, tasks) {
      state.tasks = tasks
    }
  },
  getters: {
    getTasks: s => s.tasks
  },
  actions: {
    async createTask({commit, dispatch}, {title, description, date, time, isDone}) {
      try {
        const uid = await dispatch('getUid');
        await firebase.database().ref(`users/${uid}/tasks`).push({title, description, date, time, isDone})
        // console.log(state.tasks)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchTasks({ commit, dispatch}) {
      try {
        const uid = await dispatch('getUid');
        const task = (await firebase.database().ref(`users/${uid}/tasks`).once('value')).val() || {}
        const tasksArray = Object.keys(task).map(key => ({...task[key], id: key}))
        commit('refreshTasks', tasksArray)
      } catch (e) {
        throw e
      }
    },
    async taskById({commit, dispatch}, id) {
      try {
        const uid = await dispatch('getUid')
        const task = (await firebase.database().ref(`users/${uid}/task`).child(id).once('value')).val() || {}
        return {
          ...task,
          id
        }

      }catch (e) {
        throw e
      }
    },
    async updateTask({dispatch}, {title, description, date, time, isDone, id}) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`users/${uid}/tasks`).child(id).update({title, description, date, time,isDone})
      } catch (e) {
        throw e
      }
    }

  }
}
