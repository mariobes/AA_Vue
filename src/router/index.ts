import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/cryptoDetails/:id',
      name: 'cryptoDetails',
      component: () => import('../views/CryptoDetailsView.vue')
    },
    {
      path: '/cryptoDetails/:name',
      name: 'cryptoDetailsByName',
      component: () => import('../views/CryptoDetailsView.vue')
    },
    {
      path: '/privateZoneUser/:id',
      name: 'privateZoneUser',
      component: () => import('../views/PrivateUserZoneView.vue')
    }
  ]
})

export default router
