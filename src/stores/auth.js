import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { axiosInstance } from '@/plugins/axios.js'

export const useAuthStore = defineStore('auth', () => {
    const token = ref('')

    const tokenExist = computed(() => {
        return atob(token.value.split('.')[1]);
    })

    function register(data) {
        return new Promise((resolve, reject) => {
            axiosInstance({url: 'register', data: data, method: "POST"}).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    }

    function login(data) {
        return new Promise((resolve, reject) => {
            axiosInstance({url: 'login', data: data, method: "POST"}).then(response => {
                token.value = response.data.token;
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    }

    function logout() {
        return new Promise((resolve, reject) => {
            axiosInstance({url: 'logout', method: 'POST'}).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    }

    function refresh() {
        return new Promise((resolve, reject) => {
            axiosInstance({url: 'refresh', method: 'GET'}).then(response => {
                resolve(response.data)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }

    return { register, login, token, tokenExist, logout, refresh }
})
