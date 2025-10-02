import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/plugins/axios.js'

export const useAuthStore = defineStore('auth', () => {

    function register(data) {
        return new Promise((resolve, reject) => {
            axios({url: 'http://localhost:8080/register', data: data, method: "POST"}).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    }

    return { register }
})
