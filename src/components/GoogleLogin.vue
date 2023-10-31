<script>
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
//   emits: [''],
  data() {
    return {
      response : ''
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['handleLoginGoogle']),
    callback(response) {
      this.response = response
      this.handleLoginGoogle(this.response)
    //   this.$emit('handleLoginGoogle', this.response)
    },
    // handleLoginGoogle(response) {
    //     this.handleLoginGoogle(this.response)
    // }
  }
}
</script>

<template>
  <GoogleLogin
    :callback="callback"
    v-on:submit.prevent="callback"
    class="w-full h-12 mt-4 rounded-lg bg-white border border-zinc-200 text-xl text-white grid content-center "
    id="googleLogin"
  />
  
  
</template>


