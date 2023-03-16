<script setup>
import { storeToRefs } from 'pinia';
import { useAlertStore } from '@/stores/alert';

import * as api from '@/api';

async function reset(e) {
  const ok = await api.requestPasswordReset(email);
  if (ok) alertStore.success(
    'A four digit one-time password has been sent to your email address.'
  );
}

const alertStore = useAlertStore();

const { alert } = storeToRefs(alertStore);
alertStore.clear();

let email;
</script>

<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="container mt-5 ">
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <div class="card bg-white">
            <div class="card-body p-5">
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

                <div class="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    class="btn btn-dark"
                    style="padding-left: 2.5rem; padding-right: 2.5rem;"
                    @click="reset"
                  >Reset password</button>
                  <p class="small fw-bold mt-2 pt-3 mb-0">
                    Already have an account?
                    <a
                      href="/auth/login"
                      class="link-dark"
                    >Login</a>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>