<script>

import {defineComponent} from 'vue'
import {useAuthStore} from '@/stores/auth.js'
import {mapActions} from "pinia";

export default defineComponent({
  data() {
    return {
      isLoading: false,
    }
  },
  methods: {
    ...mapActions(useAuthStore, ["register"]),
    goToLogin() {
      this.$router.push({ path: '/login', replace: true })
    },
    goBack() {
      window.history.back()
    },
    sendRequestRegistration() {
      this.isLoading = true;
      this.register({
        "email": "pashcko.shlyoma@yandex.ru",
        "password": "gfdtk2000A",
        "password_retry": "gfdtk2000A"
      }).then((response) => {
        console.log(response)

      }).catch((error) => {
        console.log(error)

      }).finally(() => {
        this.isLoading = false

      })
    }
  }
});

</script>

<template>

  <div class="h-full">
    <div class="h-screen bg-black">
      <form class="container px-4 sm:px-6 md:px-8 m-auto flex justify-center flex-col pt-10" action="">
        <font-awesome-icon @click="goBack" class="text-white pt-2.5 text-2xl" icon="fa-solid fa-chevron-left" />
        <div class="text-white font-bold text-4xl opacity-87 mt-11">Login</div>

        <label class="text-white text-base font-normal opacity-87 mt-12" for="Username">Email</label>
        <input class="text-white font-normal p-3 rounded user-name mt-2" id="email" type="email" placeholder="Enter your Email" />

        <label class="text-white text-base font-normal opacity-87 mt-6" for="password">Password</label>
        <input class="text-white font-normal p-3 rounded password mt-2" id="password" type="password" placeholder="* * * * * *" />

        <label class="text-white text-base font-normal opacity-87 mt-6" for="password">Confirm Password</label>
        <input class="text-white font-normal p-3 rounded password mt-2" id="password" type="password" placeholder="* * * * * *" />

        <button @click="sendRequestRegistration" class="text-white bg-sky-700 p-3 mt-14 opacity-50 text-base font-normal rounded" type="submit">Register</button>
        <div class="flex gap-2">
          <div class="text-white mt-12 opacity-87 text-xs font-normal">Already have an account?</div>
          <span @click="goToLogin" class="text-white mt-12 text-xs font-normal">Login</span>
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

</style>