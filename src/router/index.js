// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth' // Keep these imports

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import GalleryView from '../views/GalleryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: GalleryView,
      meta: { requiresAuth: true }, // This route requires authentication
    },
  ],
})

// This helper function returns a Promise that resolves with the current user
// once the initial authentication state is known.
const getCurrentUserAuth = () => {
  return new Promise((resolve) => {
    // getAuth() is called here, ensuring Firebase has been initialized
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      unsubscribe() // Unsubscribe immediately after the first state is known
      resolve(user)
    })
  })
}

// Navigation Guard to check authentication
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  // Wait for the current user's authentication state
  const currentUser = await getCurrentUserAuth()

  if (requiresAuth && !currentUser) {
    // If route requires authentication and no user is logged in, redirect to login
    next('/login')
  } else {
    // Otherwise, proceed as normal
    next()
  }
})

export default router
