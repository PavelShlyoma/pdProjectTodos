import axios from "axios";
import { useAuthStore } from "@/stores/auth.js";
import { ref } from "vue";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const authStore = useAuthStore();

    if (authStore.token) {
      const dateNow = ref(Date.now() / 1000);
      if (dateNow.value > authStore.tokenExist.exp) {
        console.log(authStore.token);
        await authStore.refresh().then((response) => {
          config.headers.Authorization = `Bearer ${authStore.token}`;
        });
      } else {
        config.headers.Authorization = `Bearer ${authStore.token}`;
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export { axiosInstance };
