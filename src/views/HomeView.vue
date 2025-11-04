<script>
import { useTodosStore } from "@/stores/todos.js";
import todoList from "@/components/todoList.vue";
import { useAuthStore } from "@/stores/auth.js";
import addTodoBarComp from "@/components/addTodoBar.vue";
import pagination from "@/components/pagination.vue";
import { useDark, useToggle } from "@vueuse/core";
import { useRoute } from 'vue-router';

export default {
  components: {
    todoList,
    addTodoBarComp,
    pagination,
  },
  setup() {
    const isDark = useDark();
    const toggleDark = useToggle(isDark);
    const route = useRoute();

    const todosStore = useTodosStore();
    const authStore = useAuthStore();

    return { todosStore, authStore, isDark, toggleDark, route };
  },
  data() {
    return {
      selectCompleted: "all",
      editTodoBar: false,
      addTodoBar: false,
    };
  },
  watch: {
    'todosStore.params': {
      handler() {
        this.todosStore.getTodos();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getSelectedTodos() {
      this.todosStore.params.complete = this.selectCompleted;
    },
  },
  mounted() {
    const page = this.route.query.page;
    if (page) {
      this.todosStore.params.page = page;
    }
    const complete = this.route.query.complete;
    if (complete) {
      this.todosStore.params.complete = complete;
    }
  },
};
</script>

<template>
  <main class="h-full">
    <div class="h-full bg-black dark:bg-white flex justify-between flex-col">
      <div class="bg-gray-600 dark:bg-gray-800">
        <div
          class="container px-8 sm:px-6 md:px-8 h-24 content-center pb-1 m-auto"
        >
          <div class="flex items-center justify-between">
            <router-link
                to="/home"
              class="flex flex-col items-center gap-2 transition duration-300 ease-in cursor-pointer hover:scale-120"
            >
              <font-awesome-icon
                class="text-white font-bold text-xl"
                icon="fa-solid fa-house"
              />
              <div class="text-white text-base font-medium">Index</div>
            </router-link>

            <div class="relative">
              <div
                @click="addTodoBar = !addTodoBar"
                class="bg-blue-600 dark:bg-blue-900 w-17 h-17 rounded-4xl text-white text-4xl text-center content-center font-light absolute top-4 -left-7 transition duration-300 ease-in cursor-pointer hover:scale-120"
              >
                +
              </div>
            </div>

            <div class="flex items-center gap-2">
              <div>
                <button @click="toggleDark()">
                  <font-awesome-icon
                    class="text-4xl text-white transition duration-300 ease-in cursor-pointer hover:scale-120"
                    v-if="!isDark"
                    icon="fa-solid fa-moon"
                  />
                  <font-awesome-icon
                    class="text-4xl text-white transition duration-300 ease-in cursor-pointer hover:scale-120"
                    v-else
                    icon="fa-solid fa-sun"
                  />
                </button>
              </div>
              <router-link
                  :to="'profile'"
                class="flex flex-col items-center gap-2 transition duration-300 ease-in cursor-pointer hover:scale-120"
              >
                <font-awesome-icon
                  class="text-white font-bold text-xl"
                  icon="fa-solid fa-id-card-clip"
                />
                <div
                    class="text-white font-bold text-xl"
                >Profile</div
                >
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="h-full p-8">
        <div
          v-if="todosStore.todos === null"
          class="flex items-center justify-center flex-col h-full gap-5 max-w-7xl mx-auto"
        >
          <img
            class="w-50 h-50 md:w-72 md:h-72"
            src="../.././src/assets/images/empty-home.png"
            alt=""
          />
          <h3 class="text-white dark:text-black text-3xl font-normal">
            What do you want to do today?
          </h3>
          <p class="text-white dark:text-black text-2xl font-normal">
            Tap + to add your tasks
          </p>
        </div>

        <div class="container px-2 sm:px-6 md:px-8 mx-auto" v-else>
          <select
            @change="getSelectedTodos"
            class="text-white bg-gray-600 dark:bg-gray-800 p-1 rounded m-2 transition duration-300 ease-in cursor-pointer hover:scale-120"
            v-model="selectCompleted"
          >
            <option class="text-white" value="all">Все</option>
            <option class="text-white" value="complete">
              Только выполненные
            </option>
            <option class="text-white" value="uncomplete">
              Не выполненные
            </option>
          </select>
          <todo-list :todos="todosStore.todos" />
          <pagination> </pagination>
        </div>
      </div>
    </div>
    <add-todo-bar-comp
        v-if="addTodoBar"
        @cancel-add-todo-bar="addTodoBar = !addTodoBar"
    ></add-todo-bar-comp>
  </main>
</template>
