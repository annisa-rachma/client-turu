<script>
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
  data() {
    return {
      idLogding: this.$route.params.id,
      loading: true
    }
  },
  props: ['id'],
  computed: {
    ...mapState(useCounterStore, ['lodging', 'lodgingId', 'qrCode'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchDetail'])
  },
  async created() {
    await this.fetchDetail(this.idLogding)
    this.loading = false
  }
}
</script>

<template>
  <!--DetailPage-->
  <div class="w-[1440px] mx-auto grid h-auto">
    <!-- <div  class="h-[300px] bg-white">      
      <img src="../../public/loading.gif" alt="">
    </div> -->

    <div
      v-if="loading"
      class="relative mt-8 mb-12 grid grid-cols-4 ml-24 mr-24 h-auto border-t-2 border-sky-600"
    >
      <img
        src="/loading.gif"
        alt=""
        class="absolute h-48 w-48 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
      />

      <!--title-->
      <div class="col-span-4 grid grid-cols-4 mb-4 mt-6">
        <div class="col-span-4">
          <h1 class="text-left text-4xl font-bold text-sky-600">{{ lodging.name }}</h1>
          <div class="flex flex-row content-center">
            <img class="h-8 mt-2" src="/Location.png" alt="" />
            <p class="ml-4 text-left text-xl font-normal text-sky-600 mt-2">
              {{ lodging.location }}
            </p>
          </div>
        </div>
      </div>
      <!--title-->

      <!--picture-->
      <div class="col-span-4 grid grid-cols-4 grid-rows-2 gap-4">
        <div class="col-span-3 row-span-2 h-[500px] w-full overflow-hidden rounded-2xl">
          <img class="object-cover w-full" :src="lodging.imgUrl" alt="" />
        </div>
        <div class="w-full overflow-hidden rounded-2xl">
          <img
            class="object-cover w-full h-full"
            src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/434742279.jpg?k=2c2c7f8ecaed44357b51e617b975dad3315b3b108824698b632588c28645ab8e&o=&hp=1"
            alt=""
          />
        </div>
        <div class="w-full overflow-hidden rounded-2xl">
          <img
            class="object-cover w-full h-full"
            src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/263784255.jpg?k=eff76c550d6df958b358cdaf949e4befc6cd045c92c70ab6fe0764a93112cd45&o=&hp=1"
            alt=""
          />
        </div>
      </div>
      <!--picture-->

      <!--detail-->
      <div class="col-span-4 grid grid-cols-4 gap-4 mt-12">
        <!--left-->
        <div class="col-span-3 mr-8">
          <div class="grid grid-cols-2 pb-4 border-b-2 border-sky-600">
            <div class="">
              <h1 class="text-sky-600 text-xl font-bold text-left">Room Capacity</h1>
              <p class="text-sky-600 text-xl font-normal text-left mt-2">
                {{ lodging.roomCapacity }}
              </p>
            </div>
            <div class="">
              <h1 class="text-sky-600 text-xl font-bold text-left">Facility</h1>
              <p class="text-sky-600 text-xl font-normal text-left mt-2">{{ lodging.facility }}</p>
            </div>
          </div>
          <div class="mt-4 pb-4 border-b-2 border-sky-600">
            <h1 class="text-sky-600 text-xl font-bold text-left">About Accomodation</h1>
            <p class="text-sky-600 text-xl font-normal text-left mt-2">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
            </p>
          </div>
          <div class="grid grid-cols-2 pb-4 mt-4">
            <h1 class="text-sky-600 text-xl font-bold text-left col-span-2">
              What this place offers
            </h1>
            <div class="col-span-2 grid grid-cols-2 mt-4">
              <div class="">
                <div class="flex flex-row">
                  <img class="h-8" src="/Parking.png" alt="" />
                  <p class="text-sky-600 text-xl font-normal text-left ml-4">Parking</p>
                </div>
                <div class="flex flex-row mt-6">
                  <img class="h-8" src="/AC.png" alt="" />
                  <p class="text-sky-600 text-xl font-normal text-left ml-4">AC</p>
                </div>
                <div class="flex flex-row mt-6">
                  <img class="h-10 ml-1" src="/Restaurant.png" alt="" />
                  <p class="text-sky-600 text-xl font-normal text-left ml-4">Restaurant</p>
                </div>
              </div>
              <div class="">
                <div class="flex flex-row">
                  <img class="h-8" src="/Wi-Fi.png" alt="" />
                  <p class="text-sky-600 text-xl font-normal text-left ml-4">Wifi</p>
                </div>
                <div class="flex flex-row mt-6">
                  <img class="h-8" src="/Swimmingpool.png" alt="" />
                  <p class="text-sky-600 text-xl font-normal text-left ml-4">Swimming Pool</p>
                </div>
                <div class="flex flex-row mt-6">
                  <img class="h-10" src="/Last24-Hours.png" alt="" />
                  <p class="text-sky-600 text-xl font-normal text-left ml-4">24-Hour Front Desk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--left-->

        <!--right-->
        <div class="col-span-1">
          <div
            class="h-14 mb-4 border border-sky-600 bg-sky-600 text-xl font-bold text-white rounded-lg grid place-content-center"
          >
            Rp
            {{
              new Intl.NumberFormat('id-ID', {
                currency: 'IDR'
              }).format(lodging.price)
            }}/night
          </div>
          <div
            class="h-14 mb-4 bg-sky-600 text-xl font-bold text-white rounded-lg grid place-content-center hover:bg-sky-700"
          >
            <button type="submit" class="">RENT NOW</button>
          </div>

          <span class="border-sky-600" v-html="qrCode"></span>
        </div>
        <!--right-->
      </div>
      <!--detail-->
    </div>

    <div v-else class="mt-8 mb-12 grid grid-cols-4 ml-24 mr-24 h-auto border-t-2 border-sky-600">
      <!--title-->
      <div class="col-span-4 grid grid-cols-4 mb-4 mt-6">
        <div class="col-span-3">
          <h1 class="text-left text-4xl font-bold text-sky-600">{{ lodging.name }}</h1>
          <div class="flex flex-row content-center">
            <img class="h-8 mt-2" src="/Location.png" alt="" />
            <p class="ml-4 text-left text-xl font-normal text-sky-600 mt-2">
              {{ lodging.location }}
            </p>
          </div>
        </div>
      </div>
      <!--title-->

      <!--picture-->
      <div class="col-span-4 grid grid-cols-4 grid-rows-2 gap-4">
        <div class="col-span-3 row-span-2 h-[500px] w-full overflow-hidden rounded-2xl">
          <img class="object-cover w-full" :src="lodging.imgUrl" alt="" />
        </div>
        <div class="w-full overflow-hidden rounded-2xl">
          <img
            class="object-cover w-full h-full"
            src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/434742279.jpg?k=2c2c7f8ecaed44357b51e617b975dad3315b3b108824698b632588c28645ab8e&o=&hp=1"
            alt=""
          />
        </div>
        <div class="w-full overflow-hidden rounded-2xl">
          <img
            class="object-cover w-full h-full"
            src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/263784255.jpg?k=eff76c550d6df958b358cdaf949e4befc6cd045c92c70ab6fe0764a93112cd45&o=&hp=1"
            alt=""
          />
        </div>
      </div>
      <!--picture-->

      <!--detail-->
      <div class="col-span-4 grid grid-cols-4 gap-4 mt-12">
        <!--left-->
        <div class="col-span-3 mr-8">
          <div class="grid grid-cols-2 pb-4 border-b-2 border-sky-600">
            <div class="">
              <h1 class="text-sky-600 text-xl font-bold text-left">Room Capacity</h1>
              <p class="text-sky-600 text-xl font-normal text-left mt-2">
                {{ lodging.roomCapacity }}
              </p>
            </div>
            <div class="">
              <h1 class="text-sky-600 text-xl font-bold text-left">Facility</h1>
              <p class="text-sky-600 text-xl font-normal text-left mt-2">{{ lodging.facility }}</p>
            </div>
          </div>
          <div class="mt-4 pb-4 border-b-2 border-sky-600">
            <h1 class="text-sky-600 text-xl font-bold text-left">About Accomodation</h1>
            <p class="text-sky-600 text-xl font-normal text-left mt-2">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
            </p>
          </div>
          <div class="grid grid-cols-2 pb-4 mt-4">
            <h1 class="text-sky-600 text-xl font-bold text-left col-span-2">
              What this place offers
            </h1>
            <div class="col-span-2 grid grid-cols-2 mt-4">
              <div class="">
                <div class="flex flex-row">
                  <img class="h-8" src="/Parking.png" alt="" />
                  <p class="text-sky-600 text-xl font-normal text-left ml-4">Parking</p>
                </div>
                <div class="flex flex-row mt-6">
                  <img class="h-8" src="/AC.png" alt="" />
                  <p class="text-sky-600 text-xl font-normal text-left ml-4">AC</p>
                </div>
                <div class="flex flex-row mt-6">
                  <img class="h-10 ml-1" src="/Restaurant.png" alt="" />
                  <p class="text-sky-600 text-xl font-normal text-left ml-4">Restaurant</p>
                </div>
              </div>
              <div class="">
                <div class="flex flex-row">
                  <img class="h-8" src="/Wi-Fi.png" alt="" />
                  <p class="text-sky-600 text-xl font-normal text-left ml-4">Wifi</p>
                </div>
                <div class="flex flex-row mt-6">
                  <img class="h-8" src="/Swimmingpool.png" alt="" />
                  <p class="text-sky-600 text-xl font-normal text-left ml-4">Swimming Pool</p>
                </div>
                <div class="flex flex-row mt-6">
                  <img class="h-10" src="/Last24-Hours.png" alt="" />
                  <p class="text-sky-600 text-xl font-normal text-left ml-4">24-Hour Front Desk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--left-->

        <!--right-->
        <div class="col-span-1">
          <div
            class="h-14 mb-4 border border-sky-600 bg-sky-600 text-xl font-bold text-white rounded-lg grid place-content-center"
          >
            Rp
            {{
              new Intl.NumberFormat('id-ID', {
                currency: 'IDR'
              }).format(lodging.price)
            }}/night
          </div>
          <div
            class="h-14 mb-4 bg-sky-600 text-xl font-bold text-white rounded-lg grid place-content-center hover:bg-sky-700"
          >
            <button type="submit" class="">RENT NOW</button>
          </div>

          <span class="border-sky-600" v-html="qrCode"></span>
        </div>
        <!--right-->
      </div>
      <!--detail-->
    </div>
  </div>
  <!--End of DetailPage-->
</template>
