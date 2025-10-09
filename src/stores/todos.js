import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { axiosInstance } from '@/plugins/axios.js'

export const useTodosStore = defineStore('todos',  {
    state: () => ({
        todos: [],
    }),
    actions: {
        getTodos(data) {
            return new Promise((resolve, reject) => {
                axiosInstance({url: 'todos', data: data, method: "GET"}).then(response => {
                    this.todos = response.data.todos
                    resolve(response.data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        postTodos(data) {
            return new Promise((resolve, reject) => {
                axiosInstance({url: `todos`, data: data, method: "POST"}).then(response => {
                    resolve(response.data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        editTodos(data) {
            return new Promise((resolve, reject) => {
                axiosInstance({url: `todos/${data.id}`, data: data, method: "PUT"}).then(response => {
                    resolve(response.data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        deleteTodos(data) {
            return new Promise((resolve, reject) => {
                axiosInstance({url: `todos/${data.id}`, data: data, method: "DELETE"}).then(response => {
                    resolve(response.data)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
})
