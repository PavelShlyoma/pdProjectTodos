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
  },
  setup() {
    const todosStore = useTodosStore()
    const authStore = useAuthStore()
    return { todosStore, authStore }
  },
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
    this.todosStore.getTodos()
  },
});

</script>

<template>
  <main class="h-full bg-black">
    <div  class="h-screen container px-8 sm:px-6 md:px-8 mx-auto ">
      <div class="text-white text-3xl font-bold text-center bg-gray-600 rounded-2xl content-center p-5">
        Profile
      </div>
      <div class="text-white text-2xl font-bold p-2 max-w-6xl mx-auto">
        Email: {{ this.authStore.tokenExist.email }}
      </div>
      <div class="text-white text-2xl font-bold p-2 max-w-6xl mx-auto">
        Tasks created: {{ this.todosStore.total }}
      </div>
      <div class="text-white text-2xl font-bold p-2 max-w-6xl mx-auto">
        Role: {{ this.authStore.tokenExist.role}}
      </div>
      <button class="text-white text-3xl font-bold text-center cursor-pointer bg-gray-800 w-full rounded p-3">
        Logout
      </button>
    </div>
  </main>
</template>
