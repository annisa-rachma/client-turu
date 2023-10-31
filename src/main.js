// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { markRaw } from 'vue'
import App from './App.vue'
import router from './router'
// import vue3GoogleLogin from 'vue3-google-login'


const pinia = createPinia()
const app = createApp(App)

pinia.use(({ store }) => {
    store.router = markRaw(router)
})

app.use(pinia)
app.use(router)


app.mount('#app')
