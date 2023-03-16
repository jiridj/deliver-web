import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/account/orders',
      name: 'User Orders',
      component: () => import('@/views/account/OrdersView.vue')
    },
    {
      path: '/account/profile',
      name: 'User Profile',
      component: () => import('@/views/account/ProfileView.vue')
    },
    {
      path: '/admin/users',
      name: 'Users',
      component: () => import('@/views/admin/UsersView.vue')
    },
    {
      path: '/auth/login',
      name: 'Login',
      component: () => import('@/views/auth/LoginView.vue')
    },
    {
      path: '/auth/otp',
      name: 'Reset Password with OTP',
      component: () => import('@/views/auth/OtpView.vue'),
      props: true
    },
    {
      path: '/auth/reset',
      name: 'Reset Password',
      component: () => import('@/views/auth/ResetView.vue')
    },
    {
      path: '/auth/signup',
      name: 'Sign up',
      component: () => import('@/views/auth/SignupView.vue')
    },
    {
      path: '/cart',
      name: 'Shopping Cart',
      component: () => import('@/views/cart/CartView.vue')
    },
    {
      path: '/cart/shipping',
      name: 'Shipping',
      component: () => import('@/views/cart/ShippingView.vue')
    },
    {
      path: '/cart/checkout',
      name: 'Check Out',
      component: () => import('@/views/cart/CheckOutView.vue')
    },
    {
      path: '/cart/checkout/success',
      name: 'Check Out Success',
      component: () => import('@/views/cart/CheckOutSuccessView.vue')
    },
    {
      path: '/product/:number',
      name: 'Product',
      component: () => import('@/views/product/ProductView.vue')
    },
    {
      path: '/:catchAll(.*)*',
      name: "PageNotFound",
      component: () => import('@/views/error/NotFoundView.vue')
    },
  ]
})

export default router
