<script>
import {defineComponent} from 'vue'
import {useTodosStore} from "@/stores/todos.js";
import router from "@/router/index.js";
import editTodoBarComp from "@/components/editTodoBar.vue";

export default defineComponent({
  components: {
    editTodoBarComp,
  },
  props: ["todos"],
  data() {
    return {
      editTodoBar: false,
      keyProps: '',
      keyIndex: ''
    }
  },
  methods: {
    openTodo(todo) {
      this.editTodoBar = !this.editTodoBar;
      this.keyProps = todo
    }
  }
});

</script>

<template>
  <main class="flex flex-col gap-2 max-w-5xl mx-auto">
    <button  class="bg-gray-600 flex gap-3 items-center rounded-2xl p-2" v-for="(todo, index) in todos" :key="todo.id" @click="openTodo(todo)">
      <font-awesome-icon class="text-white text-2xl font-normal" icon="fa-solid fa-check" />
      <div class="flex items-center flex-col gap-1">
        <div class="text-xl font-normal text-white">
          {{ todo.text }}
        </div>
        <div class="text-xl font-normal text-white">
          {{ todo.created_at }}
        </div>
      </div>
      <div>
        <font-awesome-icon class="text-white text-2xl font-normal" icon="fa-solid fa-xmark" />
      </div>
    </button>
    <edit-todo-bar-comp :cancel-edit="this.editTodoBar = !this.editTodoBar" :index="index" :todo="keyProps" v-if="editTodoBar" @click.self="this.editTodoBar = !this.editTodoBar" ></edit-todo-bar-comp>
  </main>
</template>