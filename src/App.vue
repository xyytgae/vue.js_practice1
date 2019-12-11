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
            <td>{{ item.id }}</td>
            <td>{{ item.comment }}</td>
            <td>
              <button type="button" v-on:click="statusButton(item)">{{ optionsChange(item) }}</button>
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
    picked:'',
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
  statusButton(item) {
    item.status = item.status ? 0 : 1;
   },
   doRemove(index) {
     this.$store.state.todos.splice(index, 1);
   },
   optionsChange(item) {
     return options[item.status];
   },
},
computed: {
  displayTodos: function() {
    if (this.picked === 'working') {
      return this.$store.state.todos.filter(filteredTodos => filteredTodos.status === 0);
    } else if (this.picked === 'done') {
      return this.$store.state.todos.filter(filteredTodos => filteredTodos.status === 1);
    } else {
      return this.$store.state.todos;
    }
  },
},
};
</script>
