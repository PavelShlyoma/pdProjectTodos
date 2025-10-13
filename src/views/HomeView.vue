<script>
import {defineComponent} from 'vue'
import {useTodosStore} from "@/stores/todos.js";
import router from "@/router/index.js";
import todoList  from "@/components/todoList.vue";
import {useAuthStore} from "@/stores/auth.js";
import addTodoBarComp from "@/components/addTodoBar.vue";
import editTodoBarComp from "@/components/editTodoBar.vue";
import pagination from "@/components/pagination.vue";
import {toast} from "vue3-toastify";

export default defineComponent({
  components: {
    todoList,
    addTodoBarComp,
    editTodoBarComp,
    pagination,
  },
  setup() {
    const todosStore = useTodosStore()
    const authStore = useAuthStore()
    return { todosStore, authStore }
  },
  data() {
    return {
      selectCompleted: 'all',
      addTodoBar: false,
      editTodoBar: false,
      isLoading: false,
    }
  },
  methods: {
    goToHome() {
      this.$router.push({ path: '/', replace: true })
    },
    getSelectedTodos(){
      if (this.selectCompleted === 'complete') {
        this.isLoading = true;
        this.todosStore.getTodosComplete({
          complete: 'complete',
        }).then(res => {
        }).catch((error) => {
          toast(error.response.data.message, {
            autoClose: 5000,
          })
        }).finally(() => {
          this.isLoading = false;
        })
      } else if (this.selectCompleted === 'uncomplete') {
        this.isLoading = true;
        this.todosStore.getTodosComplete({
          complete: 'uncomplete',
        }).then(res => {
        }).catch((error) => {
          toast(error.response.data.message, {
            autoClose: 5000,
          })
        }).finally(() => {
          this.isLoading = false;
        })
      } else {
        this.todosStore.getTodos()
      }
    },
    goToProfile() {
      this.$router.push({ path: '/profile', replace: true })
    },
  },
  mounted() {
    this.todosStore.getTodos()
  },
});

</script>

<template>
  <main class="h-full ">
    <div  class="h-screen bg-black flex justify-between flex-col">
      <div class="bg-gray-600">
        <div class="container px-8 sm:px-6 md:px-8 h-24 content-center pb-1 m-auto">
          <div class="flex items-center justify-between">
            <div class="flex flex-col items-center gap-2">
              <font-awesome-icon class="text-white font-bold text-xl" icon="fa-solid fa-house" />
              <div class="text-white text-base font-medium">Index</div>
            </div>
            <div class="relative">
              <div @click="this.addTodoBar = !this.addTodoBar" class="bg-blue-600 w-17 h-17 rounded-4xl text-white text-4xl text-center content-center font-light absolute top-4 -left-7 cursor-pointer">
                +
              </div>
            </div>
            <div class="flex flex-col items-center gap-2">
              <font-awesome-icon class="text-white font-bold text-xl" icon="fa-solid fa-id-card-clip" />
              <div class="text-white text-base font-medium">Profile</div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-full p-8 ">
        <div v-if="this.todosStore.todos === null" class="flex items-center justify-center flex-col h-full gap-5 max-w-7xl mx-auto">
          <img class="w-50 h-50 md:w-72 md:h-72" src="../.././src/assets/images/empty-home.png" alt="">
          <h3 class="text-white text-3xl font-normal">What do you want to do today?</h3>
          <p class="text-white text-2xl font-normal">Tap + to add your tasks</p>
        </div>
        <div class="container px-2 sm:px-6 md:px-8 mx-auto" v-else>
          <select @change="getSelectedTodos" class="text-white bg-gray-600 p-1 rounded m-2" v-model="selectCompleted">
            <option class="text-white" value="all">Все</option>
            <option class="text-white" value="completed">Только выполненные</option>
            <option class="text-white" value="unCompleted">Не выполненные</option>
          </select>
          <todo-list class="cursor-pointer" :todos="todosStore.todos" />
          <pagination>
          </pagination>
        </div>
      </div>
    </div>
    <add-todo-bar-comp v-if="addTodoBar" @click.self="this.addTodoBar = !this.addTodoBar"></add-todo-bar-comp>
  </main>
</template>
