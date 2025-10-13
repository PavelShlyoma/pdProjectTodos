<script>
import {defineComponent} from 'vue'
import {useTodosStore} from "@/stores/todos.js";
import router from "@/router/index.js";
import {toast} from "vue3-toastify";

export default defineComponent({
  setup() {
    const todosStore = useTodosStore();

    return { todosStore }
  },
  props: ["todos"],
  data() {
    return {
      currentPage: 1,
      isLoading: false,
    }
  },
  computed: {
    pageTotal() {
      let total = Math.ceil(this.todosStore.total / 10);
      if (total > 1) {
        return total;
      }
    },
    arrPage() {
      const arr = [];
      for (let i = 0; i < this.pageTotal; i++) {
        arr.push(i + 1);
      }
      console.log(arr);
      return arr;
    },
  },
  methods: {
    newPage(page) {
      if (page !== this.currentPage) {
        this.currentPage = page;
        this.isLoading = true;
        this.todosStore.getTodosPage({
          page: page,
        }).then(res => {
        }).catch((error) => {
          toast(error.response.data.message, {
            autoClose: 5000,
          })
        }).finally(() => {
          this.isLoading = false;
        })
      }
    },
  },
});

</script>

<template>
  <main v-if="arrPage.length !== 0" class="flex justify-center items-center gap-1 mt-6">

    <div v-for="(page, index) in arrPage" :key="page">
      <button v-if="(page - this.currentPage) < 4 || (page - this.currentPage) < -4" @click="newPage(page)"  class="cursor-pointer text-white text-2xl font-normal flex items-center justify-center"  :class="{'bg-red': this.currentPage === page }">
        <svg v-if="isLoading" class="mr-3 size-5 animate-spin" viewBox="0 0 24 24">
          <font-awesome-icon icon="fa-solid fa-circle-notch" />
        </svg>
        {{ page }}
      </button>
      <div v-else class="text-white text-2xl font-normal">
        .
      </div>
    </div>

    <button @click="newPage(this.currentPage - 1)" :disabled="(this.currentPage - 1) === 0" class="cursor-pointer text-white text-2xl font-normal px-1 flex items-center justify-center">
      <svg v-if="isLoading" class="mr-3 size-5 animate-spin" viewBox="0 0 24 24">
        <font-awesome-icon icon="fa-solid fa-circle-notch" />
      </svg>
      prev
    </button>
    <button @click="newPage(this.currentPage + 1)" :disabled="this.currentPage === this.arrPage[this.arrPage.length - 1]" class="cursor-pointer text-white text-2xl font-normal px-1 flex items-center justify-center">
      <svg v-if="isLoading" class="mr-3 size-5 animate-spin" viewBox="0 0 24 24">
        <font-awesome-icon icon="fa-solid fa-circle-notch" />
      </svg>
      next
    </button>
  </main>
</template>