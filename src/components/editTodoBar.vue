<script>
import {defineComponent} from "vue";
import {toast} from "vue3-toastify";
import {useTodosStore} from "@/stores/todos.js";
export default defineComponent({
  emits: [ 'cancelEdit' ],
  props: ["todo"],
  setup() {
    const todosStore = useTodosStore()
    return { todosStore }
  },
  data() {
    return {
      textTodo: '',
      isLoading: false,
    }
  },
  methods: {
    editTodoElement() {
      if (this.textTodo) {
        this.isLoading = true;
        this.todosStore.editTodos({
          id: this.todo.id,
          "text": this.textTodo,
        }).then(res => {
          this.todo.text = this.textTodo;
        }).catch((error) => {
          toast(error.response.data.message, {
            autoClose: 5000,
          })
        }).finally(() => {
          this.isLoading = false;
          this.$emit('cancelEdit')
        })
      }
    },
    deleteTodoElement() {
      this.isLoading = true;
      this.todosStore.deleteTodos({
        id: this.todo.id,
      }).then(res => {
        const index = this.todosStore.todos.findIndex(todo => todo.id === this.todo.id);
        this.todosStore.todos.splice(index, 1)
      }).catch((error) => {
        toast(error.response.data.message, {
          autoClose: 5000,
        })
      }).finally(() => {
        this.isLoading = false;
        this.$emit('cancelEdit')
      })
    }
  },
})

</script>

<template>
  <main class="h-full fixed  w-full inset-0 flex items-center justify-center flex-col p-2">
    <div class=" bg-gray-600  rounded-2xl max-w-xl w-full flex items-center justify-between opacity-87">
      <div class="flex flex-col">
        <h3 class="text-white font-normal p-3" >Edit Task</h3>
        <input  v-model="textTodo" class="text-white font-normal p-3 rounded mt-2 border border-white m-3 w-100" id="text" type="text" placeholder="Do math homework" />
      </div>
      <div class="flex flex-col items-center p-3 gap-3">
        <button @click="this.textTodo = ''" class="text-white border rounded font-normal p-1 border-b-emerald-200 cursor-pointer">Reset</button>
        <button @click="deleteTodoElement" class="text-white border rounded font-normal p-1 border-b-emerald-200 cursor-pointer flex items-center justify-center">
          <svg v-if="isLoading" class="mr-3 size-5 animate-spin" viewBox="0 0 24 24">
            <font-awesome-icon icon="fa-solid fa-circle-notch" />
          </svg>Delete task</button>
        <button :class="!this.textTodo? 'cursor-default opacity-60' : 'cursor-pointer' " :disabled="!this.textTodo" @click="editTodoElement" class="text-white border rounded font-normal p-1 border-b-emerald-200 flex items-center justify-center">
          <svg v-if="isLoading" class="mr-3 size-5 animate-spin" viewBox="0 0 24 24">
            <font-awesome-icon icon="fa-solid fa-circle-notch" />
          </svg>Submit</button>
      </div>
    </div>
  </main>
</template>