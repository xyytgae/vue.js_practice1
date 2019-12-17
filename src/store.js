import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    todos:[],
    idNumber: 0,
    picked: 'all',
  },
  getters: {
    filter(state) {
      if (state.picked === 'working') {
        return state.todos.filter(filteredTodos => filteredTodos.status === 0);
      } else if (state.picked === 'done') {
        return state.todos.filter(filteredTodos => filteredTodos.status === 1);
      } else {
        return state.todos;
      }
    },
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


    statusButton(state, indexNumber) {
      state.todos[indexNumber].status = state.todos[indexNumber].status ? 0 : 1;
    },


    doRemove(state, indexNumber) {
      state.todos.splice(indexNumber, 1)
    },
    updatePicked(state, pickedValue) {
      state.picked = pickedValue
    },
  },
  actions: {

  }
})
export default store
