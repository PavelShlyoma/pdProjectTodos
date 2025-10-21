<script>
import { defineComponent } from "vue";
import { useTodosStore } from "@/stores/todos.js";
import { useAuthStore } from "@/stores/auth.js";
import { toast } from "vue3-toastify";

export default defineComponent({
  components: {},
  setup() {
    const todosStore = useTodosStore();
    const authStore = useAuthStore();
    return { todosStore, authStore };
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    goToLogin() {
      this.$router.push({ path: "/login", replace: true });
    },
    sendRequestLogout() {
      this.isLoading = true;
      this.authStore
        .logout({})
        .then((response) => {
          this.goToLogin();
        })
        .catch((error) => {
          toast(error.response.data.message, {
            autoClose: 5000,
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.todosStore.getTodos();
  },
});
</script>

<template>
  <main class="h-full bg-black dark-bg-white">
    <div class="h-screen container px-8 sm:px-6 md:px-8 mx-auto">
      <div
        class="text-white text-3xl font-bold text-center bg-gray-600 dark:bg-gray-800 rounded-2xl content-center p-5"
      >
        Profile
      </div>

      <div class="text-white text-2xl font-bold p-2 max-w-6xl mx-auto">
        Email: {{ this.authStore.tokenExist.email }}
      </div>

      <div class="text-white text-2xl font-bold p-2 max-w-6xl mx-auto">
        Tasks created: {{ this.todosStore.total }}
      </div>

      <div class="text-white text-2xl font-bold p-2 max-w-6xl mx-auto">
        Role: {{ this.authStore.tokenExist.role }}
      </div>

      <button
        @click="sendRequestLogout"
        class="text-white text-3xl font-bold text-center cursor-pointer bg-gray-800 dark:bg-gray-400 w-full rounded p-3"
      >
        <svg
          v-if="isLoading"
          class="mr-3 size-5 animate-spin"
          viewBox="0 0 24 24"
        >
          <font-awesome-icon icon="fa-solid fa-circle-notch" />
        </svg>
        Logout
      </button>
    </div>
  </main>
</template>
