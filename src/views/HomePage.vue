<script>
import LodgingCardVue from '../components/LodgingCard.vue'
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  data() {
    return {
      search: {
        name: '',
        location: '',
        typeId: ''
      }
    }
  },
  computed: {
    ...mapState(useCounterStore, ['lodgings', 'types', 'bookmarks'])
  },
  components: {
    LodgingCardVue
  },
  methods: {
    ...mapActions(useCounterStore, [
      'fetchData',
      'fetchTypes',
      'searchInput',
      'clearSearch',
      'previousPage',
      'nextPage',
      'fetchBookmarks'
    ]),

    doSearch() {
      this.searchInput(this.search)
      this.fetchData()
      this.scrollToTop()
    },
    doClearSearch() {
      this.clearSearch()
      this.search = {
        name: '',
        location: '',
        typeId: ''
      }
      this.fetchData()
      this.scrollToTop()
    },
    doPrevious() {
      this.previousPage()
      this.fetchData()
      this.scrollToTop()
    },
    doNext() {
      this.nextPage()
      this.fetchData()
      this.scrollToTop()
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  created() {
    this.fetchData(), this.fetchTypes(), this.fetchBookmarks()
  }
}
</script>

<template>
  <!--HomePage-->
  <div class="w-[1440px] mx-auto grid h-auto">
    <div class="mt-8 mb-12">
      <!--hero image-->
      <div id="hero" class="flex justify-center ml-24 mr-24">
        <img class="rounded-3xl" src="/hero-image-2a.png" alt="" />
      </div>
      <!--end of hero image-->

      <!--lodging section-->
      <div class="grid grid-cols-4 ml-24 mr-24 mt-16 gap-4 h-auto">
        <!--component search-->
        <div class="mr-6">
          <form @submit.prevent="doSearch" action="" class="flex flex-col text-sky-600">
            <!--category-->
            <div class="">
              <div class="text-sky-600 text-xl font-bold">Accomodation Type</div>
              <div
                v-for="type in types"
                :key="type.id"
                class="grid grid-row-4 gap-3 rounded-xl mt-4"
              >
                <div class="flex flex-row">
                  <input
                    v-model="search.typeId"
                    type="radio"
                    name="option"
                    :id="type.id"
                    :value="type.id"
                    class="peer hidden"
                  />
                  <label
                    :for="type.id"
                    class="w-6 h-6 border border-sky-600 block cursor-pointer select-none rounded-md peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                  ></label>
                  <p class="text-lg text-sky-600 ml-4">{{ type.name }}</p>
                </div>
              </div>
            </div>
            <!--category-->

            <!--city-->
            <div class="mt-8">
              <div class="text-sky-600 text-xl font-bold">City Location</div>
              <div>
                <input
                  v-model="search.location"
                  class="border border-sky-300 bg-white px-5 h-14 rounded-lg text-lg focus:outline-none mt-4"
                  type="search"
                  placeholder="e.g Jakarta"
                />
              </div>
            </div>
            <!--city-->

            <!--lodging name-->
            <div class="mt-8">
              <div class="text-sky-600 text-xl font-bold">Lodging Name</div>
              <div>
                <input
                  v-model="search.name"
                  class="border border-sky-300 bg-white px-5 h-14 rounded-lg text-lg focus:outline-none mt-4"
                  type="search"
                  placeholder="e.g Marriott"
                />
              </div>
            </div>

            <div
              class="h-14 mt-8 bg-sky-600 text-xl text-white rounded-lg grid content-center hover:bg-sky-700"
            >
              <button type="submit" class="">Search</button>
            </div>
            <div
              @click.prevent="doClearSearch"
              class="h-14 mt-4 border border-sky-600 bg-white text-xl text-sky-600 rounded-lg grid content-center hover:bg-sky-100"
            >
              <button type="" class="">Clear Search</button>
            </div>
          </form>
        </div>
        <!--component search-->

        <div class="col-span-3">
          <!--looping card-->
          <div class="grid grid-cols-3 gap-x-4 gap-y-8 -mr-4">
            <div v-if="lodgings.length === 0" class="grid grid-cols-2 col-span-4">
              <div class="grid place-content-center">
                <h1 class="text-left text-3xl font-bold text-sky-600 ml-24">
                  Uh-oh! Your search journey hit a detour. Let's try again.
                </h1>
              </div>
              <div class="grid place-content-center">
                <img src="/notFound.png" alt="not found" class="w-96 h-96" />
              </div>
            </div>
            <!--component card-->
            <!-- <LodgingCardVue v-for="lodging in lodgings" :key="lodging.id" :lodging="lodging" /> -->
            <LodgingCardVue v-for="lodging in lodgings" :key="lodging.id" :lodging="lodging" />
            <!--component card-->
          </div>
          <!--looping card-->

          <!--pagination-->
          <div class="mt-20 flex flex-row gap-4 justify-end">
            <a @click.prevent="doPrevious" href="#hero">
              <div
                class="text-center text-sky-600 text-xl font-bold font-['Open Sans'] px-4 h-12 grid place-content-center rounded-xl border border-sky-600 hover:bg-sky-600 hover:text-white"
              >
                <p>before</p>
              </div>
            </a>
            <a @click.prevent="doNext" href="#hero">
              <div
                class="text-center text-sky-600 text-xl font-bold font-['Open Sans'] px-4 h-12 grid place-content-center rounded-xl border border-sky-600 hover:bg-sky-600 hover:text-white"
              >
                <p>next</p>
              </div>
            </a>
          </div>
          <!--pagination-->
        </div>
      </div>
      <!--end of lodging section-->
    </div>
  </div>
  <!--End of HomePage-->
</template>
