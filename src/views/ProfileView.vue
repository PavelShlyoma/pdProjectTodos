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
  },
});

</script>

<template>
  <main class="h-full ">
  </main>
</template>
