<script>
import { toast } from 'vue3-toastify';
import {defineComponent} from 'vue'

export default defineComponent({
  methods: {
    goToRegister() {
      this.$router.push({path: '/register', replace: true})
    },
    goBack() {
      window.history.back()
    },
},

  // mounted() {
  //   // toast("Wow so easy !", {
  //   //   autoClose: 1000,
  //   });
  // }

});

</script>

<template>

  <div class="h-full">
    <div class="h-screen bg-black">
      <form class="container px-4 sm:px-6 md:px-8 m-auto flex justify-center flex-col pt-10" action="">
        <font-awesome-icon @click="goBack" class="text-white pt-2.5 text-2xl" icon="fa-solid fa-chevron-left" />
        <div class="text-white font-bold text-4xl opacity-87 mt-11">Login</div>
        <label class="text-white text-base font-normal opacity-87 mt-12" for="email">Email</label>
        <input class="text-white font-normal p-3 rounded user-name mt-2" id="email" type="Email" placeholder="Enter your Email" />
        <label class="text-white text-base font-normal opacity-87 mt-6" for="password">Password</label>
        <input class="text-white font-normal p-3 rounded password mt-2" id="password" type="password" placeholder="* * * * * *" />
        <button class="text-white bg-sky-700 p-3 mt-14 opacity-50 text-base font-normal rounded" type="submit">Login</button>
        <div class="flex gap-2">
          <div class="text-white mt-12 opacity-87 text-xs font-normal">Don’t have an account?</div>
          <span @click="goToRegister" class="text-white mt-12 text-xs font-normal">Register</span>
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