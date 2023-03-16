<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import * as api from '@/api';
import PasswordToggle from '@/views/auth/PasswordToggle.vue';
import { useAlertStore } from '@/stores/alert';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const email = route.query.email;
const one_time_password = ref(route.query.otp);
const password = ref('');

const authStore = useAuthStore();
const alertStore = useAlertStore();
alertStore.clear();

const { alert } = storeToRefs(alertStore);

async function signup(e) {
  const ok = await api.resetPassword(email, one_time_password.value, password.value);
  if (ok) await authStore.login(email, password.value);
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="container mt-5 ">
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <div class="card bg-white">
            <div class="card-body p-5">
              <div
                id="'register-alert'"
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
                    disabled
                  />
                </div>

                <div class="form-outline mb-3">
                  <label class="form-label">One-time password</label>
                  <input
                    type="number"
                    v-model="one_time_password"
                    class="form-control"
                  />
                </div>

                <div class="form-outline mb-3">
                  <label class="form-label">Password</label>
                  <PasswordToggle @update:password="password = $event" />
                </div>

                <div class="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    class="btn btn-dark"
                    style="padding-left: 2.5rem; padding-right: 2.5rem;"
                    @click="signup"
                  >Reset password</button>
                  <p class="small fw-bold mt-2 pt-3 mb-0">
                    Don't have a one-time password?
                    <a
                      href="/auth/reset"
                      class="link-dark"
                    >Get it here</a>
                  </p>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>