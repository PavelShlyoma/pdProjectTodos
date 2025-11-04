<script>
import { useTodosStore } from "@/stores/todos.js";
import { useAuthStore } from "@/stores/auth.js";
import {useDark, useToggle} from "@vueuse/core";

export default{
  setup() {
    const todosStore = useTodosStore();
    const authStore = useAuthStore();
    const isDark = useDark();
    const toggleDark = useToggle(isDark);
    return { todosStore, authStore, isDark, toggleDark };
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    sendRequestLogout() {
      this.isLoading = true;
      this.authStore
        .logout({})
        .then(() => {
          this.$router.push({ path: "/login", replace: true });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.todosStore.params.complete = 'all'
    this.todosStore.getTodos();
  },
};
</script>

<template>
  <main class="h-full bg-black dark:bg-white">
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
    <div class=" container px-8 sm:px-6 md:px-8 mx-auto">


      <div class="text-white dark:text-black text-2xl font-bold p-2 max-w-6xl mx-auto">
        Email: {{ authStore.tokenExist.email }}
      </div>

      <div class="text-white dark:text-black text-2xl font-bold p-2 max-w-6xl mx-auto">
        Role: {{ authStore.tokenExist.role }}
      </div>

      <button
        @click="sendRequestLogout"
        :disabled="isLoading"
        :class="isLoading? 'opacity-50 cursor-default' : 'opacity-100 cursor-pointer'"
        class="text-white dark:text-black text-3xl font-bold text-center bg-gray-800 dark:bg-gray-400 w-full rounded p-3"
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
