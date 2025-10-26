import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { axiosInstance } from "@/plugins/axios.js";

export const useTodosStore = defineStore("todos", {
  state: () => ({
    todos: [],
    total: "",
    newUrl: "",
    params: {},
    currentPage: 1,
  }),
  actions: {
    getTodos(complete=null, page=null) {
      const params = this.params;
      if (params.page) {
        params.page = null;
      }
      if (complete) {
        params.complete = complete;
      }
      if (page) {
        params.page = page;
      }
      return new Promise((resolve, reject) => {
        axiosInstance({ url: "todos", params: params, method: "GET" })
          .then((response) => {
            this.todos = response.data.todos;
            this.total = response.data.total;
            this.params = response.config.params;
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    postTodos(data) {
      return new Promise((resolve, reject) => {
        axiosInstance({ url: `todos`, data: data, method: "POST" })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editTodos(data) {
      return new Promise((resolve, reject) => {
        axiosInstance({ url: `todos/${data.id}`, data: data, method: "PUT" })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    patchTodos(data) {
      return new Promise((resolve, reject) => {
        axiosInstance({
          url: `todos/${data.id}/action/${data.complete}`,
          data: data,
          method: "PATCH",
        })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteTodos(data) {
      return new Promise((resolve, reject) => {
        axiosInstance({ url: `todos/${data.id}`, data: data, method: "DELETE" })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
