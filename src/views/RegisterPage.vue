<script>
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['handleRegister']),
    doRegister() {
      this.handleRegister(this.form)
    }
  }
}
</script>

<template>
  <!--Sign Up-->
  <div class="w-full mx-auto h-[720px] flex flex-row">
    <!--login section-->
    <div class="w-1/2 grid place-content-center">
      <div class="text-sky-600 text-4xl font-semibold font-['Open Sans']">Sign Up and Enjoy!</div>

      <form v-on:submit.prevent="doRegister" id="form-login" class="w-1/2 mt-8">
        <div class="flex flex-col mt-2">
          <label for="" class="text-sky-600 text-xl font-semibold font-['Open Sans']">Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="Enter your email..."
            class="w-96 h-12 pl-4 mt-1 bg-white rounded-lg border border-zinc-400 400 text-sky-600 text-xl"
          />
        </div>
        <div class="flex flex-col mt-2">
          <label for="" class="text-sky-600 text-xl font-semibold font-['Open Sans']"
            >Password</label
          >
          <input
            v-model="form.password"
            type="password"
            placeholder="Enter your password..."
            class="w-96 h-12 pl-4 mt-1 bg-white rounded-lg border border-zinc-400 400 text-sky-600 text-xl"
          />
        </div>
        <div
          class="w-96 h-12 mt-8 bg-sky-600 text-xl text-white rounded-lg grid content-center hover:bg-sky-700"
        >
          <button type="submit" class="">Sign Up</button>
        </div>
      </form>

      <div class="text-md text-center mt-8 font-['Open Sans']">
        <p class="text-zinc-500">
          Already have an account?
          <a @click.prevent="$router.push('/login')" href="" class="text-sky-600">Sign in</a>
        </p>
      </div>
    </div>
    <!--login section-->

    <!--picture-->
    <div class="w-1/2 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1562790351-d273a961e0e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80"
        alt=""
        class="object-fill"
      />
    </div>
    <!--picture-->
  </div>
  <!--End of Sign Up-->
</template>
