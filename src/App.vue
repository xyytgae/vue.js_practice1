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
        <tr v-for="(item, index) in diplayTodos" v-bind:key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.comment }}</td>
            <td>
              <button type="button" v-on:click="stateButton(item)">{{ optionsChange }}</button>
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
// components: {
//
// },
data () {
  return {
    idNumber: 0,
    newTask: '',
    comment: '',
    state: '',
    todos: [],
    picked:'',
  }
},
methods: {
  addButton() {
    if (this.newTask.length <= 0) {
      return this.newTask;
    }else {
      this.todos.push({
        id: this.idNumber,
        comment: this.newTask,
        state: 0,
    })
    this.idNumber++;
    this.newTask = '';
    }
  },
  stateButton(item) {
    item.state = item.state ? 0 : 1;
   },
   doRemove(index) {
     this.todos.splice(index, 1);
   },
},
computed: {
  diplayTodos: function() {
    if (this.picked === 'working') {
      return this.todos.filter(filteredTodos => filteredTodos.state === 0);
    } else if (this.picked === 'done') {
      return this.todos.filter(filteredTodos => filteredTodos.state === 1);
    } else {
      return this.todos;
    }
  },
  optionsChange: function(item){
    return options[item.state];
  },
},
};
</script>
