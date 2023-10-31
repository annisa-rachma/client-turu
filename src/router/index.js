import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import DetailPage from '../views/DetailPage.vue'
import BookmarkPage from '../views/BookmarkPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomePage
    },
    {
      name: 'login',
      path: '/login',
      component: LoginPage
    },
    {
      name: 'register',
      path: '/register',
      component: RegisterPage
    },
    {
      name: 'detail',
      path: '/detail/:id',
      component: DetailPage
    },
    {
      name: 'bookmarks',
      path: '/bookmarks',
      component: BookmarkPage
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: NotFoundPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  if ((to.path === '/login' || to.path === '/register') && localStorage.access_token) {
    next({ path: '/' })
  } else if (to.path === '/bookmarks' && !localStorage.access_token) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
