<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import * as api from '@/api';
import PageSpinner from '@/components/spinner/PageSpinner.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import CheckOutSteps from '@/views/cart/CheckOutSteps.vue';

const authStore = useAuthStore();
const { token } = storeToRefs(authStore);

const steps = [
  { label: 'Review Cart', active: false, finished: true },
  { label: 'Shipping Details', active: true, finished: false },
  { label: 'Check Out', active: false, finished: false },
];

const loading = ref(false);
const user = ref(null);
api.getUser(token.value)
  .then((res) => {
    user.value = res;
    loading.value = false;
  });
</script>

<template>
  <div id="cart">
    <CheckOutSteps :steps="steps" />
    <div class="container">
      <div class="row">
        <div class="col">
          <h3>Shipping information</h3>
        </div>
      </div>
      <PageSpinner v-if="loading" />
      <div
        v-if="user && !loading"
        class="row"
      >
        <div class="row pt-3">
          <div class="row mb-3">
            <div class="col">
              <label class="form-label">Email address</label>
              <input
                type="email"
                class="form-control"
                disabled
                v-model="user.email"
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <label class="form-label">First name</label>
              <input
                type="text"
                class="form-control"
                disabled
                v-model="user.first_name"
                placeholder="First name"
                aria-label="First name"
              >
            </div>
            <div class="col">
              <label class="form-label">Last name</label>
              <input
                type="text"
                class="form-control"
                disabled
                v-model="user.last_name"
                placeholder="Last name"
                aria-label="Last name"
              >
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <label class="form-label">Address</label>
              <input
                type="text"
                class="form-control"
                disabled
                v-model="user.address"
                placeholder="Address"
                aria-label="Address"
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <label class="form-label">City</label>
              <input
                type="text"
                class="form-control"
                disabled
                v-model="user.city"
                placeholder="City"
                aria-label="City"
              >
            </div>
            <div class="col">
              <label class="form-label">Country</label>
              <input
                type="text"
                class="form-control"
                disabled
                v-model="user.country"
                placeholder="Country"
                aria-label="Country"
              >
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <label class="form-label">Phone number</label>
              <input
                type="text"
                class="form-control"
                disabled
                v-model="user.phone"
                placeholder="+00 (000) 000-0000"
                aria-label="Phone number"
              />
            </div>
          </div>
          <div class="row pt-3">
            <div class="col">
              <button
                type="button"
                class="btn btn-dark"
                style="padding-left: 2.5rem; padding-right: 2.5rem;"
                @click="router.push('/cart')"
              >Back to Cart</button>
            </div>
            <div class="col clearfix">
              <button
                type="button"
                class="btn btn-dark float-end"
                style="padding-left: 2.5rem; padding-right: 2.5rem;"
                @click="router.push('/cart/checkout')"
              >To Check Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>