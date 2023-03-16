<script setup>
import { storeToRefs } from 'pinia';
import { useAlertStore } from '@/stores/alert';
import { useAuthStore } from '@/stores/auth';

import PasswordToggle from '@/views/auth/PasswordToggle.vue';

const props = defineProps({
  redirect: {
    type: String,
    default: '/'
  }
})

const alertStore = useAlertStore();
const authStore = useAuthStore();

const { alert } = storeToRefs(alertStore);
alertStore.clear();

let email;
let password;

async function login(e) {
  await authStore.login(email, password, props.redirect);
}
</script>

<template>
  <div
    id="'login-alert'"
    class="alert mt-3"
    :class="(alert ? alert.type : '')"
    role="alert"
    :hidden="alertStore.hideAlert"
  >
    {{ (alert ? alert.message : '') }}
  </div>

  <form>
    <div class="form-outline mb-3">
      <label class="form-label">Email address</label>
      <input
        type="email"
        v-model="email"
        class="form-control"
        placeholder="john.doe@hotmail.com"
      />
    </div>

    <div class="form-outline mb-3">
      <label class="form-label">Password</label>
      <PasswordToggle @update:password="password = $event" />
    </div>

    <div class="text-center text-lg-start mt-3 pt-2">
      <button
        type="button"
        class="btn btn-dark"
        style="padding-left: 2.5rem; padding-right: 2.5rem;"
        @click="login"
      >Login</button>
      <p class="small fw-bold mt-2 pt-3 mb-0">
        Forgot your password?
        <a
          href="/auth/reset"
          class="link-dark"
        >Reset password</a>
      </p>
      <p class="small fw-bold mt-2 pt-1 mb-0">
        Don't have an account?
        <a
          href="/auth/signup"
          class="link-dark"
        >Register</a>
      </p>
    </div>
  </form>
</template>