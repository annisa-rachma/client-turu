<script>
import { mapActions, mapState } from 'pinia'
import LodgingCardVue from '../components/LodgingCard.vue'
import { useCounterStore } from '../stores/counter'

export default {
  components: {
    LodgingCardVue
  },
  computed: {
    ...mapState(useCounterStore, ['bookmarks'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchBookmarks'])
  },
  created() {
    this.fetchBookmarks()
  }
}
</script>

<template>
  <div class="w-[1440px] mx-auto grid h-auto mb-20">
    <div
      class="mt-8 mb-12 gap-x-4 gap-y-8 grid grid-cols-4 ml-24 mr-24 h-auto border-t-2 border-sky-600"
    >
      <div class="col-span-4 mt-12 mb-8">
        <h1 class="text-center text-5xl font-bold text-sky-600">My Bookmarks</h1>
      </div>
      <!--component card-->
      <div v-if="bookmarks.length === 0" class="grid grid-cols-2 col-span-4">
        <div class="grid content-center">
          <h1 class="text-left text-3xl font-bold text-sky-600 ml-24">
            You don't have any bookmarked accomodation
          </h1>
          <p class="text-left text-xl font-normal mt-4 text-sky-600 ml-24">
            You can find plenty of accomodation in our homepage
          </p>
        </div>
        <div class="grid place-content-center">
          <img src="/notFound.png" alt="not found" class="w-96 h-96" />
        </div>
      </div>
      <LodgingCardVue
        v-for="lodgingBookmark in bookmarks"
        :key="lodgingBookmark.id"
        :lodgingBookmark="lodgingBookmark"
      />
      <!--component card-->
    </div>
  </div>
</template>
