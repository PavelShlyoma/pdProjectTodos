<script>
import { useTodosStore } from "@/stores/todos.js";

export default {
  setup() {
    const todosStore = useTodosStore();

    return { todosStore };
  },
  props: ["todos"],
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    pageTotal() {
      let total = Math.ceil(this.todosStore.total / 10);
      return ((total > 1)? total : 0);
    },
  },
  methods: {
    newPage(page) {
      if (page !== this.todosStore.currentPage) {
        this.todosStore.currentPage = page;
        this.isLoading = true;
        this.todosStore
          .getTodos( null, this.todosStore.currentPage)
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
  },
};
</script>

<template>
  <main
    v-if="pageTotal !== 0"
    class="flex justify-center items-center mt-6"
  >
    <button
        @click="newPage( 1)"
        :disabled="todosStore.currentPage - 1 === 0"
        :class="(todosStore.currentPage - 1 === 0)? 'opacity-50 cursor-default' : 'opacity-100 cursor-pointer hover:scale-120'"
        class="transition duration-300 ease-in text-white dark:text-black text-xl font-normal px-1 flex items-center justify-center"
    >
      <<
    </button>
    <button
        @click="newPage(todosStore.currentPage - 1)"
        :disabled="todosStore.currentPage - 1 === 0"
        :class="(todosStore.currentPage - 1 === 0)? 'opacity-50 cursor-default' : 'opacity-100 cursor-pointer hover:scale-120'"
        class="transition duration-300 ease-in text-white dark:text-black text-xl font-normal px-1 flex items-center justify-center"
    >
      <
    </button>
    <div class="p-1" v-for="page in pageTotal" :key="page">
      <button
        v-if="page - todosStore.currentPage < 4 && page - todosStore.currentPage > -4"
        @click="newPage(page)"
        :disabled="isLoading"
        class="transition duration-300  ease-in cursor-pointer  hover:scale-110 text-white dark:text-black text-2xl font-normal flex items-center justify-center"
        :class="{ 'rounded scale-120 hover:scale-120': (todosStore.currentPage === page) }"
      >
        {{ page }}
      </button>
    </div>

    <button
      @click="newPage(todosStore.currentPage + 1)"
      :disabled="todosStore.currentPage === pageTotal"
      :class="(todosStore.currentPage === pageTotal)? 'opacity-50 cursor-default' : 'opacity-100 cursor-pointer hover:scale-120'"
      class="transition duration-300 ease-in text-white dark:text-black text-xl font-normal px-1 flex items-center justify-center"
    >
      >
    </button>
    <button
        @click="newPage(pageTotal)"
        :disabled="todosStore.currentPage === pageTotal"
        :class="(todosStore.currentPage === pageTotal)? 'opacity-50 cursor-default' : 'opacity-100 cursor-pointer hover:scale-120'"
        class="transition duration-300 ease-in text-white dark:text-black text-xl font-normal px-1 flex items-center justify-center"
    >
      >>
    </button>
  </main>
</template>
