import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    todos:[],
    idNumber: 0,
  },
  getters: {

  },
  mutations: {
    addButton(state, newTaskText) {
      state.todos.push({
        id: state.idNumber,
        comment: newTaskText,
        status: 0,
      })
      state.idNumber++;
    },
  },
  actions: {

  }
})
export default store
