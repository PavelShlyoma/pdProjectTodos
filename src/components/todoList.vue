<script>
import {defineComponent} from 'vue'
import {useTodosStore} from "@/stores/todos.js";
import router from "@/router/index.js";
import editTodoBarComp from "@/components/editTodoBar.vue";
import {toast} from "vue3-toastify";

export default defineComponent({
  setup() {
    const todosStore = useTodosStore()
    return { todosStore }
  },
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
      console.log('openTodo', this.keyProps, this.editTodoBar)
    },
    patchTodoElement(id, completed, todo) {
      this.isLoading = true;
      this.todosStore.patchTodos({
        id: id,
        complete: completed,
      }).then(res => {
          todo.is_complete = !todo.is_complete;
      }).catch((error) => {
        toast(error.response.data.message, {
          autoClose: 5000,
        })
      }).finally(() => {
        this.isLoading = false;
      })
    }
  }
});

</script>

<template>
  <main  class="flex flex-col gap-2 max-w-5xl mx-auto">
    <button :class="{'opacity-50': todo.is_complete}" class="bg-gray-600 flex gap-3 items-center rounded-2xl p-2" v-for="(todo, index) in todos" :key="todo.id" @click="openTodo(todo)">
      <font-awesome-icon @click.stop="patchTodoElement(todo.id, 'true', todo)" v-if="todo.is_complete === false" class="text-white text-2xl font-normal" icon="fa-solid fa-check" />
      <font-awesome-icon @click.stop="patchTodoElement(todo.id, 'false', todo)"  v-else class="text-white text-2xl font-normal" icon="fa-solid fa-xmark" />
      <div class="flex flex-col gap-1 w-full">
        <div class="text-xl font-normal text-white text-left">
          {{ todo.text }}
        </div>
        <div class="text-xl font-normal text-white flex justify-between">
          <div>{{ todo.created_at.split(/[a-zA-Z]+/)[0] }}</div>
          <div>{{ todo.created_at.split(/[a-zA-Z]+/)[1] }}</div>
        </div>
      </div>
    </button>
    <edit-todo-bar-comp  :todo="keyProps" v-if="editTodoBar" @cancel-edit="this.editTodoBar = !this.editTodoBar" ></edit-todo-bar-comp>
  </main>
</template>