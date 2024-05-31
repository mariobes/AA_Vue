import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import guard from '@/stores/guards'; 

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
      component: () => import('../views/PrivateUserZoneView.vue'),
      beforeEnter: guard,
    },
    {
      path: '/listUsers',
      name: 'listUsers',
      component: () => import('../views/ListUsersView.vue'),
      beforeEnter: guard,
    },
    {
      path: '/updateCrypto/:id',
      name: 'updateCrypto',
      component: () => import('../views/UpdateCryptoView.vue'),
      beforeEnter: guard,
    }
  ]
})

export default router
