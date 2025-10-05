<script>

import {defineComponent} from 'vue'
import {useAuthStore} from '@/stores/auth.js'
import {mapActions, mapState } from "pinia";

const emailCheckRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default defineComponent({
  data() {
    return {
      isLoading: false,
      email: "",
      isEmailTouched: false,
      errorEmailMessage: "",

      password: "",
      isPasswordTouched: false,
      errorPasswordMessage: "",
      passwordRetry: "",


    }
  },
  computed: {
    isEmailValid() {
      return emailCheckRegex.test(this.email);
    },

    isEmailError() {
      if (!this.email) {
        this.errorEmailMessage = "The field must not be empty.";
      } else {
        this.errorEmailMessage = "The email you entered contains prohibited characters.";
      }
      return !this.isEmailValid && this.isEmailTouched;
    },

    isPasswordValid() {
      if (!this.password) {
        this.errorPasswordMessage = "The field must not be empty.";
      } else if (!(/\d/.test(this.password))) {
        this.errorPasswordMessage = "You need to add at least one digit.";
      } else if (!(/[a-z]/.test(this.password))) {
        this.errorPasswordMessage = "You need to add at least one lowercase letter.";
      } else if (!/[A-Z]/.test(this.password)) {
        this.errorPasswordMessage = "You must add at least one capital letter.";
      }else if (!/\W/.test(this.password)) {
        this.errorPasswordMessage = "Please add at least one special character.";
      } else if (!/.{8,}/.test(this.password)) {
        this.errorPasswordMessage = "Enter a minimum of eight characters.";
      }
      return this.isPasswordTouched && !(/^[A-Za-z\d@$!%*?&]{8,}$/.test(this.password))
    },

    isPasswordRetryValid() {
      return this.passwordRetry === this.password;
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
      console.log("col= sendRequestRegistration")
      this.isLoading = true;
      this.register({
        "email": this.email,
        "password": this.password,
        "password_retry": this.passwordRetry,
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
      <form @submit.prevent="sendRequestRegistration" class="container px-4 sm:px-6 md:px-8 m-auto flex justify-center flex-col pt-10" action="">
        <font-awesome-icon @click="goBack" class="text-white pt-2.5 text-2xl" icon="fa-solid fa-chevron-left" />
        <div class="text-white font-bold text-4xl opacity-87 mt-11">Register</div>

        <label class="text-white text-base font-normal opacity-87 mt-12" for="Username">Email</label>
        <input :class="{ error: isEmailError }" @blur="isEmailTouched = true" v-model="email" class="text-white font-normal p-3 rounded user-name mt-2" id="email" type="email" placeholder="Enter your Email" />
        <div class="text-base text-red-700 font-bold" v-if="isEmailError">{{ errorEmailMessage }}</div>

        <label class="text-white text-base font-normal opacity-87 mt-6" for="password">Password</label>
        <input :class="{ error: isPasswordValid }" @blur="isPasswordTouched = true" v-model="password" class="text-white font-normal p-3 rounded password mt-2" id="password" type="password" placeholder="* * * * * *" />
        <div class="text-base text-red-700 font-bold" v-if="isPasswordValid">{{ errorPasswordMessage }}</div>


        <label class="text-white text-base font-normal opacity-87 mt-6" for="passwordRetry">Confirm Password</label>
        <input :class="{ error: !isPasswordRetryValid }" v-model="passwordRetry" class="text-white font-normal p-3 rounded password mt-2" id="passwordRetry" type="password" placeholder="* * * * * *" />
        <div class="text-base text-red-700 font-bold" v-if="!isPasswordRetryValid">The passwords don't match</div>

        <button :disabled="isEmailError && isPasswordValid && isPasswordRetryValid" class="text-white bg-sky-700 p-3 mt-14 opacity-50 text-base font-normal rounded" type="submit">Register</button>
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

.user-name.error {
  border: 1px solid red;
}

.user-name::placeholder {
  color: #535353;
}

.password {
  background-color: #1D1D1D;
  border: 0.8px solid #979797;
}

.password.error {
  border: 1px solid red;
}

.password::placeholder {
  color: #535353;
}

</style>