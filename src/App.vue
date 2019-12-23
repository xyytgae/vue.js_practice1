<template>
<div>
  <h1>ToDoリスト</h1>
  <form>
    <label>
      <input type="radio" name="button" value="all" v-model="picked" checked/>全て
    </label>
    <label>
      <input type="radio" name="button" value="working" v-model="picked">作業中
    </label>
    <label>
      <input type="radio" name="button" value="done" v-model="picked">完了
    </label>
    <br>
  </form>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>コメント</th>
        <th>状態</th>
      </tr>
    </thead>
    <tbody>
        <tr v-for="(item, index) in displayTodos" v-bind:key="item.id">
            <td>{{ item.id + 1 }}</td>
            <td>{{ item.comment }}</td>
            <td>
              <button type="button" v-on:click="statusButton(index)">{{ optionsChange(item) }}</button>
              <button type="button" v-on:click="doRemove(index)">削除</button>
            </td>
          </tr>
    </tbody>
  </table>

  <h2>新規タスクの追加</h2>
  <input type="text" v-model.lazy="newTask">
  <button type="button" v-on:click="addButton">追加</button>
</div>
</template>

<script>
import { options } from './lib/definitions.js';
export default {
data () {
  return {
    newTask: '',
  }
},
methods: {
  addButton() {
    if (this.newTask.length <= 0) {
      return this.newTask;
    }else {
      this.$store.commit('addButton',this.newTask);
      this.newTask = '';
    }
  },
   statusButton(index) {
     this.$store.commit('statusButton', index);
   },
   doRemove(index) {
     this.$store.commit('doRemove', index);
   },
   optionsChange(item) {
     return options[this.$store.state.todos[item.id].status];
   },
},
computed: {
  displayTodos: function() {
    return this.$store.getters.filter
  },
  picked: {
    get () {
      return this.$store.state.picked
    },
    set (value) {
      this.$store.commit('updatePicked', value)
    },
  }
},
};
</script>
