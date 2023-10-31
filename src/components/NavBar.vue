<script>
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
  data() {
    return {
      isTokenAvail: false,
      userId: '',
      email: '',
      imageUrl: ''
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['handleLogout']),
    async doLogout() {
      try {
        await this.handleLogout()
        this.isTokenAvail = false
      } catch (error) {
        console.error(error)
      }
    }
  },
  created() {
    if (localStorage.access_token) {
      this.isTokenAvail = true
      this.userId = localStorage.userId
      this.email = localStorage.email
      this.imageUrl = localStorage.imageUrl
    }
  }
}
</script>

<template>
  <!--navbar-->
  <div class="w-[1440px] mx-auto grid h-auto">
    <div class="flex flex-row justify-between ml-24 mr-24 mt-8">
      <div class="grid content-center my-auto">
        <a @click.prevent="$router.push('/')" href="">
          <img src="/logo-turu.png" alt="logo" class="w-auto h-12" />
        </a>
      </div>
      <div class="flex flex-row gap-4">
        <!--login signup-->
        <a v-if="isTokenAvail === false" @click.prevent="$router.push('/login')" href="">
          <div
            class="text-center text-sky-600 text-xl font-semibold font-['Open Sans'] w-32 h-12 grid place-content-center rounded-xl border border-sky-600 hover:bg-sky-600 hover:text-white"
          >
            Sign In
          </div>
        </a>
        <a v-if="isTokenAvail === false" @click.prevent="$router.push('/register')" href="">
          <div
            class="text-center text-white bg-sky-600 text-xl font-semibold font-['Open Sans'] w-32 h-12 grid place-content-center rounded-xl border border-sky-600 hover:bg-sky-700"
          >
            Sign Up
          </div>
        </a>
        <!--login signup-->

        <!--when already login-->
        <a @click.prevent="$router.push('/bookmarks')" href="">
          <div
            v-if="isTokenAvail === true"
            class="text-center text-sky-600 text-xl font-normal font-['Open Sans'] h-12 grid place-content-center"
          >
            My Bookmark
          </div></a
        >
        <div
          v-if="isTokenAvail === true"
          class="bg-white overflow-hidden h-12 flex flex-row rounded-xl border border-sky-600"
        >
          <div
            class="px-4 grid place-content-center text-center text-sky-600 text-xl font-normal font-['Open Sans']"
          >
            {{ email }}
          </div>
          <img class="w-12 h-12" :src="imageUrl" alt="" />
        </div>
        <a v-if="isTokenAvail === true" @click.prevent="doLogout" href="">
          <div
            class="text-center text-sky-600 bg-white text-xl font-semibold font-['Open Sans'] w-32 h-12 grid place-content-center rounded-xl border border-sky-600 hover:bg-sky-600 hover:text-white"
          >
            Log Out
          </div>
        </a>
        <!--when already login-->
      </div>
    </div>
  </div>
  <!--end of navbar-->
</template>
