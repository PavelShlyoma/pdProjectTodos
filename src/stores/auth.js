import { defineStore } from "pinia";
import { axiosInstance } from "@/plugins/axios.js";
import router from "@/router/index.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "",
  }),
  getters: {
    tokenExist() {
      return JSON.parse(atob(this.token.split(".")[1]));
    },
  },
  actions: {
    register(data) {
      return new Promise((resolve, reject) => {
        axiosInstance({ url: "register", data: data, method: "POST" })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    login(data) {
      return new Promise((resolve, reject) => {
        const axiosInstanceLogin = axiosInstance.create();
        axiosInstanceLogin({ url: "login", data: data, method: "POST" })
          .then((response) => {
            this.token = response.data.token;
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    logout() {
      return new Promise((resolve, reject) => {
        axiosInstance({ url: "logout", method: "POST" })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    refresh() {
      return new Promise((resolve, reject) => {
        const axiosInstanceRefresh = axiosInstance.create();
        axiosInstanceRefresh({ url: "refresh", method: "GET" })
          .then((response) => {
            this.token = response.data.token;
            resolve(response.data);
          })
          .catch((error) => {
            router.push({ path: "/login", replace: true });
            reject(error);
          });
      });
    },
  },
});
