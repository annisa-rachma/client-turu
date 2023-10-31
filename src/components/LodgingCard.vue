<script>
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
  data() {
    return {
      isTokenAvail: false,
      currentPage: '',
      lodgingBookmarked: false
    }
  },
  props: ['lodging', 'lodgingBookmark'],
  computed: {
    ...mapState(useCounterStore, ['bookmarks'])
  },
  methods: {
    ...mapActions(useCounterStore, ['addBookmark']),
    handleClick() {
      this.$router.push(`/detail/${this.lodging.id}`)
      this.scrollToTop()
    },
    handleAdd() {
      this.addBookmark(this.lodging.id)
      this.lodgingBookmarked = true
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  created() {
    if (localStorage.access_token) {
      this.isTokenAvail = true
    } else if (!localStorage.access_token) {
      this.isTokenAvail = false
    }

    if (this.$route.path === '/') {
      this.currentPage = 'home'
    } else if (this.$route.path === '/bookmarks') {
      this.currentPage = 'bookmarks'
    }

    // this.bookmarks.forEach((el) => {
    //   if(el.LodgingId === this.)
    // })

    if (this.lodgingBookmark) {
      this.lodgingBookmarked = true
    } else {
      this.bookmarks.forEach((element) => {
        if (element.LodgingId === this.lodging.id) {
          this.lodgingBookmarked = true
        }
      })
    }
  }
}
</script>

<template>
  <div>
    <div v-if="currentPage === 'home'" class="w-72 h-[540px] bg-white rounded-2xl shadow-2xl">
      <a @click.prevent="handleClick" href="">
        <img class="w-72 h-60 rounded-2xl" :src="lodging.imgUrl" />
      </a>
      <div class="px-6 py-8 h-[300px] overflow-auto">
        <div class="flex flex-row justify-between">
          <p
            class="bg-sky-600 h-10 px-4 rounded-3xl text-center grid place-content-center text-white text-lg font-normal font-['Open Sans']"
          >
            {{ lodging.Type.name }}
          </p>
          <a @click.prevent="handleAdd" v-if="isTokenAvail === true" href="">
            <img
              v-if="lodgingBookmarked === true"
              src="/Bookmarked.png"
              alt="bookmark"
              class="h-8 w-auto"
            />
            <img
              v-if="lodgingBookmarked === false"
              src="/Bookmark.png"
              alt="bookmark"
              class="h-8 w-auto"
            />
          </a>
        </div>
        <div class="text-neutral-400 text-md font-normal font-['Open Sans'] mt-2">
          {{ lodging.facility }}
        </div>
        <div class="text-sky-600 text-xl font-bold font-['Open Sans'] mt-2">
          {{ lodging.name }}
        </div>
        <div class="text-sky-600 text-md font-normal font-['Open Sans'] mt-2">
          {{ lodging.location }}
        </div>
        <div class="text-sky-600 text-2xl font-semibold font-['Open Sans'] mt-2">
          Rp
          {{
            new Intl.NumberFormat('id-ID', {
              currency: 'IDR'
            }).format(lodging.price)
          }}<span class="text-neutral-400 text-base font-semibold font-['Open Sans']">/night</span>
        </div>
      </div>
    </div>

    <div v-if="currentPage === 'bookmarks'" class="w-72 h-[540px] bg-white rounded-2xl shadow-2xl">
      <a @click.prevent="handleClick" href="">
        <img class="w-72 h-60 rounded-2xl" :src="lodgingBookmark.Lodging.imgUrl" />
      </a>
      <div class="px-6 py-8 h-[300px] overflow-auto">
        <div class="flex flex-row justify-between">
          <p
            class="bg-sky-600 h-10 px-4 rounded-3xl text-center grid place-content-center text-white text-lg font-normal font-['Open Sans']"
          >
            {{ lodgingBookmark.Lodging.Type.name }}
          </p>
          <a v-if="isTokenAvail === true" href="">
            <img
              v-if="lodgingBookmarked === true"
              src="/Bookmarked.png"
              alt="bookmark"
              class="h-8 w-auto"
            />
            <img
              v-if="lodgingBookmarked === false"
              src="/Bookmark.png"
              alt="bookmark"
              class="h-8 w-auto"
            />
          </a>
        </div>
        <div class="text-neutral-400 text-md font-normal font-['Open Sans'] mt-2">
          {{ lodgingBookmark.Lodging.facility }}
        </div>
        <div class="text-sky-600 text-xl font-bold font-['Open Sans'] mt-2">
          {{ lodgingBookmark.Lodging.name }}
        </div>
        <div class="text-sky-600 text-md font-normal font-['Open Sans'] mt-2">
          {{ lodgingBookmark.Lodging.location }}
        </div>
        <div class="text-sky-600 text-2xl font-semibold font-['Open Sans'] mt-2">
          Rp
          {{
            new Intl.NumberFormat('id-ID', {
              currency: 'IDR'
            }).format(lodgingBookmark.Lodging.price)
          }}<span class="text-neutral-400 text-base font-semibold font-['Open Sans']">/night</span>
        </div>
      </div>
    </div>
  </div>
</template>
