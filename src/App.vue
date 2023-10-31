<script>
import FooterComponentVue from './components/FooterComponent.vue'
import NavBarVue from './components/NavBar.vue'


export default {
    components : {
      NavBarVue,
      FooterComponentVue
    }
 }
</script>

<template>
  <div>
    <NavBarVue v-if="$route.path !== '/login' && $route.path !== '/register'"/>
    <RouterView />
    <FooterComponentVue v-if="$route.path !== '/login' && $route.path !== '/register'"/>
  </div>
</template>

