<script setup>
import { RouterLink } from 'vue-router';

import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';

import IconUser from '@/components/icons/IconUser.vue';
import IconShoppingCart from '@/components/icons/IconShoppingCart.vue';
import { storeToRefs } from 'pinia';

defineProps(['mode', 'colors']);
const authStore = useAuthStore();
const cartStore = useCartStore();

const { user } = storeToRefs(authStore);
</script>

<template>
  <nav class="navbar navbar-expand-lg fixed-top" :class="['navbar-' + mode, 'bg-' + colors]">
    <div class="container-md">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <a class="navbar-brand" href="/"> DELIVER </a>

      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav">
          <RouterLink to="/" class="nav-link" active-class="active"> Shop </RouterLink>
          <RouterLink to="/about" class="nav-link" active-class="active"> About </RouterLink>
          <RouterLink
            to="/admin/users"
            class="nav-link"
            active-class="active"
            v-if="user && user.role && user.role === 'admin'"
          >
            Admin
          </RouterLink>
        </div>
      </div>

      <div class="navbar-nav" :hidden="authStore.loggedIn">
        <RouterLink to="/auth/login" class="nav-link" active-class="active">Login</RouterLink>
        <RouterLink to="/auth/signup" class="nav-link" active-class="active">Sign up</RouterLink>
      </div>

      <div class="navbar-nav" :hidden="authStore.loggedIn ? false : true">
        <RouterLink to="/account/profile" class="nav-link" active-class="active">
          <IconUser />
          <span v-if="user" style="margin-left: 5px; margin-right: 5px">
            {{
              user.first_name && user.last_name
                ? `${user.first_name} ${user.last_name}`
                : user.email
            }}
          </span>
        </RouterLink>
      </div>

      <div class="navbar-nav" style="margin-left: 8px">
        <RouterLink to="/cart" class="btn btn-light" active-class="active">
          <IconShoppingCart />
          <span class="badge rounded-pill bg-primary" style="margin-left: 8px">{{
            cartStore.numLines
          }}</span>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
