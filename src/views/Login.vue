<script>
import {defineComponent} from 'vue'

import {useAuthStore} from '@/stores/auth.js'
import {mapActions, mapState } from "pinia";
import {toast} from "vue3-toastify";

export default defineComponent({
  data() {
    return {
      isLoading: false,
      onOff: false,
      password: "",
      email: "",
    }
  },
  computed: {
    isDisabled() {
      return this.password && !this.isLoading;
    }
  },
  methods: {
    ...mapActions(useAuthStore, ["login"]),
    ...mapState(useAuthStore, ['token', 'tokenExist']),
    goToRegister() {
      this.$router.push({path: '/register', replace: true})
    },
    goToHome() {
      this.$router.push({ path: '/', replace: true })
    },
    goBack() {
      window.history.back()
    },
    sendRequestLogin() {
      this.isLoading = true;
      this.login({
        "email": this.email,
        "password": this.password,
      }).then((response) => {
        this.goToHome();
      }).catch((error) => {
        toast(error.response.data.message, {
          autoClose: 5000,
        });
      }).finally(() => {
        this.isLoading = false

      })
    }
},

});

</script>

<template>

  <div class="h-full">
    <div class="h-screen bg-black">
      <form @submit.prevent="sendRequestLogin" class="container px-4 sm:px-6 md:px-8 m-auto flex justify-center flex-col pt-10" action="">
        <font-awesome-icon @click="goBack" class="text-white pt-2.5 text-2xl" icon="fa-solid fa-chevron-left" />
        <div class="text-white font-bold text-4xl opacity-87 mt-11">Login</div>

        <label class="text-white text-base font-normal opacity-87 mt-12" for="Username">Email</label>
        <input v-model="email" class="text-white font-normal p-3 rounded user-name mt-2" id="email" type="email" placeholder="Enter your Email" />

        <div class="flex flex-col relative">
          <label class="text-white text-base font-normal opacity-87 mt-6" for="password">Password</label>
          <input  v-model="password" class="text-white font-normal p-3 rounded password mt-2" id="password" :type="onOff? 'text' : 'password'" placeholder="* * * * * *" />
          <font-awesome-icon @click="this.onOff = !this.onOff" :icon="onOff? 'fa-eye' : 'fa-eye-slash'" class="absolute right-3 top-17.5 text-2xl text-white opacity-70 cursor-pointer" icon="fa-solid" />
        </div>

        <button :class="{'disabled': !isDisabled}" :disabled="!isDisabled" class="flex items-center justify-center text-white bg-sky-700 p-3 mt-14 text-base font-normal rounded" type="submit">
          <svg v-if="isLoading" class="mr-3 size-5 animate-spin" viewBox="0 0 24 24">
            <font-awesome-icon icon="fa-solid fa-circle-notch" />
          </svg>Login
        </button>

        <div class="flex gap-2">
          <div class="text-white mt-12 opacity-87 text-xs font-normal">Don’t have an account?</div>
          <router-link class="text-white mt-12 text-xs font-normal" :to="'register'">Register</router-link>
        </div>
      </form>
    </div>
  </div>

</template>

<style scoped>

  .user-name {
    background-color: #1D1D1D;
    border: 0.8px solid #979797;
  }

  .user-name::placeholder {
    color: #535353;
  }

  .password {
    background-color: #1D1D1D;
    border: 0.8px solid #979797;
  }

  .password::placeholder {
    color: #535353;
  }

  .disabled {
    opacity: 0.45;
    cursor: default;
  }

</style>