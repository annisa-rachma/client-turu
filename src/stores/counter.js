// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const server_url = 'https://server-turu.annisa-rachma.com/pub'
export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      lodgings: [],
      types: [],
      lodgingId: '',
      lodging: {},
      qrCode: '',
      currentPage: null,
      params: {
        page: {
          size: 9,
          number: 1
        },
        location: '',
        name: '',
        category: ''
      },
      bookmarks: []
    }
  },
  getters: {},
  actions: {
    async handleRegister(input) {
      try {
        await axios({
          method: 'post',
          url: `${server_url}/register`,
          data: input
        })
        Swal.fire({
          icon: 'success',
          title: 'Register successful, please login',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.push('/login')
        
      } catch (error) {
        console.log(error.response.data.message)
        toast.error(error.response.data.message)
      }
    },
    async loginHandle(input) {
      try {
        const { data } = await axios({
          method: 'post',
          url: `${server_url}/login`,
          data: input
        })
        
        localStorage.access_token = data.access_token
        localStorage.userId = data.id
        localStorage.email = data.email
        localStorage.imageUrl = data.imageUrl
        
        toast.success('Login successful')
        setTimeout(() => {
          this.router.push('/')
        }, 1000)
      } catch (error) {
        console.log(error.response.data.message)
        toast.error(error.response.data.message)
      }
    },
    async handleLoginGoogle(response) {
      try {
        const { data } = await axios({
          url: `${server_url}/google-signin`,
          method: 'post',
          headers: {
            google_token: response.credential
          }
        })

        localStorage.access_token = data.access_token
        localStorage.userId = data.id
        localStorage.email = data.email
        localStorage.imageUrl = data.imageUrl

        this.router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
    async handleLogout() {
      try {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, logout!'
        })

        if (result.isConfirmed) {
          localStorage.clear()
          this.router.push('/')
          Swal.fire('Logged Out!', 'You have been logged out.', 'success')
        }
      } catch (error) {
        console.log(error.response.data.message)
      }
    },
    async fetchTypes() {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${server_url}/types`
        })

        this.types = data.type
      } catch (error) {
        console.log(error.response.data.message)
      }
    },
    searchInput(input) {
      this.params.location = input.location
      this.params.name = input.name
      this.params.category = input.typeId
      this.params.page.number = 1
    },
    previousPage() {
      if (this.params.page.number > 1) {
        this.params.page.number--
      }
    },
    nextPage() {
      this.params.page.number++
    },
    clearSearch() {
      this.params = {
        page: {
          size: 9,
          number: 1
        },
        location: '',
        name: '',
        category: ''
      }
    },

    async fetchData() {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${server_url}/lodgings`,
          params: this.params
        })

        this.lodgings = data.lodging
      } catch (error) {
        console.log(error.response.data.message)
      }
    },
    getId(id) {
      this.lodgingId = id
    },
    async fetchDetail(id) {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${server_url}/lodgings/${id}`
        })

        this.lodging = data.lodging
        this.qrCode = data.qr
        
      } catch (error) {
        console.log(error.response.data.message)
      }
    },
    async fetchBookmarks() {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${server_url}/bookmarks`,
          headers: {
            access_token: localStorage.access_token
          }
        })

        this.bookmarks = data

      } catch (error) {
        console.log(error.response.data.message)
      }
    },
    async addBookmark(LodgingId) {
      try {
        await axios({
          method: 'post',
          url: `${server_url}/bookmarks/${LodgingId}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        toast.success('success adding new bookmark')
        
      } catch (error) {
        console.log(error.response.data.message)
        toast.error(error.response.data.message)
      }
    }
    
  }
})
