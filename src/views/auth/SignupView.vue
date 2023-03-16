<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import * as api from '@/api';
import PasswordToggle from '@/views/auth/PasswordToggle.vue';
import { useAlertStore } from '@/stores/alert';
import { useAuthStore } from '@/stores/auth';

const alertStore = useAlertStore();
const authStore = useAuthStore();

const { alert } = storeToRefs(alertStore);
alertStore.clear();

const user = ref({});

async function signup(e) {
  const ok = await api.signup(user.value);
  if (ok) await authStore.login(user.value.email, user.value.password);
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
                    v-model="user.email"
                    class="form-control"
                    placeholder="john.doe@hotmail.com"
                  />
                </div>

                <div class="form-outline mb-3">
                  <label class="form-label">Password</label>
                  <PasswordToggle @update:password="user.password = $event" />
                </div>

                <div class="form-outline mb-3">
                  <label class="form-label">First name</label>
                  <input
                    type="text"
                    v-model="user.first_name"
                    class="form-control"
                    placeholder="Enter your first name"
                  />
                </div>

                <div class="form-outline mb-3">
                  <label class="form-label">Last name</label>
                  <input
                    type="text"
                    v-model="user.last_name"
                    class="form-control"
                    placeholder="Enter your last name"
                  />
                </div>

                <div class="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    class="btn btn-dark"
                    style="padding-left: 2.5rem; padding-right: 2.5rem;"
                    @click="signup"
                  >Sign up</button>
                  <p class="small fw-bold mt-2 pt-3 mb-0">
                    Already have an account?
                    <a
                      href="/auth/login"
                      class="link-dark"
                    >Login</a>
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